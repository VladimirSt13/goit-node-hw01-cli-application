const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');
const contactsPath = path.join(__dirname, './db/', 'contacts.json');

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

  const isExistContactInDb = contacts.findIndex(contact => contact.id === contactId.toString());

  if (isExistContactInDb === -1) {
    console.log(`There is no contact with id ${contactId}`);
    return contacts;
  }
  console.table(`Contact removed`);
  const updatedContacts = contacts.filter(contact => contact.id !== contactId.toString());

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));

  return updatedContacts;
}

async function addContact(name, email, phone) {
  const contacts = await readData();

  const isExistContactInDb = contacts.findIndex(
    contact => contact.name.toLowerCase() === name.toLowerCase()
  );

  if (isExistContactInDb > -1) {
    return contacts;
  }

  const newContact = {
    id: shortid.generate(5),
    name,
    email,
    phone,
  };

  console.table(`Contact is added`);

  const updatedContacts = [...contacts, newContact];

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));

  return updatedContacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
