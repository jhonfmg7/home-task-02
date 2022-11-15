import * as React from 'react';

// Context
import AppContext from './context/AppContext';

// Components
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import ErrorBoundary from './components/ErrorBoundary';

function App() {

  // Local State
  const [movieSelected, setMovieSelected] = React.useState({
    image: "",
    title: "",
    rating: 0,
    genres: [],
    releaseDate: "",
    runtime: 0,
    overview: ""
  });
  const [isOpenMoreInfoModal, setIsOpenMoreInfoModal] = React.useState(false);

  return (
    <div className="App" data-testid="app">
        <ErrorBoundary>
            <AppContext.Provider value={{ movieSelected, setMovieSelected, isOpenMoreInfoModal, setIsOpenMoreInfoModal }}>
              <Header />
              <Main />
              <Footer />
            </AppContext.Provider>
        </ErrorBoundary>
    </div>
  );
}

export default App;
