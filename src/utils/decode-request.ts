import type { IncomingMessage } from "http";

export function decodeRequest<T extends Record<string, any>>(req: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    let buffer = "";
    req.on("data", (data) => {
      buffer += data;
    });
    req.on("end", () => {
      if (buffer === "") resolve({} as T);
      const entries = buffer.split("&").map((entry) => {
        const [key, value] = entry.split("=");
        return [key, decodeURIComponent(value ?? "")];
      });
      resolve(Object.fromEntries(entries));
    });
    req.on("error", (err) => {
      reject(err);
    });
  });
}
