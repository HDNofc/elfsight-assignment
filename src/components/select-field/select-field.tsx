import classNames from 'classnames';
import ReactSelect from 'react-select';
import block from 'bem-css-modules';

import styles from './select-field.module.scss';

const b = block(styles)

export interface Option {
  label: string | React.ReactNode;
  value: string | number;
}

export type IsMulti = false;

export interface SelectFieldProps {
  className?: string;
  items: Option[];
  id?: string;
  label?: string;
  placeholder: string;
  onChange: (option: Option | null) => void;
}

export const SelectField = (props: SelectFieldProps): React.ReactElement => {
  const { className, items, label, id, placeholder, onChange } = props;

  const handleChange = (option: Option | null) => {
    onChange(option);
  };

  return (
    <div className={classNames(b(), className)}>
      <div className={b('container')}>
        <label className={b('label')} htmlFor={id}>
          {label}
        </label>
        <ReactSelect
          className="react-select"
          classNamePrefix="react-select"
          options={items}
          placeholder={placeholder}
          isClearable
          isSearchable={false}
          onChange={handleChange}
          inputId={id}
        />
      </div>
    </div>
  );
};
