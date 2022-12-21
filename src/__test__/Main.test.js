import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Store
import store from '../redux/store';

// components
import App from '../App';
import Main from '../components/main';

afterEach( cleanup );

test('<Main /> validate UI and movies showed at main section', () => {
    const { getByTestId } = render(
        <Provider store={ store }>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </Provider>
    );
    
    const mainContainer = getByTestId('main');
    expect( mainContainer ).toBeInTheDocument();
    expect( mainContainer.tagName ).toBe('MAIN');
});

test('<Navbar /> validate when change genre or sortby successful', () => {
    const { getByTestId } = render(
        <Provider store={ store }>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );

    const homeLink = getByTestId('home_link');
    expect( homeLink ).toBeInTheDocument();
    fireEvent.click( homeLink, { button: 0 } );

    let params = new URLSearchParams(window.location.search);
    // expect( params.get('genre') ).toBe('all');
    // expect( params.get('sortBy') ).toBe('release_date');

    // Genres
    const genreOptionAll = getByTestId('genre_option_all');
    expect( genreOptionAll ).toBeInTheDocument();
    expect( genreOptionAll.textContent ).toBe('All');

    const genreOptionAction = getByTestId('genre_option_action');
    const genreOptionDocumentary = getByTestId('genre_option_documentary');
    const genreOptionComedy = getByTestId('genre_option_comedy');
    const genreOptionHorror = getByTestId('genre_option_horror');
    const genreOptionCrime = getByTestId('genre_option_crime');
    
    // SortBy
    const sortBySelect = getByTestId('sortby_select');
    expect( sortBySelect ).toBeInTheDocument();
    expect( sortBySelect.value ).toBe('release_date');
    expect( sortBySelect.value ).not.toBe('vote_average');
    expect( sortBySelect.value ).not.toBe('runtime');

    fireEvent.change(sortBySelect, { target: { value: 'vote_average' } });
    expect( sortBySelect.value ).toBe('vote_average');
    expect( sortBySelect.value ).not.toBe('release_date');
    expect( sortBySelect.value ).not.toBe('runtime');

    params = new URLSearchParams(window.location.search);
    expect( params.get('sortBy') ).toBe('vote_average');

    fireEvent.change(sortBySelect, { target: { value: 'runtime' } });
    expect( sortBySelect.value ).toBe('runtime');
    expect( sortBySelect.value ).not.toBe('vote_average');
    expect( sortBySelect.value ).not.toBe('release_date');

    params = new URLSearchParams(window.location.search);
    expect( params.get('sortBy') ).toBe('runtime');


})

test('<Main /> validate each card movie exists and is successful showed', async() => {
    const { findAllByTestId, queryAllByTestId } = render(
        <Provider store={store}>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </Provider>
    );

    const cardMovie = await findAllByTestId('card_movie');
    expect( cardMovie.length ).toBe(9)
    expect( cardMovie ).toMatchSnapshot();

    // Movie Menu Open
    const movieMenu = await queryAllByTestId('movie_menu');
    expect( movieMenu.length ).not.toBe(1);

    const movieMenuButton = await findAllByTestId('movie_menu_button');
    expect( movieMenuButton.length ).toBe(9);

    const movieMenuCloseButton = await queryAllByTestId('movie_menu_close_button');
    expect( movieMenuCloseButton.length ).toBe(0);

    fireEvent.click( movieMenuButton[0] );
    const movieMenuTwo = await queryAllByTestId('movie_menu');
    expect( movieMenuTwo.length ).toBe(1);

    const movieMenuCloseButtonTwo = await findAllByTestId('movie_menu_close_button');
    expect( movieMenuCloseButtonTwo.length ).toBe(1);
    expect( movieMenuCloseButtonTwo[0].textContent ).toBe('x');
    expect( movieMenuCloseButtonTwo[0].tagName ).toBe('H2');

    // Delete Modal Open
    const deleteModal = await queryAllByTestId('delete_modal');
    expect( deleteModal.length ).toBe(0);
    expect( deleteModal.length ).not.toBe(1);

    const movieMenuButtonsContainer = await findAllByTestId('movie_menu_buttons_container');
    expect( movieMenuButtonsContainer[0].tagName ).toBe('UL');

    const deleteModalButton = await findAllByTestId('delete_modal_button');
    expect( deleteModalButton[0].textContent ).toBe("Delete");
    expect( deleteModalButton[0].tagName ).toBe("LI");

    const editModalButton = await findAllByTestId('edit_modal_button');
    expect( editModalButton[0].textContent ).toBe("Edit");
    expect( editModalButton[0].tagName ).toBe("LI");

    fireEvent.click(deleteModalButton[0]);
    const deleteModalTwo = await findAllByTestId('delete_modal');
    expect( deleteModalTwo.length ).toBe(1);

    const deleteModalTitle = await findAllByTestId('delete_modal_title');
    expect( deleteModalTitle[0].tagName ).toBe('P');
    expect( deleteModalTitle[0].textContent ).toBe('Are you sure you want to delete this movie?');

    const deleteModalConfirmButton = await findAllByTestId('delete_modal_confirm_button');
    expect( deleteModalConfirmButton[0].tagName ).toBe('BUTTON');
    expect( deleteModalConfirmButton[0].textContent ).toBe('Confirm');

    // Delete Modal Close
    const modalCloseButton = await findAllByTestId('modal_close_button');
    expect( modalCloseButton[0].tagName ).toBe('H2');
    expect( modalCloseButton[0].textContent ).toBe('X');

    fireEvent.click( modalCloseButton[0] );
    expect( deleteModal.length ).not.toBe(1);
    expect( deleteModalTwo[0] ).toMatchObject({});

    // Movie Menu Close
    fireEvent.click( movieMenuButton[0] );
    expect( movieMenu.length ).not.toBe(1);
    expect( movieMenuTwo[0] ).toMatchObject({});
});

