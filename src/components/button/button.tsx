import classNames from 'classnames';
import block from 'bem-css-modules';

import styles from './button.module.scss';

const b = block(styles);

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactElement;
  buttonType?: 'submit' | 'reset' | 'button';
  type?: 'primary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  shape?: 'circle' | 'round';
  onlyIcon?: boolean;
  wide?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: any;
}

export const Button = (props: ButtonProps): React.ReactElement => {
  const { children, className, buttonType, size, type, shape, onlyIcon, icon, disabled, wide, onClick, style } = props;

  return (
    <button
      className={classNames(b({ type, size, shape, wide, disabled, 'only-icon': onlyIcon }), className)}
      style={style}
      type={buttonType}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && icon}
      <span className={b('text')}>{children}</span>
    </button>
  );
};

Button.defaultProps = {
  children: null,
  type: 'primary',
  size: 'medium',
  buttonType: 'button',
};
