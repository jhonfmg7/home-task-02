import * as React from 'react';

// Components
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div className="App" data-testid="app">
        <ErrorBoundary>
            <Header />
            <Main />
            <Footer />
        </ErrorBoundary>
    </div>
  );
}

export default App;
