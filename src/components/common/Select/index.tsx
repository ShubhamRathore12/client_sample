import { KeyboardArrowDown } from "@mui/icons-material";
import { Input, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface IProps {
  names: string[];
  title: string;
  onChange: (name: string) => void;
}

const Select: React.FunctionComponent<IProps> = ({ names, title, onChange }) => {
  const [name, setName] = React.useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value.

    setName(value);
    onChange(value);
  };

  return (
    <div>
      <MuiSelect
        displayEmpty
        value={name}
        onChange={handleChange}
        input={<Input fullWidth />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return (
              <Typography data-testid={`select__title`} color="text.secondary">
                {title}
              </Typography>
            );
          }
          return (
            <Typography data-testid={`select__selected`} color="secondary">
              {selected}
            </Typography>
          );
        }}
        IconComponent={KeyboardArrowDown}
        MenuProps={MenuProps}
        inputProps={{ "aria-label": "Without label" }}
      >
        {names.map((name, idx) => (
          <MenuItem data-testid={`select__item-${idx + 1}`} key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </MuiSelect>
    </div>
  );
};

export default Select;
