import * as React from 'react';
import { Provider } from 'react-redux';

// Store
import store from './redux/store';

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
    id: 0,
    title: "",
    date: "",
    url: "",
    genres: [],
    runtime: 0,
    overview: "",
    poster_path: "",
    tagline: "",
    vote_average: 0,
    vote_count: 0,
    release_date: "",
    budget: 0,
    revenue: 0
  });
  const [isOpenMoreInfoModal, setIsOpenMoreInfoModal] = React.useState(false);

  return (
    <Provider store={ store }>
      <div className="App" data-testid="app">
          <ErrorBoundary>
              <AppContext.Provider value={{ movieSelected, setMovieSelected, isOpenMoreInfoModal, setIsOpenMoreInfoModal }}>
                <Header />
                <Main />
                <Footer />
              </AppContext.Provider>
          </ErrorBoundary>
      </div>
    </Provider>
  );
}

export default App;
