import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

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
                showSuccessMsg(`${bookToEdit.title} added successfully!`)
                navigate('/book')
            })
            .catch(err => {
                console.log('Cannot Add book:', err)
                showErrorMsg(`Had a problem adding ${bookToEdit.title}...`)
            })
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



    const { title, authors, listPrice, publishedDate, description } = bookToEdit
    return (
        <section className="book-edit container">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>

            <form onSubmit={onSaveBook}>

                {/* <BookList /> */}
                {/* <select onChange={handleChange} value={searchTerm} className="book" name="book" id="book">
                    <option value="1">⭐</option>
                </select>   */}

                <label htmlFor="title">Title:</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />
                <label htmlFor="authors">Author name:</label>
                <input onChange={handleChange} value={authors[0]} type="text" name="author" id="author" />
                <label htmlFor="amount">Price:</label>
                <input onChange={handleChange} value={listPrice.amount || ''} type="number" name="amount" id="amount" />
                <label htmlFor="authors">Published Year:</label>
                <input onChange={handleChange} value={publishedDate} type="number" name="publishedDate" id="publishedDate" />
                <label htmlFor="amount">Description:</label>
                <input onChange={handleChange} value={description} type="text" name="description" id="description" />
                <button>Save</button>
            </form>

        </section >)
}
