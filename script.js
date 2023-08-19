const button = document.querySelector('button');
const inputtext = document.querySelector('.input-items');
const lists = document.querySelector('.lists');

button.addEventListener('click', () => {
    createItems();
    inputtext.value = '';
    saveItems();
})

inputtext.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        createItems();
        inputtext.value = '';
        saveItems();
    }
})

lists.addEventListener('click', (event) => {
    if (event.target.classList.contains('item-check')) {
        saveItems();
    }
    else if (event.target.classList.contains('delete')) {
        event.target.parentElement.classList.add('items-out');

        let delbutton = document.querySelectorAll('.delete');
        let index = Array.from(delbutton).indexOf(event.target);

        for(let i = index; i < delbutton.length; i++) {
            delbutton[i].parentNode.classList.add('scroll-up');
        }

        for(let i = index; i < delbutton.length; i++) {
            delbutton[i].parentNode.addEventListener('animationend', () => {
                delbutton[i].parentElement.classList.remove("scroll-up");
            });
        }

        event.target.parentElement.remove();
        saveItems();
        // setTimeout(() => {
        // }, 200);
    }
})

function createItems() {
    if (inputtext.value === '') {
        return;
    }
    inputtext.value.trim();
    const items = document.createElement('div');
    const div = document.createElement('div');
    items.classList.add('items');

    const itemname = document.createElement('p');
    itemname.classList.add('item-name');

    const itemcheck = document.createElement('input');
    itemcheck.className = 'item-check';
    itemcheck.type = 'checkbox';

    const deleteitems = document.createElement('ion-icon');
    deleteitems.classList.add('delete');
    deleteitems.name = 'close';

    lists.appendChild(items);
    items.appendChild(div);
    div.appendChild(itemcheck);
    div.appendChild(itemname);
    items.classList.add('items-in');
    setTimeout(() => {
        items.classList.remove('items-in');
    }, 1000);
    items.appendChild(deleteitems);
    itemname.innerHTML = inputtext.value;
}

function saveItems() {
    const items = document.querySelectorAll('.items');
    let itemsArray = [];
    items.forEach(item => {
        let itemInfo = {
            name: item.querySelector('.item-name').innerHTML,
            check: item.querySelector('.item-check').checked
        }
        itemsArray.push(itemInfo);
    })
    localStorage.setItem('items', JSON.stringify(itemsArray));
}

function getItems() {
    let itemsArray = JSON.parse(localStorage.getItem('items'));
    itemsArray.forEach(item => {
        let items = document.createElement('div');
        const div = document.createElement('div');
        items.classList.add('items');

        const itemname = document.createElement('p');
        itemname.classList.add('item-name');

        const itemcheck = document.createElement('input');
        itemcheck.className = 'check item-check';
        itemcheck.type = 'checkbox';

        const deleteitems = document.createElement('ion-icon');
        deleteitems.classList.add('delete');
        deleteitems.name = 'close';

        lists.appendChild(items);
        items.appendChild(div);
        div.appendChild(itemcheck);
        div.appendChild(itemname);
        items.appendChild(deleteitems);
        itemname.innerHTML = item.name;
        itemcheck.checked = item.check;
    })
}

getItems();

