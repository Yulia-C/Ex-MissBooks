import { bookService } from "../services/book.service.js";
import { BookPreview } from "../cmps/BookPreview.jsx";
import { LongTxt } from "../cmps/LongTxt.jsx";

const { useState, useEffect } = React

const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()



    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId)
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

    function onBack() {
        navigate('/book')
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
                < LongTxt txt={book.description} />
                <p>Page count: {getPageCount(book.pageCount)}</p>

                <button onClick={onBack}>Back</button>
            </section>
            
            <section className="prev-next">
                <Link to={`/book/${book.prevBookId}`}>
                    <button>Previous Book</button>
                </Link>
                <Link to={`/book/${book.nextBookId}`}>
                    <button>Next Book</button>
                </Link>
            </section>

        </section>
    )
}