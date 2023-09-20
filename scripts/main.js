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
