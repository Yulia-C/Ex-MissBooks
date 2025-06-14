import { bookService } from "../services/book.service.js";
import { BookList } from "../cpms/BookList.jsx";

const {useState, useEffect} = React

export function BookIndex() {
    const [books, setBooks] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
            .then(books => setBooks(books))
            .catch(err => console.log('err:', err))
    }
    return (
        <section className="book-index container">
            <h1>Book Index</h1>
            <BookList books={books} />
        </section>
    )

}