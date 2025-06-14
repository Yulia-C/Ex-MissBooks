import { bookService } from "../services/book.service.js";
import { BookList } from "../cpms/BookList.jsx";

const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState()

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
            .then(books => setBooks(books))
            .catch(err => console.log('err:', err))
    }

    function onRemoveBook(bookId) {
        console.log('removing..')
    }

    function onSelectBookId(bokId) {
        console.log('selecting...');

    }

    if (!books) return <div>Loading...</div>

    return (
        <section className="book-index container">
            <h1>Book Index</h1>
            <BookList books={books}
                onRemoveBook={onRemoveBook}
                onSelectBookId={onSelectBookId} />
        </section>
    )

}