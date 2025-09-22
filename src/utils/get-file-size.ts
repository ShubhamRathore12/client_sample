export const getFileSize = (bytes: number) => {
  return Intl.NumberFormat("en-GB", {
    style: "unit",
    unit: "byte",
    notation: "compact",
    unitDisplay: "narrow",
    maximumFractionDigits: 0,
  }).format(bytes);
};
