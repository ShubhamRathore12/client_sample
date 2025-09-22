export function identifyFilename(urlString: string) {
  if (!urlString) return "No file found";
  const url = new URL(urlString);
  const filename = url.pathname.substring(url.pathname.lastIndexOf("/") + 1);
  return filename ?? "Unknown File";
}
