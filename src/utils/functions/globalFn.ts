export const modifyListingData = (
  listingData: any[],
  keys: string[],
  defColumn: any
) => {
  const columns = keys
    .map((key) => defColumn.find((column: any) => column.key === key))
    .filter(Boolean);

  // Filter data based on the provided keys
  const data =
    listingData?.length &&
    listingData.map((item) => {
      const filteredItem: any = { key: item.id };
      keys.forEach((key) => {
        if (item[key] !== undefined) {
          filteredItem[key] = item[key];
        }
      });
      return filteredItem;
    });

  return { columns, data };
};
