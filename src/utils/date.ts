import { format, parse } from "date-fns";

// 31032022
// dd/mm/yyyy
export const makeString = (date: Date) => {
  return format(date, "dd/MM/yyyy");
};

export const makeDate = (string?: string) => {
  return parse(string || makeString(new Date()), "dd/MM/yyyy", new Date());
};
