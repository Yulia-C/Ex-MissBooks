import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM


export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])


    function loadBook() {
        bookService.get(bookId)
            .then(book => setBookToEdit(book))
            .catch(err => console.log('Cannot get book:', err))
    }

    function onSaveBook(ev) {
        ev.preventDefault()

        bookService.save(bookToEdit)
            .then(() => {
                navigate('/book')
            })
            .catch(err => console.log('Cannot Add book:', err))
    }

    function handleChange({ target }) {

        const field = target.name
        let value = target.value
        switch (target.type) {

            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        if (field === 'amount') {
            setBookToEdit(prevBook => ({
                ...prevBook,
                listPrice: {
                    ...prevBook.listPrice,
                    amount: +value
                }
            }))
        } else if (field === 'author') {
            setBookToEdit(prevBook => ({ ...prevBook, authors: [value] }))
        }
        setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
    }

    const { title, authors, listPrice } = bookToEdit
    return (
        <section className="book-edit container">
            {/* <h1>{bookId ? 'Edit' : 'Add'} Book</h1> */}

            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title:</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />
                <label htmlFor="authors">Author name:</label>
                <input onChange={handleChange} value={authors[0]} type="text" name="author" id="author" />
                <label htmlFor="amount">Price:</label>
                <input onChange={handleChange} value={listPrice.amount || ''} type="number" name="amount" id="amount" />

                <button>Save</button>
            </form>

        </section>)
}
