import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import { StateProvider } from '../state';
import './App.css';
import { createStyles, makeStyles, Theme, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { pink } from '@material-ui/core/colors';
import Header from './Header';
import DrawerMenu from './Drawer';
import ParkingMap from './ParkingMap';
import ParkingDetails from './ParkingDetails';

Amplify.configure(awsconfig);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  })
);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: pink
  },
  overrides: {
    MuiListItem: {
      gutters: {
        paddingLeft: 25
      },
    },
    MuiContainer: {
      root: {
        marginTop: 20
      }
    },
    MuiTypography: {
      h6: {
        fontWeight: 400
      }
    }
  }
});

const App: React.FC = () => {
  const classes = useStyles();
  const [drawerOpen, updateDrawerOpen] = useState(false);
  const toggleDrawer = () => updateDrawerOpen(!drawerOpen);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <StateProvider>
            <Header onMenuClick={toggleDrawer} />
            <DrawerMenu toggleDrawer={toggleDrawer} open={drawerOpen} title="Parking Dashboard" />
            <Switch>
              <Route path="/" exact component={ParkingMap}/>
              <Route path="/parking/:parkingID" exact component={ParkingDetails}/>
            </Switch>
          </StateProvider>
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default withAuthenticator(App);
