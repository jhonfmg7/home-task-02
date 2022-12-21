import * as React from 'react';
import { Provider } from 'react-redux';

// Store
import store from './redux/store';

// Components
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import ErrorBoundary from './components/ErrorBoundary';
import Messages from './components/Messages';

function App() {
  return (
    <Provider store={ store }>
      <div className="App" data-testid="app">
        <ErrorBoundary>
          <Header />
          <Main />
          <Footer />
          <Messages />
        </ErrorBoundary>
      </div>
    </Provider>
  );
}

export default App;
