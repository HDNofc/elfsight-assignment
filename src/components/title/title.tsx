import classNames from 'classnames';
import block from 'bem-css-modules';

import styles from './title.module.scss';

const b = block(styles);

export interface TitleProps {
  as?: HeadingTag;
  children?: React.ReactNode;
  className?: string;
}

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export const Title = (props: TitleProps): React.ReactElement => {
  const { className, children, as: Tag = 'h1' } = props;


  return (
    <Tag className={classNames(b(), className)}>
      {children}
    </Tag>
  );
};

Title.defaultProps = {
  as: 'h1',
  children: null,
  className: null,
};
