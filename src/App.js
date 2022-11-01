import React from 'react';

// Components
import Header from '/src/components/header/index.jsx';
import Main from '/src/components/main/index.jsx';
import Footer from '/src/components/footer/index.jsx';
import ErrorBoundary from '/src/components/ErrorBoundary/index.jsx';

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
