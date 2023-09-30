import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = newContact => {
    const isAlreadyExist = this.state.contacts.find(
      el => el.name.toLocaleLowerCase() === newContact.name.toLowerCase()
    );
    if (isAlreadyExist) return alert('Already Exist');
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  filter = filterName => {
    this.setState({
      filter: filterName,
    });
  };

  deleteContact = id => {
    const updateContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({
      contacts: updateContacts,
    });
  };

  render() {
    const normalizeFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
    return (
      <>
        <div className={css.container}>
          <h1>Phonebook</h1>
          <ContactForm addContact={this.addContact} />
          <h2>Contacts</h2>
          <Filter filter={this.filter} />
          <ContactList
            contacts={visibleContacts}
            deleteContact={this.deleteContact}
          />
        </div>
      </>
    );
  }
}
