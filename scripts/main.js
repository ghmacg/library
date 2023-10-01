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

    removeBook(book) {
        const index = Number(book.dataset.indexNumber);
        this.books.splice(index, 1);
    };
};

const screenController = (() => {
    const library = new Library;

    const cardContainer = document.getElementById('card-container');
    const dialog = document.getElementById("add-book-dialog");
    const showDialogBtn = document.getElementById("show-dialog");
    const cancelDialogBtn = dialog.querySelector('#cancel-dialog');
    const closeDialogBtn = dialog.querySelector("#close-dialog");
    
    // Display books that are in library
    function updateBooks() {
        cardContainer.innerHTML = '';
    
        for (let i in library.books) {
            createBookCard(library.books[i], i);
        };
    };
    
    function resetInputValues() {
        const title = document.getElementById('title').value = '';
        const author = document.getElementById('author').value = '';
        const pages = document.getElementById('pages').value = '';
        const isRead = document.getElementById('is-read').checked = false;
    };

    // Returns book info inputted in the dialog when adding a book
    function getInputValues() {
        const title = document.getElementById('title').value;
        if (title === '') title = 'Unknown';

        const author = document.getElementById('author').value;
        if (author === '') author = 'Unknown';

        const pages = document.getElementById('pages').value;
        if (pages === '') pages = '0';

        const isRead = document.getElementById('is-read').checked;

        return new Book(title, author, pages, isRead);
    };
    
    // Function to create new book with the info inputted by the user,
    //first it calls getInputBookInfo and then add that info into the library 
    function createBook() {
        const newBook = getInputValues();
        resetInputValues();
    
        library.addBook(newBook);
        updateBooks();
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
    
        addRemoveBookFunc(removeBtn, card);
        addIsReadFunc(isReadBtn, index);
    };
    
    // Add functionality to the remove button on each book card
    function addRemoveBookFunc(button, book) {
        button.addEventListener('click', () => {
            library.removeBook(book);
            updateBooks();
        });
    };
    
    // Add functionality to isRead button on each book card
    function addIsReadFunc(button, index) {
        button.addEventListener('click', () => {
            library.books[index].isRead = library.books[index].isRead ? false : true;

            updateBooks();
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
    };
    
    updateBooks();
    controlDialog();
})();