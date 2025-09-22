import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import MuiTabs from "@mui/material/Tabs";
import * as React from "react";
import { FunctionComponent } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ height: "100%" }}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface IProps {
  tabs: {
    title: string;
    content: JSX.Element | JSX.Element[];
  }[];
  sparse?: boolean;
}

const Tabs: FunctionComponent<IProps> = ({ tabs, sparse }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box flex={1} display={"flex"} flexDirection={"column"} height="100%">
      <MuiTabs value={value} onChange={handleChange} aria-label="Tabs">
        {tabs.map(({ title }, idx) => (
          <Tab key={idx} label={title} {...a11yProps(idx)} />
        ))}
      </MuiTabs>
      {tabs.map(({ content }, idx) => (
        <TabPanel key={idx} value={value} index={idx}>
          {content}
        </TabPanel>
      ))}
    </Box>
  );
};

export default Tabs;
