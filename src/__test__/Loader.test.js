import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Components
import Loader from '../components/loader';

test('<Loader /> validate loader component', () => {
    const { getByTestId } = render(<Loader />);

    const loader = getByTestId('loader');
    expect( loader ).toBeInTheDocument();
    expect( loader.tagName ).toBe('DIV');
})