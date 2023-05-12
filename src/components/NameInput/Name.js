import { useState } from 'react';
import { nanoid } from 'nanoid';
import propTypes from 'prop-types';
import Chapter from 'components/Chapter';
import css from './Name.module.css';

const Name = props => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const { onSubmit, myContacts } = props;

  const nameInputId1 = nanoid();
  const nameInputId2 = nanoid();

  const handleChangeName = event => {
    setId(nanoid());
    setName(event.currentTarget.value);
  };

  const handleChangeNumber = event => {
    setId(nanoid());
    setNumber(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const existingContact = myContacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      alert(`${existingContact.name} is already exists in contacts!`);
      return;
    }

    setId(nanoid());

    onSubmit({
      id: id,
      name: name,
      number: number,
    });

    setName('');
    setNumber('');
    setId('');

    event.target.reset(); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <Chapter title="name">
        <label htmlFor={nameInputId1}>
          <input
            type="text"
            id={nameInputId1}
            className={css.input}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChangeName}
          />
        </label>
      </Chapter>
      <Chapter title="number">
        <label htmlFor={nameInputId2}>
          <input
            type="tel"
            id={nameInputId2}
            className={css.input}
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChangeNumber}
          />
        </label>
      </Chapter>
      <button type="submit" className={css.button}>
        add contact
      </button>
    </form>
  );
};

export default Name;

Name.propTypes = {
  onSubmit: propTypes.func.isRequired,
  myContacts: propTypes.arrayOf(propTypes.object).isRequired,
};
