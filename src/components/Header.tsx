import React, { useState } from 'react';
import { withRouter, matchPath } from "react-router";
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Toolbar, Typography, AppBar, IconButton, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useStateValue } from '../state';
import { ParkingListInterface } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    }
  })
);

const getTitle = ({ location, parkingList }: { location: { pathname: string }, parkingList: ParkingListInterface }) => {
  const matchParkingDetails = matchPath(location.pathname, {
    path: "/parking/:parkingID",
    exact: true,
    strict: false
  });

  if (matchParkingDetails) {
    const { items } = parkingList;
    const parking = items && items.length ?
      items.find(item => item.parkingID === matchParkingDetails.params.parkingID) : null;
    if (parking) {
      return parking.title;
    }
  } else if (location.pathname === '/') {
    return 'Parking Map'
  }

  return 'Parking Dashboard';
}

const Header = (props) => {
  const { location, history, onMenuClick } = props;
  const [
    {
      parkingList
    }
  ] = useStateValue();
  const title = getTitle({ location, parkingList });
  document.title = title;
  const showBackButton = location.pathname.startsWith('/parking/') && history.length;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleSignOut() {
    handleClose();
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  return (
    <AppBar position="sticky" color="primary">
        <Toolbar>
          { !showBackButton && 
            <IconButton edge="start" className={classes.menuButton} onClick={onMenuClick} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          }

          { showBackButton && 
            <IconButton edge="start" className={classes.menuButton} onClick={() => history.goBack()} color="inherit" aria-label="menu">
              <ArrowBackIcon />
            </IconButton>
          }
          <Typography variant="h6" className={classes.title}>{title}</Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to="/profile"><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
  );
};

export default withRouter(Header);
