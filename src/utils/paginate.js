

export function paginate(items, pageNumber, pageSize){
  const startIndex = (pageNumber) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
}
