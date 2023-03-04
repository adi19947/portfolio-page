const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (text !== '') {
        const item = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        const label = document.createElement('label');
        label.innerText = text;
        const button = document.createElement('button');
        button.innerText = 'Delete';
        button.addEventListener('click', () => {
            list.removeChild(item);
            updateLocalStorage();
        });
        item.appendChild(checkbox);
        item.appendChild(label);
        item.appendChild(button);
        list.appendChild(item);
        input.value = '';//
        updateLocalStorage();//
    }
});

function updateLocalStorage() {
    const items = [];
    for (let i = 0; i < list.children.length; i++) {
        const item = list.children[i];
        const text = item.querySelector('label').innerText;
        const completed = item.querySelector('input[type="checkbox"]').checked;
        items.push({ text, completed });
    }
    localStorage.setItem('todoItems', JSON.stringify(items));
}

function loadFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem('todoItems') || '[]');
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');

    }
}
