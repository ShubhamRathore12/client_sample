export default function getRoute(stage: string) {
  const params = new URLSearchParams(location.search);
  params.delete("step");

  let base = "/e-kyc";

  if (!location.pathname.startsWith("/e-kyc")) {
    base = location.pathname.substring(0, location.pathname.indexOf("/e-kyc") + 6);
  }

  if (!window || !params.get("client_id")) return `${base}/${stage.replaceAll("_", "-")}`;
  return `${base}/${stage.replaceAll("_", "-")}?${params.toString()}`;
}
