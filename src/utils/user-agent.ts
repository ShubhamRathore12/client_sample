import { UAParser } from "ua-parser-js";

export const userAgentFromString = (uaString: string) => {
  return UAParser(uaString);
};
