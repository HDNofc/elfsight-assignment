import classNames from 'classnames';
import block from 'bem-css-modules';

import styles from './throbber.module.scss';

const b = block(styles);

export interface ThrobberProps {
  className?: string;
}

export const Throbber = (props: ThrobberProps): React.ReactElement => {
  const { className } = props;
  return <span className={classNames(b(), className)}></span>;
};

Throbber.defaultProps = {
  className: null,
};
