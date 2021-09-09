// dependencies
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// global styles
import GlobalStyle from './styles/global';

// routes
import Routes from './routes';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <GlobalStyle />
  </>
);

export default App;
