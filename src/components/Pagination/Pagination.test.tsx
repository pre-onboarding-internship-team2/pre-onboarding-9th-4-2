import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ProvidersWrapper } from '@utils/test.wrapper';

import Paginaton from '.';

test('renders the pagination without separator', async () => {
  //ARRANGE
  render(
    <ProvidersWrapper route="/admin">
      <Paginaton />
    </ProvidersWrapper>
  );
  // There are 6 page number buttons displaying page numbers
  Array.from({ length: 6 }, (_, i) => i + 1).map((name) => async () => {
    const pageBtn = await screen.findByRole('button', { name: `${name}` });
    expect(pageBtn).toBeInTheDocument();
    //The first page button is checked others are not.
    if (name === 1) {
      expect(pageBtn).toBeChecked();
    } else {
      expect(pageBtn).not.toBeChecked();
    }
  });
});

test('renders the pagination first page selected', async () => {
  //ARRANGE
  render(
    <ProvidersWrapper route="/admin">
      <Paginaton />
    </ProvidersWrapper>
  );
  //EXPECT
  const pageOneBtn = await screen.findByRole('button', { name: '1' });
  fireEvent.click(pageOneBtn);

  // Prev button is disabled.
  const prevBtn = await screen.findByText('<');
  expect(prevBtn).toBeInTheDocument();
  expect(prevBtn).toBeDisabled();

  // Next button is enabled.
  const nextBtn = await screen.findByText('>');
  expect(nextBtn).toBeInTheDocument();
  expect(nextBtn).toBeEnabled();
});

test('renders the pagination third page selected', async () => {
  //ARRANGE
  render(
    <ProvidersWrapper route="/admin">
      <Paginaton />
    </ProvidersWrapper>
  );

  const pageFiveBtn = await screen.findByRole('button', { name: '3' });
  fireEvent.click(pageFiveBtn);

  // Prev button is enabled.
  const prevBtn = await screen.findByText('<');
  expect(prevBtn).toBeInTheDocument();
  expect(prevBtn).toBeEnabled();

  // Next button is enabled.
  const nextBtn = await screen.findByText('>');
  expect(nextBtn).toBeInTheDocument();
  expect(nextBtn).toBeEnabled();
});

test('renders the pagination last page selected', async () => {
  //ARRANGE
  render(
    <ProvidersWrapper route="/admin">
      <Paginaton />
    </ProvidersWrapper>
  );

  const pageLastBtn = await screen.findByRole('button', { name: '6' });
  fireEvent.click(pageLastBtn);

  // Prev button is enabled.
  const prevBtn = await screen.findByText('<');
  expect(prevBtn).toBeInTheDocument();
  expect(prevBtn).toBeEnabled();

  // Next button is disabled.
  const nextBtn = await screen.findByText('>');
  expect(nextBtn).toBeInTheDocument();
  expect(nextBtn).toBeDisabled();
});
