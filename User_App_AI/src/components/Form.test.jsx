import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Form from './Form';

const renderFormWithRouter = () => {
    return render(
        <BrowserRouter>
        <Form />
        </BrowserRouter>
    )
};

test('renders Form component', () => {
  renderFormWithRouter();
  const submitButtonElement = screen.getByRole('button', { type: /submit/i });
  expect(submitButtonElement).toBeInTheDocument();
  const backButtonElement = screen.getByRole('button', { name: /← Back to Features/i });
  expect(backButtonElement).toBeInTheDocument();

});