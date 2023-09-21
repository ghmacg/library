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
