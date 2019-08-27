import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Drawer, IconButton, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';

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
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
  );
};

export default DrawerMenu;
