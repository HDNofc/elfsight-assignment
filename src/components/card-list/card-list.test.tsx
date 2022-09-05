import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardList } from './card-list';
import { characters } from '../../__mocks__/characters';

const defaultProps = {
  items: characters,
  onCardClick: () => {},
};

describe('<CardList>', () => {
  it('displayed two <Card> components correctly with default props', () => {
    const { getAllByRole } = render(<CardList {...defaultProps} />);
    expect(getAllByRole('button')).toHaveLength(2)
  });

  it('prop `onClick` passed and returns correct ID', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    const { getByRole } = render(<CardList {...defaultProps} onCardClick={onClick} />);

    await user.click(
      getByRole('button', {
        name: /rick sanchez/i,
      })
    );
    expect(onClick).toHaveBeenCalledWith(1);
  });
});
