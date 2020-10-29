// variables
const btnAddCard = document.querySelector('button');
const popUpWindow = document.querySelector('.popup');
const iconeClose = document.querySelector('.fa-times-circle');
const addCardForm = document.querySelector('.addCard');
const container = document.querySelector('.container');
const lis = document.getElementsByTagName('li');
let counter = 0;
let change = false;

// functions
function addCard(e) {
    e.preventDefault()
    let cardName = this.querySelector('#cardName').value;
    this.reset();
    popUpWindow.classList.remove('popupDisplay');
    container.append(createElement(cardName))
}

function createElement(cardName) {
    // main container
    const divContainer = document.createElement('div');
    divContainer.classList.add('wrapper');
    // close icon
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('far', 'fa-times-circle', 'closeCard');
    divContainer.append(closeIcon);
    // title
    const h2 = document.createElement('h2');
    h2.classList.add('title');
    h2.textContent = cardName
    divContainer.append(h2);
    // hr
    const hr = document.createElement('hr');
    divContainer.append(hr);
    // list
    const ul = document.createElement('ul');
    ul.dataset.id = counter;
    divContainer.append(ul);
    // form
    const form = document.createElement('form');
    form.classList.add('taskForm');
    form.dataset.id = counter;
    form.innerHTML = `<input type="text" name="task" id="task" placeholder="add task">
    <input type="submit" value="approve task">
`;
    divContainer.append(form);
    counter++;
    // taskFormListener.push(divContainer.querySelector('.taskForm'))
    return divContainer;
}

function addTask(e) {
    if (e.target.classList.contains('taskForm')) {
        e.preventDefault();
        let clickedEl = e.target.parentElement.querySelector('ul').dataset.id
        const ul = this.getElementsByTagName('ul');

        const content = e.target.parentElement.querySelector('#task').value;
        ul[clickedEl].append(createLi(content));
        e.target.parentElement.querySelector('.taskForm').reset();
    }
}

function createLi(content) {
    const li = document.createElement('li');
    li.innerHTML = `<i class="far fa-circle circle"></i>
    <i class="fas fa-trash-alt trash"></i>
    <span class="taskToDo">${content}</span>
`
    return li;
}

function tickPosition(element) {
    element.querySelector('span').classList.toggle('lineThrough');
    ['far', 'fa-circle', 'circle', 'fas', 'fa-check-circle', 'ticked'].forEach(el => {
        element.querySelector('i').classList.toggle(el);
    })
}

// btn
btnAddCard.addEventListener('click', () => {
    popUpWindow.classList.add('popupDisplay')
})

iconeClose.addEventListener('click', () => {
    popUpWindow.classList.remove('popupDisplay')
})

window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        popUpWindow.classList.remove('popupDisplay')
    }
})

addCardForm.addEventListener('submit', addCard);

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('closeCard')) {
        e.target.parentElement.remove();
    } else if (e.target.classList.contains('trash')) {
        e.target.parentElement.remove();
    } else if (e.target.parentElement.tagName === 'LI') {
        tickPosition(e.target.parentElement)
    }
})

container.addEventListener('submit', addTask)