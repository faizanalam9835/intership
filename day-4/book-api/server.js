const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// In-memory "database" for books
let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
    { id: 3, title: '1984', author: 'George Orwell', year: 1949 }
];

// Helper function to generate a new ID
const generateId = () => {
    return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
};

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Book API! Use /books to access the book collection.');
});

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET a specific book by ID
app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => book.id === id);
    
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// POST a new book
app.post('/books', (req, res) => {
    const { title, author, year } = req.body;
    
    if (!title || !author || !year) {
        return res.status(400).send('Title, author, and year are required');
    }
    
    const newBook = {
        id: generateId(),
        title,
        author,
        year: parseInt(year)
    };
    
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT (update) an existing book
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author, year } = req.body;
    const bookIndex = books.findIndex(book => book.id === id);
    
    if (bookIndex === -1) {
        return res.status(404).send('Book not found');
    }
    
    if (!title || !author || !year) {
        return res.status(400).send('Title, author, and year are required');
    }
    
    const updatedBook = {
        id,
        title,
        author,
        year: parseInt(year)
    };
    
    books[bookIndex] = updatedBook;
    res.json(updatedBook);
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === id);
    
    if (bookIndex === -1) {
        return res.status(404).send('Book not found');
    }
    
    books = books.filter(book => book.id !== id);
    res.status(204).send();
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});