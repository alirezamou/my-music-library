export default function paginate(
  items,
  pageSize,
  currentPage,
  fromStart = false
) {
  if (Array.isArray(items) && items.length) {
    const startIndex = fromStart ? 0 : pageSize * currentPage;
    const endIndex = pageSize * (currentPage + 1);
    return items.slice(startIndex, endIndex);
  } else {
    throw new Error("Items is not array or is empty");
  }
}
