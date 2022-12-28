import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Components
import Footer from '../components/footer';

test('<Footer /> validate footer component', () => {
    const { getByTestId } = render(<Footer />);

    const footerContainer = getByTestId('footer');
    expect( footerContainer ).toBeInTheDocument();
})