import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import block from 'bem-css-modules';

import styles from './text-field.module.scss';

const b = block(styles);

interface Props {
  className?: string;
  id: string;
  value?: string;
  placeholder?: string;
  autoFocus?: boolean;
  name?: string;
  label: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const TextField = (props: Props): React.ReactElement => {
  const {
    id,
    name,
    placeholder,
    value,
    label,
    autoFocus,
    className,
    disabled,
    onChange,
    onBlur,
    onFocus,
  } = props;

  const [focused, setFocused] = useState<boolean>(false);
  const [filled, setFilled] = useState<boolean>(false);

  const handleChange = useCallback(
    ({ target: { value: nextValue } }: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(nextValue);
      setFilled(nextValue.length > 0);
    },
    [onChange]
  );

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.();
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.();
    },
    [onBlur]
  );

  return (
    <div className={classNames(b({ focused, filled }), className)}>
      <div className={b('container')}>
        <label className={b('label')} htmlFor={id}>
          {label}
        </label>
        <input
          className={b('input')}
          id={id}
          name={name}
          placeholder={placeholder}
          type="text"
          value={value}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          autoFocus={autoFocus}
        />
      </div>
    </div>
  );
};

TextField.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
  className: null,
  value: null,
  placeholder: null,
  autoFocus: false,
  name: null,
  disabled: false,
};
