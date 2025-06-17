import { bookService } from "../services/book.service.js";
import { BookPreview } from "./BookPreview.jsx";

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)


    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function getPageCount(pageCount) {

        if (pageCount > 500) return ` ${pageCount} - Serious Reading`
        if (pageCount > 200) return ` ${pageCount} - Descent Reading`
        if (pageCount < 100) return ` ${pageCount} - Light Reading`
    }

    function getClassName(amount) {
        if (amount < 30) return 'green'
        if (amount > 190) return 'red'
    }

    function isOnSale(isOnSale) {
        if (isOnSale) return 'assets/img/sale.png'
        else return ''
    }

    function getPublishedDateDiff(publishedDate) {
        const diff = new Date().getFullYear() - publishedDate
        if (diff > 10) return `${publishedDate} (Vintage)`
        if (diff <= 1) return `${publishedDate} (New)`
        else return publishedDate
    }

    if (!book) return <div className="loader"></div>

    return (
        <section className="book-details container">
            <BookPreview book={book} />
            <section className="book-info">
                <img className='sale' src={isOnSale(book.listPrice.isOnSale)} />
                <h3>Price:
                    <span className={getClassName(book.listPrice.amount)}> {book.listPrice.amount}</span>
                </h3>
                <h4>Published Date: {getPublishedDateDiff(book.publishedDate)}</h4>
                <h4>Book description:</h4>
                <p>{book.description}</p>
                <p>Page count: {getPageCount(book.pageCount)}</p>
                <button onClick={onBack}>Back</button>
            </section>

        </section>
    )
}