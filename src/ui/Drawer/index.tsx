import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, styled,  Theme } from '@mui/material/styles';
import * as React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../../images';

const useStyles = makeStyles()({
  padding: {
   paddingTop: 12,
   paddingBottom: 12,
  },
  paddingList: {
    padding: 0,
  },
  itemText: {
    '& .MuiTypography-root': {
      fontFamily: 'Poppins-semibold',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: '24px',
      color:'#2B364D',
    },
  },
});

type DrawerLinkType = {
  title: string;
  icon: string;
}

const drawerWidth = 184;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: 'rgba(184, 184, 184, 0.2)',
  borderRight: 0,
  justifyContent: 'space-between',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)})`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7)})`,
  },
  backgroundColor: 'rgba(184, 184, 184, 0.2)',
  borderRight: 0,
  justifyContent: 'space-between',
});

const CustomizedDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      backgroundColor: 'transparent',
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      backgroundColor: 'transparent',
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

type DrawerProps = {
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({children}) => {
  const {classes} = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const links: DrawerLinkType[] = [
    {title: 'Patients', icon: images.idCard},
    {title: 'Invoices', icon: images.fileBlank},
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <CustomizedDrawer variant="permanent" open={open}>
        <List className={classes.paddingList}>
          <ListItem key="Close" disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              className={classes.padding}
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              sx={{
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <img src={open ? images.closeBurger : images.burger} />
              </ListItemIcon>
              <ListItemText className={classes.itemText} primary="Close" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          {links.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                className={classes.padding}
                sx={{
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={item.icon} />
                </ListItemIcon>
                <ListItemText className={classes.itemText} primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            className={classes.padding}
            sx={{
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 1 : 'auto',
                justifyContent: 'center',
              }}
            >
              <img src={images.settings} />
            </ListItemIcon>
            <ListItemText className={classes.itemText} primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </CustomizedDrawer>
      <Box component="main" sx={{ position: 'absolute', width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Drawer;
