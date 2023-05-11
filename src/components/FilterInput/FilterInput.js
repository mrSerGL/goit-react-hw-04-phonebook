import propTypes from 'prop-types';
import css from './FilterInput.module.css';

function FilterInput({ value, onChangeFilter }) {
  return (
    <>
      <p className={css.input__name}>find contacts by name</p>
      <label htmlFor={1}>
        <input
          type="text"
          className={css.input}
          name="name"
          value={value}
          id={1}
          onChange={onChangeFilter}
        ></input>
      </label>
    </>
  );
}

FilterInput.propTypes = {
  onChangeFilterr: propTypes.func,
  value: propTypes.string,
};

export default FilterInput;
