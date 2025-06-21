import { bookService } from "../services/book.service.js";
import { BookList } from "../cpms/BookList.jsx";
import { BookDetails } from "./BookDetails.jsx";
import { BookFilter } from "../cpms/BookFilter.jsx";

const { useState, useEffect, Fragment } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => console.log('err:', err))
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
                    .catch(err => { console.log('err:', err) })
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({...prevFilter, ...filterBy}))
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
                <Fragment>

                    <BookFilter
                        defaultFilter={filterBy}
                        onSetFilter={onSetFilter}
                    />
                    <BookList books={books}
                        onRemoveBook={onRemoveBook}
                        onSelectBookId={onSelectBookId} />
                </Fragment>
            }
        </section>
    )

}