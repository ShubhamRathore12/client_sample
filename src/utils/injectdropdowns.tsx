import { useSelector } from "react-redux";
import { RootState } from "../store";


export const injectDropdownOptions = (config:any) => {
  const dropdowns = useSelector((state: RootState) => state?.app?.optionsAll);

  return config.map((field:any) => {
    if (field.name === "relation") {
      return {
        ...field,
        options: dropdowns?.Relation?.map(({ id, value }) => ({ value: id, label: value })),
      };
    }
    if (field.name === "id_proof_type") {
      return {
        ...field,
        options: dropdowns?.IdProof?.map(({ id, value }) => ({ value: id, label: value })),
      };
    }
    if (field.name === "bankType") {
      return {
        ...field,
        options: dropdowns?.BankAccountType?.map(({ id, value }) => ({ value: id, label: value })),
      };
    }
    return field;
  });
};
