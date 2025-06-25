import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

const { useState, useEffect, Fragment } = React
const { useNavigate } = ReactRouterDOM

export function GBookAdd() {

    const [searchTerm, setSearchTerm] = useState('')
    const [gBooks, setGBooks] = useState()

    function onSearchGoogleBook(ev) {
        ev.preventDefault()
        bookService.getGoogleBooks(searchTerm)
            .then(books => books.map(book => bookService.getGoogleBook(book)))
            .then(gBooks => {
                console.log(gBooks)
                setGBooks(gBooks)
            })
    }


    const navigate = useNavigate()

    function onSelectBook({ target }) {
        const bookId = target.value
        console.log('bookId:', bookId)
        const bookToAdd = gBooks.find(book => book.id === bookId)
        const { id, ...book } = bookToAdd
        bookService.save(book)
        showSuccessMsg(`${book.title} added successfully`)
        setTimeout(() => navigate('/book'), 1000)

    }

    function onAddBook(bookId) {
        const bookToAdd = gBooks.find(book => book.id === bookId)
        const { id, ...book } = bookToAdd
        bookService.save(book)
        showSuccessMsg(`${book.title} added successfully`)
        setTimeout(() => navigate('/book'), 1000)
    }

    return (
        <section className="gbook container">
            <h2>Add book from google</h2>
            <section className="search-bar">
                <label htmlFor="searchTerm">Search a book:</label>
                <form onSubmit={onSearchGoogleBook}>

                    <input onChange={(ev) => setSearchTerm(ev.target.value)} value={searchTerm} type="text" name="searchTerm" id="searchTerm" />
                        <button onClick={onSearchGoogleBook}>Search books </button>
                </form>
            </section>


            {gBooks && <Fragment>
                <label htmlFor="gBooks-search">Choose a book:</label>
                <select onChange={onSelectBook} id="gBooks-search" name="gbooks">
                    {gBooks.map(book => <option key={book.id} value={book.id}>{book.title}</option>)}
                </select>
            </Fragment>}

            {gBooks && <BookList books={gBooks} onAddBook={onAddBook} />
            }

        </section>
    )
}

