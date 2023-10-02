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
        this.isRead = isRead;
    };
};

class Library {
    constructor() {
        this.books = [];
    };

    addBook(book) {
        this.books.push(book);
    };

    removeBook(index) {
        this.books.splice(index, 1);
    };
};

const screenController = (() => {
    const library = new Library;

    const cardContainer = document.getElementById('card-container');
    const dialog = document.getElementById("add-book-dialog");
    const showDialogBtn = document.getElementById("show-dialog");
    const cancelDialogBtn = dialog.querySelector('#cancel-dialog');
    const SubmitDialogBtn = dialog.querySelector("#submit-dialog");
    
    // Display books that are in library
    const updateBooks = () => {
        cardContainer.innerHTML = '';
    
        for (let i in library.books) {
            createBookCard(library.books[i], i);
        };
    };
    
    const resetInputValues = () => {
        const title = document.getElementById('title').value = '';
        const author = document.getElementById('author').value = '';
        const pages = document.getElementById('pages').value = '';
        const isRead = document.getElementById('is-read').checked = false;
    };

    // Returns book info inputted in the dialog when adding a book
    const getInputValues = () => {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const isRead = document.getElementById('is-read').checked;

        if (title === '') title = 'Unknown';
        if (author === '') author = 'Unknown';
        if (pages === '') pages = '0';

        return new Book(title, author, pages, isRead);
    };
    
    // Function to create new book with the info inputted by the user,
    //first it calls getInputBookInfo and then add that info into the library 
    const createBook = () => {
        const newBook = getInputValues();
        library.addBook(newBook);
        resetInputValues();
        updateBooks();
    };
    
    // Function to create all elements for the book card and append card to card container
    const createBookCard = (book, index) => {
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
        
        title.innerHTML = book.title;
        author.innerHTML = book.author;
        pages.innerHTML = book.pages;
        isReadBtn.innerHTML = book.isRead ? 'Read' : 'Not Read';
        removeBtn.innerHTML = 'Remove';    
        
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(isReadBtn);
        card.appendChild(removeBtn);
        cardContainer.appendChild(card);
        
        // Change background color of button depending if it says Read or Not Read
        book.isRead ? 
            isReadBtn.style.backgroundColor = '#9fff9c' : 
            isReadBtn.style.backgroundColor = '#ff9c9c';
    
        addRemoveBookFunc(removeBtn, index);
        addIsReadFunc(isReadBtn, index);
    };
    
    // Add functionality to the remove button on each book card
    const addRemoveBookFunc = (button, index) => {
        button.addEventListener('click', () => {
            library.removeBook(index);
            updateBooks();
        });
    };
    
    // Add functionality to isRead button on each book card
    const addIsReadFunc = (button, index) => {
        button.addEventListener('click', () => {
            library.books[index].isRead = library.books[index].isRead ? false : true;
            updateBooks();
        });
    };
    
    showDialogBtn.addEventListener("click", () => dialog.showModal());
      
    cancelDialogBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dialog.close();
    });

    SubmitDialogBtn.addEventListener("click", (e) => {
        createBook();
        e.preventDefault();
        dialog.close();
    });

    
    updateBooks();
    controlDialog();
})();