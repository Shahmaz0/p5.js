/**
 * @module Environment
 * @submodule Environment
 * @for p5
 * @requires core
 */
import p5 from '../core/main';

let ingredients = {};
let background;

p5.prototype._createTableOutput = function(cIdT) {
  let inner =
    'Table Output<p id="' +
    cIdT +
    'Summary" aria-label="table output summary"><table id="' +
    cIdT +
    'OD" summary="table output content"></table><ul id="' +
    cIdT +
    'SD" aria-label="table output shape details"></ul>';
  return inner;
};

p5.prototype._updateTableOutput = function(cnvId, ing, bkgr) {
  ingredients = ing;
  background = bkgr;
  let cIdT = cnvId + 'tbOut';
  let innerSDs = this._buildTableSDs(cIdT);
  let innerSummary = this._buildTbSummary(innerSDs.numShapes);
  let innerMap = this._buildTbMap(cIdT);
  if (innerSummary !== document.getElementById(cIdT + 'Summary').innerHTML) {
    document.getElementById(cIdT + 'Summary').innerHTML = innerSummary;
  }
  if (innerMap !== document.getElementById(cIdT + 'OD').innerHTML) {
    document.getElementById(cIdT + 'OD').innerHTML = innerMap;
  }
  if (innerSDs !== document.getElementById(cIdT + 'SD').innerHTML) {
    document.getElementById(cIdT + 'SD').innerHTML = innerSDs.details;
  }
};

p5.prototype._buildTbMap = function(cId) {
  let el = 0;
  let table = '';
  let cells = Array.apply(null, Array(10)).map(function() {});
  for (let r in cells) {
    cells[r] = Array.apply(null, Array(10)).map(function() {});
  }
  for (let x in ingredients) {
    for (let y in ingredients[x]) {
      el++;
      if (
        cells[ingredients[x][y].loc.locX][ingredients[x][y].loc.locY] ===
        undefined
      ) {
        cells[ingredients[x][y].loc.locX][ingredients[x][y].loc.locY] =
          '<a href="#' +
          cId +
          'shape' +
          el +
          '">' +
          ingredients[x][y].color +
          ' ' +
          x +
          '</a>';
      } else {
        cells[ingredients[x][y].loc.locX][ingredients[x][y].loc.locY] =
          cells[ingredients[x][y].loc.locX][ingredients[x][y].loc.locY] +
          '  <a href="#' +
          cId +
          'shape' +
          el +
          '">' +
          ingredients[x][y].color +
          ' ' +
          x +
          '</a>';
      }
    }
  }
  for (let r in cells) {
    let row = '<tr>';
    for (let c in cells[r]) {
      row = row + '<td>';
      if (cells[r][c] !== undefined) {
        row = row + cells[r][c];
      }
      row = row + '</td>';
    }
    table = table + row;
  }
  return table;
};

p5.prototype._buildTbSummary = function(numShapes) {
  let text =
    background +
    ' canvas, ' +
    Math.round(this.width) +
    ' by ' +
    Math.round(this.height) +
    ' pixels, contains ' +
    numShapes[0] +
    ' shapes: ' +
    numShapes[1];
  return text;
};

p5.prototype._buildTableSDs = function(cId) {
  let shapeDetails = '';
  let shapes = '';
  let el = 0;
  for (let x in ingredients) {
    let shapeNum = 0;
    for (let y in ingredients[x]) {
      shapeNum++;
      el++;
      let line =
        '<li id="' +
        cId +
        'shape' +
        el +
        '">' +
        ingredients[x][y].color +
        ' ' +
        x +
        ',';
      if (x === 'line') {
        line =
          line +
          ' location = ' +
          ingredients[x][y].pos +
          ', length = ' +
          ingredients[x][y].length +
          ' pixels';
      } else {
        line = line + ' location = at ' + ingredients[x][y].pos + '';
        if (x !== 'point') {
          line = line + ', area = ' + ingredients[x][y].area + '%';
        }
        line = line + '</li>';
      }
      shapeDetails = shapeDetails + line;
    }
    shapes = shapes + shapeNum + ' ' + x + ', ';
  }
  return { numShapes: [el, shapes], details: shapeDetails };
};
