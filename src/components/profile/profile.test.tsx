import { queryByText, render } from '@testing-library/react';
import { Profile } from './profile';
import { rick } from '../../__mocks__/characters';

const defaultProps = {
  character: rick,
};

describe('<Profile>', () => {
  it('displayed correctly with default props', () => {
    const { getByText, getByRole, container } = render(<Profile {...defaultProps} />);
    expect(getByRole('img')).toHaveAttribute('src', 'rick-profile-avatar.jpg');
    expect(getByRole('heading', { level: 3 })).toHaveTextContent(/Rick Sanchez/i);

    expect(getByText(/Alive/i)).toBeInTheDocument();
    expect(getByText(/Male/i)).toBeInTheDocument();
    expect(getByText(/Earth \(C-137\)/i)).toBeInTheDocument();
    expect(getByText(/Citadel of Ricks/i)).toBeInTheDocument();
    expect(getByText(/Human/i)).toBeInTheDocument();
    expect(queryByText(container, /type/)).not.toBeInTheDocument()
  });

  it('displayed correctly with type in profile', () => {
    const profile = {
      ...rick,
      type: 'crazy scientist'
    }
    const { container } = render(<Profile character={profile} />);

    expect(queryByText(container, /crazy scientist/)).toBeInTheDocument()
  });
});
