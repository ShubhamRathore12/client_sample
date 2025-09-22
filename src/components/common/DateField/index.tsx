import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import React from "react";

function DateField<TDate extends boolean>(props: DatePickerProps<TDate>) {
  const { slotProps, ...other } = props;

  return (
    <DatePicker
      {...other}
      format="dd/MM/yyyy"
      label="Date of Birth"
      slotProps={{
        popper: {
          sx: {
            boxShadow: 1,
            "& .MuiButtonBase-root": {
              bgcolor: "unset",
              "&.MuiPickersDay-root.Mui-selected": {
                bgcolor: "primary.green",
              },
              "& svg path": {
                fill: "unset",
              },
            },
          },
        },
        ...slotProps,
        textField: {
          fullWidth: true,

          variant: "standard",

          InputProps: {
            sx: {
              "&.MuiInput-root.Mui-disabled": {
                "&:before, &:after": {
                  borderBottomStyle: "solid",
                },
              },

              "& .MuiInputAdornment-root .MuiButtonBase-root": {
                bgcolor: "transparent",

                "& svg path": {
                  fill: (theme) => theme.palette.text.secondary,
                },
              },
            },
          },
          ...slotProps?.textField,
        },
      }}
    />
  );
}

export default DateField;
