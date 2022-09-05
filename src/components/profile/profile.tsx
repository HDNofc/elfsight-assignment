import classNames from 'classnames';
import block from 'bem-css-modules';

import styles from './profile.module.scss';
import { Character } from '../../redux/characters/types';

import { ReactComponent as ProfileIcon } from '../../assets/icons/profile.svg';
import { useState } from 'react';

const b = block(styles);

export interface ProfileProps {
  className?: string;
  character: Character;
}

export const Profile = (props: ProfileProps): React.ReactElement => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const {
    className,
    character: { image, name, status, species, type, gender, origin, location },
  } = props;

  return (
    <div className={classNames(b(), className)}>
      {!imageLoaded && <ProfileIcon className={b('placeholder')} />}
      <img
        className={b('image', {'with-placeholder': !imageLoaded})}
        src={image}
        alt={name}
        onLoad={() => setImageLoaded(true)}
      />
      <h3 className={b('name')}>{name}</h3>

      <div className={b('section')}>
        <span>Status</span>
        <span>{status}</span>
      </div>

      <div className={b('section')}>
        <span>Gender</span>
        <span>{gender}</span>
      </div>

      {type && (
        <div className={b('section')}>
          <span>Type</span>
          <span>{type}</span>
        </div>
      )}

      <div className={b('section')}>
        <span>Origin location</span>
        <span>{origin.name}</span>
      </div>

      <div className={b('section')}>
        <span>Last location</span>
        <span>{location.name}</span>
      </div>

      <div className={b('section')}>
        <span>Species</span>
        <span>{species}</span>
      </div>
    </div>
  );
};

Profile.defaultProps = {
  className: null,
};
