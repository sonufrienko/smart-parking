import React from 'react';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';
import MenuIcon from '@material-ui/icons/Menu';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import SettingsIcon from '@material-ui/icons/Settings';

const drawerWidth = 280;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: {
      ...theme.mixins.toolbar,
      display: 'flex',
      alignItems: 'center',
      color: '#9e9e9e'
    },
    toolbarMenuIcon: {
      marginLeft: 12,
      marginRight: 12
    }
  })
);

const DrawerMenu = ({ toggleDrawer, open, title }) => {
  const classes = useStyles();

  return (
    <Drawer
        open={open}
        onClose={toggleDrawer}
        className={classes.drawer}
        variant="temporary"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar}>
          <IconButton
            onClick={toggleDrawer}
            color="inherit"
            className={classes.toolbarMenuIcon}
          >
            <MenuIcon />
          </IconButton>
          {title}
        </div>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon><MapIcon /></ListItemIcon>
            <ListItemText primary="Map" />
          </ListItem>
          <ListItem button component={Link} to="/map-edit">
            <ListItemIcon><EditLocationIcon /></ListItemIcon>
            <ListItemText primary="Map editor" />
          </ListItem>
          <ListItem button component={Link} to="/settings">
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
  );
};

export default DrawerMenu;
