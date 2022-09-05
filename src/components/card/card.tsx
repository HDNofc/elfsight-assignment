import classNames from 'classnames';
import block from 'bem-css-modules';
import { ReactComponent as ProfileIcon } from '../../assets/icons/profile.svg';

import styles from './card.module.scss';
import { useState } from 'react';

const b = block(styles);

export interface CardProps {
  className?: string;
  id: number;
  name: string;
  imageUrl: string;
  onClick?: (id: number) => void;
}

export const Card = (props: CardProps): React.ReactElement => {
  const { className, id, imageUrl, name, onClick } = props;

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);


  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <li className={classNames(b(), className)}>
      <button className={b('button')} onClick={handleClick} type="button">
        {!imageLoaded && <ProfileIcon className={b('placeholder')} />}
        <img className={b('image', {'with-placeholder': !imageLoaded})} src={imageUrl} alt={name} onLoad={() => setImageLoaded(true)} />
        <h3 className={b('name')}>{name}</h3>
      </button>
    </li>
  );
};

Card.defaultProps = {
  className: null,
  onClick: () => {},
};
