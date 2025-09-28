import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Feature from './Feature';

const renderFeatureWithRouter = () => {
    return render(
        <BrowserRouter>
        <Feature />
        </BrowserRouter>
    )
};

test('renders Feature component', () => {
 renderFeatureWithRouter();
  const backButtonElement = screen.getByRole('button', { name: /← Back to Main Page/i });
  expect(backButtonElement).toBeInTheDocument();
  const heroSectionElement = screen.getByText(/Management/i);
  expect(heroSectionElement).toBeInTheDocument();

});