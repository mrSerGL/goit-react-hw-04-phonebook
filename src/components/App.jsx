import React, { Component } from 'react';
import Name from './NameInput/Name';
import Chapter from './Chapter';
import Contacts from './ContactsList';
import FilterInput from './FilterInput';

import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    name: '',
    filter: '',
  };

  addContact = contact => {
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  onChangeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter, contacts } = this.state;

    const filterToLoverCase = this.state.filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterToLoverCase)
    );

    return (
      <>
        <div className={css.section}>
          <Chapter title="PHONEBOOK">
            <Name onSubmit={this.addContact} myContacts={this.state.contacts} />
          </Chapter>
        </div>

        {/* {this.state.contacts.length > 0 && (
          <div className={css.section}>
            <Chapter title="contacts">
              <FilterInput
                value={filter}
                onChangeFilter={this.onChangeFilter}
              />
              <Contacts
                data={filteredContacts}
                onDeleteContact={this.deleteContact}
              />
            </Chapter>
          </div>
        )} */}

        <div className={css.sectionContacts}>
          <Chapter title="contacts">
            <FilterInput value={filter} onChangeFilter={this.onChangeFilter} />
            <Contacts
              data={filteredContacts}
              onDeleteContact={this.deleteContact}
            />
          </Chapter>
        </div>
      </>
    );
  }
}

export default App;
