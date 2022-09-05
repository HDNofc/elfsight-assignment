import block from 'bem-css-modules';
import classNames from 'classnames';
import { SelectField } from '../../components/select-field';
import { Option } from '../../components/select-field/select-field';
import { TextField } from '../../components/text-field';
import { selectCharactersFilter } from '../../redux/characters/selectors';
import { setFilters } from '../../redux/characters/slice';
import { Filters as FiltersType } from '../../redux/characters/types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { GENDERS, STATUSES } from './constants';

import styles from './filters.module.scss';

const b = block(styles);

export interface FiltersProps {
  className?: string;
}

export const Filters = (props: FiltersProps): React.ReactElement => {
  const { className } = props;

  const dispatch = useAppDispatch();

  const filters = useAppSelector(selectCharactersFilter);

  const handleFilterTextFieldChange = (name: keyof FiltersType, inputValue: string) => {
    const normalizedValue = inputValue.replace(/[^a-z]/gi, '');
    if (filters[name] !== normalizedValue) {
      dispatch(setFilters({ [name]: normalizedValue }));
    }
  };

  const handleFilterSelectChange = (name: keyof FiltersType) => (option: Option | null) => {
    dispatch(setFilters({ [name]: option?.value ? option.value : '' }));
  };

  return (
    <div className={classNames(b(), className)}>
      <div className={b('text-fields-group')}>
        <TextField
          id="name"
          label="Name"
          onChange={(inputValue) => handleFilterTextFieldChange('name', inputValue)}
          value={filters.name}
        />
        <TextField
          id="type"
          label="Type"
          onChange={(inputValue) => handleFilterTextFieldChange('type', inputValue)}
          value={filters.type}
        />
        <TextField
          id="species"
          label="Species"
          onChange={(inputValue) => handleFilterTextFieldChange('species', inputValue)}
          value={filters.species}
        />
      </div>
      <div className={b('select-fields-group')}>
        <SelectField
          placeholder="Select status..."
          items={STATUSES}
          onChange={handleFilterSelectChange('status')}
          label="Status"
          id="status"
        />
        <SelectField
          placeholder="Select gender..."
          items={GENDERS}
          onChange={handleFilterSelectChange('gender')}
          label="Gender"
          id="gender"
        />
      </div>
    </div>
  );
};

export default Filters;
