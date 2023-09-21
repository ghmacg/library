// Data structures
class Book {
    constructor(
        title='Unknown',
        author='Unknown',
        pages='0',
        isRead=false
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead ? 'Read' : 'Not Read';
    };
};

class Library {
    constructor() {
        this.books = [];
    };

    addBook(book) {
        this.books.push(book);
    };

    removeBook(book) {
        const index = Number(book.dataset.indexNumber);
        this.books.splice(index, 1);
    };
};

// User Interface
const cardContainer = document.getElementById('card-container');
const dialog = document.getElementById("add-book-dialog");
const showDialogBtn = document.getElementById("show-dialog");
const cancelDialogBtn = dialog.querySelector('#cancel-dialog');
const closeDialogBtn = dialog.querySelector("#close-dialog");

// Delete all child cards of card container
const resetDisplayBooks = () => cardContainer.innerHTML = '';

// Display books that are in library
function updateDisplayBooks() {
    resetDisplayBooks();

    for (let book in library.books) {
        createBookCard(library.books[book], book);
    };
};

// Returns book info inputted in the dialog when adding a book
function getInputBookInfo() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('is-read').checked;
    return new Book(title, author, pages, isRead);
};

// Function to create new book with the info inputted by the user,
//first it calls getInputBookInfo and then add that info into the library 
function createBook() {
    const newBook = getInputBookInfo();

    library.addBook(newBook);
    updateDisplayBooks();
};

// Function to create all elements for the book card and append card to card container
function createBookCard(book, index) {
    const card = document.createElement('div');
    const title = document.createElement('div');
    const author = document.createElement('div');
    const pages = document.createElement('div');
    const isReadBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    card.classList.add('card');
    card.dataset.indexNumber = index;
    title.classList.add('book-title');
    removeBtn.classList.add('remove-button');
    
    title.innerHTML = book.title != '' ? `"${book.title}"` : 'Unknown';
    author.innerHTML = book.author != '' ? book.author : 'Unknown';
    pages.innerHTML = book.pages != '' ? `${book.pages} pages` : '0';
    isReadBtn.innerHTML = book.isRead;
    removeBtn.innerHTML = 'Remove';    
    
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(isReadBtn);
    card.appendChild(removeBtn);
    cardContainer.appendChild(card);
    
    // Change background color of button depending if it says Read or Not Read
    book.isRead === 'Read' ? 
        isReadBtn.style.backgroundColor = '#9fff9c' : 
        isReadBtn.style.backgroundColor = '#ff9c9c';

    addRemoveBookFunc(removeBtn, card);
    addIsReadFunc(isReadBtn, index);
};

// Add functionality to the remove button on each book card
function addRemoveBookFunc(button, book) {
    button.addEventListener('click', () => {
        library.removeBook(book);
        updateDisplayBooks();
    });
};

// Add functionality to isRead button on each book card
function addIsReadFunc(button, index) {
    button.addEventListener('click', () => {
        if (library.books[index].isRead === 'Read') {
            library.books[index].isRead = 'Not Read';
        } else {
            library.books[index].isRead = 'Read';
        };

        updateDisplayBooks();
    });
};

// Function to control when the dialog opens and closes
function controlDialog() {
    showDialogBtn.addEventListener("click", () => dialog.showModal());
      
    cancelDialogBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dialog.close();
    });

    closeDialogBtn.addEventListener("click", (e) => {
        createBook();

        e.preventDefault();
        dialog.close();
    });
}

// Function calling
const library = new Library;

updateDisplayBooks();
controlDialog();