import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from './card';

const defaultProps = {
  id: 1,
  name: 'Rick',
  imageUrl: 'rick-image-url.jpg',
};


describe('<Card>', () => {
  it('displayed correctly with default props', () => {
    const { getByRole } = render(<Card {...defaultProps}/>);
    expect(getByRole('heading')).toHaveTextContent(/Rick/i);
    expect(getByRole('img')).toHaveAttribute('src', 'rick-image-url.jpg');
    expect(getByRole('img')).toHaveAttribute('alt', 'Rick');
  });

  it('prop `onClick` passed and returns correct ID', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn();
    const { getByRole } = render(<Card {...defaultProps} onClick={onClick}/>);

    await user.click(getByRole('button', { name: /Rick/i }))
    expect(onClick).toHaveBeenCalledWith(1);
  });
});
