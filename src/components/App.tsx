import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { StateProvider, useStateValue } from '../state';
import './App.css';
import { createStyles, makeStyles, Theme, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { pink } from '@material-ui/core/colors';
import Header from './Header';
import DrawerMenu from './Drawer';
import ParkingMap from './ParkingMap';
import ParkingDetails from './ParkingDetails';
import { ActionType, ParkingResponse } from '../types';

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
      main: '#1976d2'
    },
    secondary: pink
  },
  overrides: {
    MuiListItem: {
      gutters: {
        paddingLeft: 25
      }
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
  const [, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({
      type: ActionType.PARKING_FETCH_START
    });

    const queryForParkingOnly = `query Parking($filter: ParkingFilterInput) {
      parking(filter: $filter) {
        parkingID
        address {
          city
          countryCode
          line1
          postalCode
          state
        }
        features
        location {
          latitude
          longitude
        }
        openingHours {
          open {
            day
            time
          }
          close {
            day
            time
          }
        }
        rate
        title
      }
    }`;

    API.graphql(graphqlOperation(queryForParkingOnly))
      .then((response: ParkingResponse) => {
        const {
          data: { parking }
        } = response;
        dispatch({
          type: ActionType.PARKING_FETCH_END,
          payload: parking
        });
      })
      .catch(response => {
        alert(response.errors.map(e => e.message).join());
      });
  }, [dispatch]);

  const classes = useStyles();
  const [drawerOpen, updateDrawerOpen] = useState(false);
  const toggleDrawer = () => updateDrawerOpen(!drawerOpen);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Header onMenuClick={toggleDrawer} />
          <DrawerMenu toggleDrawer={toggleDrawer} open={drawerOpen} title="Parking Dashboard" />
          <Switch>
            <Route path="/" exact component={ParkingMap} />
            <Route path="/parking/:parkingID" exact component={ParkingDetails} />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
};

const withState = Component => props => (
  <StateProvider>
    <Component {...props} />
  </StateProvider>
);

export default withAuthenticator(withState(App));
