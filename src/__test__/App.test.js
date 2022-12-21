import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Components
import App from '../App';

test('<App /> validate main component', () => {
    const { getByTestId } = render(<App />);

    const appContainer = getByTestId("app");
    expect( appContainer ).toBeInTheDocument;
    expect( appContainer.classList.contains('App') ).toBe(true);
})