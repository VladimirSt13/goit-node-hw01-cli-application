const fs = require('fs').promises;
const path = require('path');
import { nanoid } from 'nanoid';
import { normalize } from 'node:path/win32';

const contactsPath = './db/contacts.json';

async function readData() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function listContacts() {
  return await readData();
}

async function getContactById(contactId) {
  const contacts = await readData();

  return contacts.find(contact => contact.id === contactId.toString());
}

async function removeContact(contactId) {
  const contacts = await readData();
  const updatedContacts = contacts.filter(contact => contact.id !== contactId.toString());

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));

  return updatedContacts;
}

async function addContact(name, email, phone) {
  const contacts = await readData();
  const newContact = {
    id: nanoid(5),
    name,
    email,
    phone,
  };
  const updatedContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return updatedContacts;
}
