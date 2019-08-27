import React, { useState } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import Auth from '@aws-amplify/auth';
import awsconfig from '../aws-exports';
import SlotListContainer from './SlotListContainer';
import { StateProvider } from '../state';
import './App.css';
import { Container, Paper } from '@material-ui/core';
import { createStyles, makeStyles, Theme, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { pink } from '@material-ui/core/colors';
import Header from './Header';
import DrawerMenu from './Drawer';

Auth.configure(awsconfig);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingBottom: 40
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
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Header onMenuClick={toggleDrawer} title="Parking Dashboard" />
        <DrawerMenu toggleDrawer={toggleDrawer} open={drawerOpen} title="Parking Dashboard" />
        <StateProvider>
          <Container>

            <div className="box-center">
              <Paper>
                <SlotListContainer />
              </Paper>
            </div>

          </Container>
        </StateProvider>
      </div>
    </ThemeProvider>
  );
};

export default withAuthenticator(App);
