import classNames from 'classnames';
import block from 'bem-css-modules';

import styles from './card-list.module.scss';
import { Character } from '../../redux/characters/types';
import { Card } from '../card/card';

const b = block(styles);

export interface CardListProps {
  className?: string;
  items: Character[];
  onCardClick: (id: number) => void;
}

export const CardList = (props: CardListProps): React.ReactElement => {
  const { className, items, onCardClick } = props;

  return (
    <ul className={classNames(b(), className)}>
      {items &&
        items.map(({ id, image, name }) => (
          <Card className={b('card')} key={id} id={id} imageUrl={image} name={name} onClick={onCardClick}/>
        ))}
    </ul>
  );
};

CardList.defaultProps = {
  className: null,
};
