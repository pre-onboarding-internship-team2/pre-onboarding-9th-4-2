import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ProvidersWrapper } from '@utils/test.wrapper';

import Admin from '@pages/Admin';

test('should filter status true when radio true clicked', async () => {
  render(
    <ProvidersWrapper route="/admin">
      <Admin />
    </ProvidersWrapper>
  );
  // ARRANGE
  await screen.findByRole('radiogroup');
  const radios = screen.getAllByRole('radio');
  expect(radios).toHaveLength(3);

  const tableBody = screen.getByLabelText('table-body');
  const statusFalse = await screen.findAllByLabelText('status-false');
  const radioTrue = screen.getByRole('radio', { name: '배송완료' });

  // ACT
  fireEvent.click(radioTrue);

  // EXPECT
  expect(radioTrue).toBeChecked();
  expect(tableBody).not.toContain(statusFalse);
  // screen.debug(tableBody);
});

test('should filter status false when radio fals clicked', async () => {
  render(
    <ProvidersWrapper route="/admin">
      <Admin />
    </ProvidersWrapper>
  );
  // ARRANGE
  await screen.findByRole('radiogroup');
  const radios = screen.getAllByRole('radio');
  expect(radios).toHaveLength(3);

  const tableBody = screen.getByLabelText('table-body');
  const statusTrue = screen.getAllByLabelText('status-true');
  const radioFalse = screen.getByRole('radio', { name: '상품준비중' });

  // ACT
  fireEvent.click(radioFalse);

  // EXPECT
  expect(radioFalse).toBeChecked();
  expect(tableBody).not.toContain(statusTrue);
  // screen.debug(tableBody);
});

test('should filter status all when radio all clicked', async () => {
  render(
    <ProvidersWrapper route="/admin?status=true">
      <Admin />
    </ProvidersWrapper>
  );
  // ARRANGE
  await screen.findByRole('radiogroup');
  const radios = screen.getAllByRole('radio');
  expect(radios).toHaveLength(3);

  const radioAll = screen.getByRole('radio', { name: '전체' });

  // ACT
  fireEvent.click(radioAll);

  // EXPECT
  expect(radioAll).toBeChecked();
  waitFor(() => expect(screen.getAllByLabelText('status-true')).toBeInTheDocument());
  waitFor(() => expect(screen.getAllByLabelText('status-false')).toBeInTheDocument());
});

test('should show only searched name', async () => {
  render(
    <ProvidersWrapper route="/admin/">
      <Admin />
    </ProvidersWrapper>
  );
  // ARRANGE
  await screen.findByRole('radiogroup');

  // ACT
  fireEvent.change(screen.getByLabelText('search-name'), { target: { value: 'ann' } });
  const input = screen.getByDisplayValue('ann') as HTMLInputElement;
  expect(input.value).toEqual('ann');

  const searchBtn = screen.getByRole('button', { name: '검색' });
  fireEvent.click(searchBtn);

  // EXPECT
  // tableBody should contain all datas that customer_name field includes "ann"
  // screen.debug(screen.getByLabelText('table-body'));
});
