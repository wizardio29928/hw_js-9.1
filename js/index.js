const nameInput = document.getElementById('name');
const surnameInput = document.getElementById('surname');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const addBtn = document.getElementById('addBtn');
const contactList = document.getElementById('contactList');

let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function renderContacts() {
    contactList.innerHTML = '';
    contacts.forEach((contact, index) => {
        const div = document.createElement('div');
        div.className = 'contact';

        const info = document.createElement('div');
        info.className = 'contact-info';
        info.innerHTML = `
      <strong>${contact.name} ${contact.surname}</strong><br>
      Телефон ${contact.phone}<br>
      Пошта ${contact.email}
    `;

        const buttons = document.createElement('div');
        buttons.className = 'contact-buttons';

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Редагувати';
        editBtn.onclick = () => editContact(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Видалити';
        deleteBtn.className = 'delete';
        deleteBtn.onclick = () => {
            contacts.splice(index, 1);
            saveContacts();
            renderContacts();
        };

        buttons.append(editBtn, deleteBtn);
        div.append(info, buttons);
        contactList.appendChild(div);
    });
}

function addContact() {
    const name = nameInput.value.trim();
    const surname = surnameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !surname || !phone || !email) {
        alert('Заповніть всі поля!');
        return;
    }

    contacts.push({ name, surname, phone, email });
    saveContacts();
    renderContacts();

    nameInput.value = '';
    surnameInput.value = '';
    phoneInput.value = '';
    emailInput.value = '';
}

function editContact(index) {
    const contact = contacts[index];

    nameInput.value = contact.name;
    surnameInput.value = contact.surname;
    phoneInput.value = contact.phone;
    emailInput.value = contact.email;

    addBtn.textContent = 'Зберегти зміни';
    addBtn.onclick = () => {
        contacts[index] = {
            name: nameInput.value.trim(),
            surname: surnameInput.value.trim(),
            phone: phoneInput.value.trim(),
            email: emailInput.value.trim()
        };

        saveContacts();
        renderContacts();

        nameInput.value = '';
        surnameInput.value = '';
        phoneInput.value = '';
        emailInput.value = '';
        addBtn.textContent = 'Додати контакт';
        addBtn.onclick = addContact;
    };
}

addBtn.addEventListener('click', addContact);
renderContacts();