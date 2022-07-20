import React from 'react';

import { FirebaseProvider } from './contexts/FirebaseContext';

import { BASENAME } from './config/constant';
import { Navigation } from './Navigation';

const App = () => {
  return (
    <React.Fragment>
      <FirebaseProvider>
        <Navigation />
      </FirebaseProvider>
    </React.Fragment>
  );
};

export default App;
