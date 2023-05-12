import { useState, useEffect } from 'react';
import Name from './NameInput/Name';
import Chapter from './Chapter';
import Contacts from './ContactsList';
import FilterInput from './FilterInput';

import css from './App.module.css';

const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? ''
  );

  useEffect(() => {
    const contacts = window.localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    setContacts(prevState => [...prevState, contact]);
  };

  const onChangeFilter = event => {
    setFilter(event.target.value);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const filterToLoverCase = filter.toLowerCase();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterToLoverCase)
  );

  return (
    <>
      <div className={css.section}>
        <Chapter title="PHONEBOOK">
          <Name onSubmit={addContact} myContacts={contacts} />
        </Chapter>
      </div>

      <div className={css.sectionContacts}>
        <Chapter title="contacts">
          <FilterInput value={filter} onChangeFilter={onChangeFilter} />
          <Contacts data={filteredContacts} onDeleteContact={deleteContact} />
        </Chapter>
      </div>
    </>
  );
};

export default App;
