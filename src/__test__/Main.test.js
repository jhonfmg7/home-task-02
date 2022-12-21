import * as React from 'react';
import { Provider } from 'react-redux';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Store
import store from '../redux/store';

// components
import Main from '../components/main';
import { BrowserRouter } from 'react-router-dom';

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

    fireEvent.click( movieMenuButton[0] );
    const movieMenuTwo = await queryAllByTestId('movie_menu');
    expect( movieMenuTwo.length ).toBe(1);

    // Delete Modal Open
    const deleteModal = await queryAllByTestId('delete_modal');
    expect( deleteModal.length ).not.toBe(1);

    const deleteModalButton = await findAllByTestId('delete_modal_button');
    expect( deleteModalButton[0].textContent ).toBe("Delete");

    const editModalButton = await findAllByTestId('edit_modal_button');
    expect( editModalButton[0].textContent ).toBe("Edit");

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
})