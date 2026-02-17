function parsePaginationAndSort(query) {
  const DEFAULT_PAGE = 0;
  const DEFAULT_SIZE = 10;
  const DEFAULT_SORT_PARAM = 'id, asc';

  const page = parseInt(query.page, 10);
  const size = parseInt(query.size, 10);
  const sortParam = (query.sort || query.sortParam) || DEFAULT_SORT_PARAM;

  const pageNum = Number.isNaN(page) ? DEFAULT_PAGE : page;
  const pageSize = Number.isNaN(size) ? DEFAULT_SIZE : size;

  const SORT_CRITERIA_DELIMITER = ';';
  const SORT_PART_DELIMITER = ',';
  const order = {};
  const sortFields = String(sortParam).split(SORT_CRITERIA_DELIMITER);
  for (const field of sortFields) {
    const [key, dir] = field.split(SORT_PART_DELIMITER).map(s => s && s.trim());
    if (key) order[key] = (dir && dir.toUpperCase() === 'DESC') ? -1 : 1;
  }

  return {page: pageNum, size: pageSize, order};
}

function buildPageData(data, total, size, page) {
  return {
    content: data,
    totalElements: total,
    totalPages: Math.ceil(total / size),
    pageNumber: page,
    pageSize: size,
  };
}

module.exports = {parsePaginationAndSort, buildPageData};
