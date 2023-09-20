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
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(newBook) {
        this.books.push(newBook);
    }
}

// Display
const cardContainer = document.getElementById('card-container');

function showBooks(library) {
    library.books.forEach(book => {
        const card = document.createElement('div');
        const title = document.createElement('div');
        const author = document.createElement('div');
        const pages = document.createElement('div');
        const isReadBtn = document.createElement('button');
        const removeBtn = document.createElement('button');
        
        card.classList.add('card');
        
        title.innerHTML = `"${book.title}"`;
        author.innerHTML = book.author;
        pages.innerHTML = `${book.pages} pages`;
        isReadBtn.innerHTML = book.isRead;
        removeBtn.innerHTML = 'Remove';
        
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(isReadBtn);
        card.appendChild(removeBtn);
        cardContainer.appendChild(card);
    })
}
