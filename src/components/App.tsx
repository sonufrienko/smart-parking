import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import Auth from '@aws-amplify/auth';
import awsconfig from '../aws-exports';
import SlotListContainer from './SlotListContainer';
import { StateProvider } from '../state';
import './App.css';

Auth.configure(awsconfig);

const App: React.FC = () => {
  return (
    <StateProvider>
      <div className="App">
        <SlotListContainer />
      </div>
    </StateProvider>
  );
};

export default withAuthenticator(App);
