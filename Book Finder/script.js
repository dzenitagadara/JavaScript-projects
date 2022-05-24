let books = [
    {
        id: 1,
        title: 'The Book Thief',
        author: 'Markus Zusak'
    },
    {
        id: 2,
        title: 'Beautiful World Where Are You',
        author: 'Sally Rooney'
    },
    {
        id: 3,
        title: 'Island of the missing trees',
        author: 'Elif Shafak'
    },
    {
        id: 4,
        title: 'Tvrdjava',
        author: 'Mesa Selimovic'
    },
    {
        id: 5,
        title: 'The Promise',
        author: 'Damon Galgut'
    },
    {
        id: 6,
        title: 'The Stranger',
        author: 'Albert Camus'
    },
    {
        id: 7,
        title: 'A Tale of Two Cities',
        author: 'Charles Dickens'
    },
    {
        id: 8,
        title: 'The Little Prince',
        author: 'Antoine de Saint-Exupéry'
    },
    {
        id: 9,
        title: 'Harry Potter and the Prisoner of Azkaban',
        author: 'J. K. Rowling'
    },
    {
        id: 10,
        title: 'Harry Potter and the Goblet of Fire',
        author: 'J. K. Rowling'
    },
    {
        id: 11,
        title: 'Harry Potter and the Order of the Phoenix',
        author: 'J. K. Rowling'
    },
    {
        id: 12,
        title: 'The Name of the Rose',
        author: 'Umberto Eco'
    },
    {
        id: 13,
        title: 'Harry Potter and the Deathly Hallows',
        author: 'J. K. Rowling'
    },
    {
        id: 14,
        title: 'Gone Girl',
        author: 'Gillian Flynn'
    },
    {
        id: 15,
        title: 'The Lovely Bones',
        author: 'Alice Sebold'
    }
];

const columns = ['id', 'title', 'author'];
let copyOfBooks = books;


const tableBody = document.querySelector('.table tbody');// fetch <tbody></tbody> so we can append rows to it
const searchInput = document.getElementById('search');
const authorSelect = document.getElementById('authorSelect');

function removeDuplicatesFromArray(array) {
    return Array.from(new Set(array));
}

function renderAuthorsIntoSelect() {
    let authors = copyOfBooks.map(function (book) {
        return book.author;
    });
    authors = removeDuplicatesFromArray(authors);


    authors.forEach(item => {
        const option = document.createElement('option');
        option.setAttribute('value', item);
        option.innerText = item;

        authorSelect.appendChild(option);
    });
}

function createNewTableRow(book) {
    const createdRow = document.createElement('tr');

    let cells = columns.map(column => {
        let cell = document.createElement('td');
        cell.innerText = book[column];
        return cell;
    });

    createdRow.append(...cells);
    tableBody.appendChild(createdRow);
}

function generateList() {
    books.forEach(book => {
        createNewTableRow(book);
    });
}


function refreshList() {
    tableBody.innerHTML = ''; // remove old content
    generateList(); // re-render list
}

function filterBooksByTitle(searchTitle) {
    if (!searchTitle || !searchTitle.length) {
        books = copyOfBooks;
    } else {
        books = copyOfBooks.filter(book => book.title.toLowerCase().includes(searchTitle.toLowerCase()));
    }

    refreshList();
}

function filterBooksByAuthor(authorName) {
    if (!authorName || !authorName.length) {
        books = copyOfBooks;
    } else {
        books = copyOfBooks.filter(book => book.author === authorName);
    }

    refreshList();
}


searchInput.oninput = function () {
    filterBooksByTitle(searchInput.value);
    authorSelect.value = '';
}

authorSelect.onchange = function () {
    filterBooksByAuthor(authorSelect.value);
    searchInput.value = '';
}

generateList();
renderAuthorsIntoSelect();
