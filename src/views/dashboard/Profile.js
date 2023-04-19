// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { styled } from '@mui/material/styles';
import MuiTab from '@mui/material/Tab';

// ** Demo Tabs Imports
import TabInfo from 'src/components/account-settings/TabDetails';
import TabAccount from 'src/components/account-settings/TabAccount';
import TabSecurity from 'src/components/account-settings/TabSecurity';

import {
  AccountBoxOutlined,
  InfoOutlined,
  LockOpenOutlined,
  Work,
  WorkHistoryOutlined,
} from '@mui/icons-material';
import TabDetails from 'src/components/account-settings/TabDetails';

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100,
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67,
  },
}));

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const Profile = () => {
  // ** State
  const [value, setValue] = useState('account');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="account-settings tabs"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value="account"
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountBoxOutlined />
                <TabName>Account</TabName>
              </Box>
            }
          />
          <Tab
            value="details"
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WorkHistoryOutlined />
                <TabName>Details</TabName>
              </Box>
            }
          />
          <Tab
            value="security"
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutlined />
                <TabName>Security</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value="account">
          <TabAccount />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="details">
          <TabDetails />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="security">
          <TabSecurity />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

export default Profile;
