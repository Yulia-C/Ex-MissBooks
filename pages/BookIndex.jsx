import { bookService } from "../services/book.service.js";
import { BookList } from "../cpms/BookList.jsx";
import { BookDetails } from "./BookDetails.jsx";

const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)

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

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    if (!books) return <div className="loader"></div> 

    return (
        <section className="book-index container">
          
            {selectedBookId &&
                <BookDetails
                    bookId={selectedBookId}
                    onBack={() => setSelectedBookId(null)}
                />}
            {!selectedBookId &&
                <BookList books={books}
                    onRemoveBook={onRemoveBook}
                    onSelectBookId={onSelectBookId} />}
        </section>
    )

}