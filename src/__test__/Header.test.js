import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Store
import store from '../redux/store';

// Components
import App from '../App';
import Header from '../components/header';

afterEach( cleanup );

window.HTMLElement.prototype.scrollIntoView = jest.fn()

test('<Header /> validate Headers UI and searching functionality', () => {
    const { getByTestId } = render(
        <Provider store={store}>
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        </Provider>
    );

    const headerLogo = getByTestId('header_logo');
    expect( headerLogo ).toBeInTheDocument();
    expect( headerLogo.textContent ).toBe('netflixroulette');

    const headerTitle = getByTestId('header_title');
    expect( headerTitle ).toBeInTheDocument();
    expect( headerTitle.textContent ).toBe('FIND YOUR MOVIE');

    const headerSearchInput = getByTestId('header_search_input');
    expect( headerSearchInput ).toBeInTheDocument();
    expect( headerSearchInput.tagName ).toBe("INPUT");
    expect( headerSearchInput.value ).toBe('');

    const headerSearchButton = getByTestId('header_search_button');
    expect( headerSearchButton ).toBeInTheDocument();
    expect( headerSearchButton.tagName ).toBe('BUTTON');

    let searchParam = window.location.pathname.split('/')[2]
    expect( searchParam ).toBe(undefined);
    expect( searchParam ).not.toBe(encodeURIComponent('whatever you would like to search'));
    fireEvent.change(headerSearchInput, { target: { value: 'whatever you would like to search' } });
    expect( headerSearchInput.value ).toBe('whatever you would like to search');
    
    fireEvent.click(headerSearchButton);
    searchParam = window.location.pathname.split('/')[2]
    expect( searchParam ).toBe(encodeURIComponent('whatever you would like to search'));

    const params = new URLSearchParams(window.location.search);
    expect( params.get('genre') ).toBe('all');
    expect( params.get('sortBy') ).toBe('release_date');
});

test('<Header /> validate the modals are closed when the page load and exist when clicking in the regarding button', async() => {
    const { queryByTestId, getByTestId, findAllByTestId } = render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );

    const addOrEditModal = queryByTestId('add_or_edit_form');
    expect( addOrEditModal ).not.toBeInTheDocument();

    const addMovieButton = getByTestId('add_movie_button');
    expect( addMovieButton ).toBeInTheDocument();
    expect( addMovieButton.tagName ).toBe('BUTTON');
    expect( addMovieButton.textContent ).toBe('+ ADD MOVIE');

    const moreInfoMovieModal = queryByTestId('more_info_movie_modal');
    expect( moreInfoMovieModal ).not.toBeInTheDocument();

    const imageMovieCard = await findAllByTestId('card_movie_image');
    expect( imageMovieCard.length ).toBe(9);

    // Open add or edit Modal
    fireEvent.click(addMovieButton);

    const addOrEditModalTwo = getByTestId('add_or_edit_form');
    expect( addOrEditModalTwo ).toBeInTheDocument();
    expect( addOrEditModalTwo.tagName ).toBe('FORM');

    // Close add or edit Modal
    fireEvent.click(addMovieButton);
    expect( addOrEditModal ).not.toBeInTheDocument();
    expect( addOrEditModalTwo ).not.toBeInTheDocument();

    // Open More Info Modal 
    fireEvent.click(imageMovieCard[0]);
    const moreInfoMovieModalTwo = getByTestId('more_info_movie_modal');
    expect( moreInfoMovieModalTwo ).toBeInTheDocument();
    
    // Close More Info Modal
    const moreInfoMovieCloseButton = getByTestId('more_info_movie_close_button');
    expect( moreInfoMovieCloseButton ).toBeInTheDocument();
    fireEvent.click(moreInfoMovieCloseButton);
    expect( moreInfoMovieModal ).not.toBeInTheDocument();
    expect( moreInfoMovieModalTwo ).not.toBeInTheDocument();

});

