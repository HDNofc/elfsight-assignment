import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './';

describe('<Button>', () => {
  it('displayed correctly', () => {
    const { getByRole } = render(<Button />);
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('prop `children` passed correctly', () => {
    const { getByRole, getByText } = render(<Button>hello</Button>);
    expect(getByRole('button')).toHaveTextContent(/hello/i);
    expect(getByRole('button')).toContainElement(getByText(/hello/i))
  });

  it('type `button` added by default', () => {
    const { getByRole } = render(<Button/>);
    expect(getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('prop `buttonType` passed correctly', () => {
    const { getByRole, rerender } = render(<Button buttonType="submit" />);
    expect(getByRole('button')).toHaveAttribute('type', 'submit');

    rerender(<Button buttonType="reset" />);
    expect(getByRole('button')).toHaveAttribute('type', 'reset');
  });

  it('prop `onClick` passed and called correctly', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn();
    const { getByRole } = render(<Button onClick={onClick}/>);

    await user.click(getByRole('button'))
    expect(onClick).toHaveBeenCalled();
  });

  it('prop `icon` passed correctly', () => {
    const mockIcon = <span>icon</span>
    const { getByRole, getByText } = render(<Button icon={mockIcon}/>);

    expect(getByRole('button')).toContainElement(getByText(/icon/i));
  });
});
