export const snakeToCapitalizeCase = (string: string, uppercase?: boolean) => {
  if (!string.length) return string;

  if (uppercase) {
    return string.replace(/([-_]\w|^\w)/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", " ")
    );
  }

  const parsedString = string.replaceAll("_", " ");
  return `${parsedString[0].toUpperCase()}${parsedString.substring(1)}`;
};
