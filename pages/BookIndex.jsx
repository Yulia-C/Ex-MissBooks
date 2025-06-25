import { bookService } from "../services/book.service.js";
import { BookList } from "../cmps/BookList.jsx";
import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookDetails } from "./BookDetails.jsx";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

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
                showSuccessMsg('Book removed successfully!')
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log(err)
                showErrorMsg(`Problem removing book`)
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
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
                    onBack={onBack}
                />}

            {!selectedBookId &&
                <Fragment>

                    <BookFilter
                        defaultFilter={filterBy}
                        onSetFilter={onSetFilter}
                    />
                    <section>
                        <Link to="/book/edit">
                            <button>Add a book manually</button>
                        </Link>
                        <Link to="/book/gbook">
                            <button>Add a book from google</button>
                        </Link>
                    </section>
                    <BookList books={books}
                        onRemoveBook={onRemoveBook}
                        onSelectBookId={onSelectBookId} />
                </Fragment>
            }
        </section>
    )

}