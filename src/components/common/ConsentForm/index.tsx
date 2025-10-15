import React from "react";

import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";

interface ConsentFormProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  text?: string;
}

const consetText = `I/We hereby request Stoxkart to do changes in Trading and
            Demat account I/we hold with Stoxkart. I/We confirm & declare that the
            changes belongs to me and I/We authorise Stoxkart / Exchanges /
            Depositories to use this changes to send me/us any information
            / alert / email.`;

const ConsentForm: React.FC<ConsentFormProps> = ({
  checked = false,
  onChange = () => {},
  error,
  touched,
  text = consetText,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <FormControlLabel
        control={
          <Checkbox name="consent" checked={checked} onChange={onChange} />
        }
        label={<Typography variant="subtitle2" align="left">{text}</Typography>}
      />
      {touched && error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default ConsentForm;
