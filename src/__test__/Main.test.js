import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Store
import store from '../redux/store';

// components
import App from '../App';
import Main from '../components/main';

// Utils
import camelCase from '../utils/camelCase';

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

    // Genres
    const genreOptionAll = getByTestId('genre_option_all');
    expect( genreOptionAll ).toBeInTheDocument();
    expect( genreOptionAll.textContent ).toBe('All');

    fireEvent.click(genreOptionAll);
    params = new URLSearchParams(window.location.search);
    expect( camelCase(params.get('genre')) ).toBe(genreOptionAll.textContent);

    const genreOptionAction = getByTestId('genre_option_action');
    expect( genreOptionAction ).toBeInTheDocument();
    expect( genreOptionAction.textContent ).toBe('Action');

    fireEvent.click(genreOptionAction);
    params = new URLSearchParams(window.location.search);
    expect( camelCase(params.get('genre')) ).toBe(genreOptionAction.textContent);

    const genreOptionDocumentary = getByTestId('genre_option_documentary');
    expect( genreOptionDocumentary ).toBeInTheDocument();
    expect( genreOptionDocumentary.textContent ).toBe('Documentary');

    fireEvent.click(genreOptionDocumentary);
    params = new URLSearchParams(window.location.search);
    expect( camelCase(params.get('genre')) ).toBe(genreOptionDocumentary.textContent);

    const genreOptionComedy = getByTestId('genre_option_comedy');
    expect( genreOptionComedy ).toBeInTheDocument();
    expect( genreOptionComedy.textContent ).toBe('Comedy');

    fireEvent.click(genreOptionComedy);
    params = new URLSearchParams(window.location.search);
    expect( camelCase(params.get('genre')) ).toBe(genreOptionComedy.textContent);

    const genreOptionHorror = getByTestId('genre_option_horror');
    expect( genreOptionHorror ).toBeInTheDocument();
    expect( genreOptionHorror.textContent ).toBe('Horror');

    fireEvent.click(genreOptionHorror);
    params = new URLSearchParams(window.location.search);
    expect( camelCase(params.get('genre')) ).toBe(genreOptionHorror.textContent);

    const genreOptionCrime = getByTestId('genre_option_crime');
    expect( genreOptionCrime ).toBeInTheDocument();
    expect( genreOptionCrime.textContent ).toBe('Crime');

    fireEvent.click(genreOptionCrime);
    params = new URLSearchParams(window.location.search);
    expect( camelCase(params.get('genre')) ).toBe(genreOptionCrime.textContent);

    // SortBy
    const sortBySelect = getByTestId('sortby_select');
    expect( sortBySelect ).toBeInTheDocument();

    fireEvent.change(sortBySelect, { target: { value: 'release_date' } });
    expect( sortBySelect.value ).toBe('release_date');
    expect( sortBySelect.value ).not.toBe('vote_average');
    expect( sortBySelect.value ).not.toBe('runtime');

    params = new URLSearchParams(window.location.search);
    expect( params.get('sortBy') ).toBe('release_date');

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
});

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

    // Close and open again movie menu
    fireEvent.click( movieMenuCloseButtonTwo[0] );
    expect( movieMenu.length ).not.toBe(1);
    fireEvent.click( movieMenuButton[0] );

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

test('<AddOrEditForm /> validate reset form funcionality', async() => {
    const { getByTestId, findAllByTestId, queryByTestId } = render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );

    const addMovieButton = getByTestId('add_movie_button');
    fireEvent.click(addMovieButton);

    const resetFormMovieButton = getByTestId('new_movie_reset_form_button');
    expect( resetFormMovieButton ).toBeInTheDocument();

    const newMovieInputTitle = getByTestId('new_movie_input_title');
    expect( newMovieInputTitle ).toBeInTheDocument();
    expect( newMovieInputTitle.value ).toBe('');
    
    const newMovieSelectGenre = getByTestId('new_movie_input_genres');
    expect( newMovieSelectGenre ).toBeInTheDocument();
    expect( newMovieSelectGenre.value ).toBe('');
    expect( newMovieSelectGenre.className ).toBe('modal-module__input___3hdhz');
    
    // Validate Class of inputs not error
    expect( newMovieInputTitle.className ).toBe('modal-module__input___3hdhz');
    const newMovieSubmitButton = getByTestId('new_movie_submit_button');

    expect( newMovieSubmitButton ).toBeInTheDocument();
    await act(() => {
        fireEvent.click(newMovieSubmitButton);
    });

    // Validate Class of inputs error
    expect( newMovieInputTitle.className ).toBe('modal-module__inputWithError___3zQMu');
    expect( newMovieInputTitle.className ).not.toBe('modal-module__input___3hdhz');
    expect( newMovieSelectGenre.className ).toBe('modal-module__inputWithError___3zQMu');
    expect( newMovieSelectGenre.className ).not.toBe('modal-module__input___3hdhz');

    await act(() => {
        fireEvent.change(newMovieInputTitle, { target: { value: 'Testing title' } })
    });
    expect( newMovieInputTitle.value ).toBe('Testing title');

    // Reset form
    await act(() => {
        fireEvent.click(resetFormMovieButton);
    });
    expect( newMovieInputTitle.value ).toBe('');
})

