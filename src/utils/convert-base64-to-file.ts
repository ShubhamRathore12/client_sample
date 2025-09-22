export default async function convertBase64ToFile(
  base64: string,
  filename?: string
): Promise<File> {
  const type = base64.substring("data:".length, base64.indexOf(";"));
  const res = await fetch(base64);
  const buf = await res.arrayBuffer();
  return new File([buf], filename || "imgBase64", { type });
}
