const {Parser} = require('json2csv');

function exportCSV(objects) {
  if (!Array.isArray(objects)) objects = [objects];
  if (objects.length === 0) return '';
  const fields = Object.keys(objects[0]);
  const parser = new Parser({fields});
  return parser.parse(objects);
}

module.exports = {exportCSV};
