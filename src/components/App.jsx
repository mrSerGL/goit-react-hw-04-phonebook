import { useState, useEffect } from 'react';
import Name from './NameInput/Name';
import Chapter from './Chapter';
import Contacts from './ContactsList';
import FilterInput from './FilterInput';

import css from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  // const [name, setName] = useState('');
  const [filter, setFilter] = useState('');

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

//- =======================================================

// class App extends Component {
//   state = {
//     contacts: [],
//     name: '',
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedTodos = JSON.parse(contacts);

//     //- проверка на наличие записей в тудус, если NULL - может все поламается

//     if (parsedTodos) {
//       this.setState({ contacts: parsedTodos });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {

//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = contact => {
//     this.setState(prevState => ({
//       contacts: [contact, ...prevState.contacts],
//     }));
//   };

//   onChangeFilter = event => {
//     this.setState({ filter: event.target.value });
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   render() {
//     const { filter, contacts } = this.state;

//     const filterToLoverCase = this.state.filter.toLowerCase();
//     const filteredContacts = contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filterToLoverCase)
//     );

//     return (
//       <>
//         <div className={css.section}>
//           <Chapter title="PHONEBOOK">
//             <Name onSubmit={this.addContact} myContacts={this.state.contacts} />
//           </Chapter>
//         </div>

//         <div className={css.sectionContacts}>
//           <Chapter title="contacts">
//             <FilterInput value={filter} onChangeFilter={this.onChangeFilter} />
//             <Contacts
//               data={filteredContacts}
//               onDeleteContact={this.deleteContact}
//             />
//           </Chapter>
//         </div>
//       </>
//     );
//   }
// }
