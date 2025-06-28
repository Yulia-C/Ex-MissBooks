import { bookService } from "../services/book.service.js";
import { getTruthyValues } from "../services/util.service.js";
import { BookList } from "../cmps/BookList.jsx";
import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookDetails } from "./BookDetails.jsx";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

const { useState, useEffect, Fragment } = React
const { Link, useSearchParams } = ReactRouterDOM

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchParams))
    const truthyFilter = getTruthyValues(filterBy)

    useEffect(() => {
        loadBooks()
        setSearchParams(truthyFilter)
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

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    if (!books) return <div className="loader"></div>

    return (
        <section className="book-index">

            <Fragment>

                <BookFilter
                    defaultFilter={filterBy}
                    onSetFilterBy={onSetFilterBy} />

                <section className="container">
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

        </section>
    )

}