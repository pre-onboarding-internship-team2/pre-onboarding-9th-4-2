import { render, screen, waitFor } from '@testing-library/react';

import { ProvidersWrapper } from '@utils/test.wrapper';

import Admin from './Admin';

describe('Admin', () => {
  it('should render Admin Page', async () => {
    //ARRANGE
    render(
      <ProvidersWrapper route="/admin">
        <Admin />
      </ProvidersWrapper>
    );
    //EXPECT
    expect(screen.getByLabelText('loading')).toBeVisible();

    waitFor(() => expect(screen.findByLabelText('admin-page')).toBeInTheDocument());
    screen.debug(await screen.findByLabelText('admin-page'));
  });
});
