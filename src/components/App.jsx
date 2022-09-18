import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import { ContactForm } from "./ContactForm/ContactForm";
import {ContactList} from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";

export function App() {
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId),)
  }

  const addContacts = (data) => {
    console.log(data);

    const { name, number } = data;

    const namesArray = contacts.map(contact => contact.name);

    console.log(namesArray);

    if (namesArray.includes(name)) {
      alert("Rosie Simpson is already in contacts");
    }
    else {
      const contacts = {
        id: nanoid(),
        name,
        number,
      };
      
      setContacts(state => [contacts, ...state]);
    }
  }

  const changeFilter = e => {
    setFilter(e.target.value);
  }

  const getFilterdContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );

  }

    const filteredContacts = getFilterdContacts();

    return (
      <div>
        
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContacts} />
        
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList contacts={filteredContacts} onDeleteContact={deleteContact} />

      </div>
    )
  
};
