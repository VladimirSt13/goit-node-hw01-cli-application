import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import shortid from 'shortid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, './db/', 'contacts.json');

async function readData() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

export async function listContacts() {
  return await readData();
}

export async function getContactById(contactId) {
  const contacts = await readData();

  return contacts.find(contact => contact.id === contactId.toString());
}

export async function removeContact(contactId) {
  const contacts = await readData();

  const updatedContacts = contacts.filter(contact => contact.id !== contactId.toString());

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));

  return updatedContacts;
}

export async function addContact(name, email, phone) {
  const contacts = await readData();

  if (contacts.find(contact => contact.name.toLowerCase() === name.oLowerCase) > -1) {
    return `${name} already exist in base`;
  }

  const newContact = {
    id: shortid.generate(5),
    name,
    email,
    phone,
  };
  const updatedContacts = [...contacts, newContact];

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));

  return updatedContacts;
}
