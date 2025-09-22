// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function convertJSONtoFD(object: Record<string, any>): FormData {
  const formData = new FormData();
  Object.keys(object).forEach((key) => {
    if (Array.isArray(object[key])) {
      object[key].forEach((blob) => formData.append(key, blob));
    } else {
      formData.append(key, object[key]);
    }
  });
  return formData;
}
