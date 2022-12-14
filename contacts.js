const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');
const contactsPath = path.join(__dirname, './db/', 'contacts.json');

async function readData() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
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
  try {
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  } catch (error) {
    console.error(error);
  }
0

  return updatedContacts;
}

async function addContact(name, email, phone) {
  const contacts = await readData();

  const isExistContactInDb = contacts.findIndex(
    contact => contact.name.toLowerCase() === name.toLowerCase()
  );

  if (isExistContactInDb > -1) {
    console.log(`There is exist contact with name: ${name} in db`);
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

  try {
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));

    return updatedContacts;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
