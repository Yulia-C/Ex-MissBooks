import { bookService } from "../services/book.service.js";
import { BookPreview } from "../cmps/BookPreview.jsx";
import { LongTxt } from "../cmps/LongTxt.jsx";
import { AddReview } from "../cmps/AddReview.jsx";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";

const { useState, useEffect } = React

const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails({ onBack }) {

    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [bookId])

    function loadBook() {
        setIsLoading(true)
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
            })
            .finally(() => setIsLoading(false))
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

    const [resetForm, setResetForm] = useState(0)

    function onAddReview(review) {
        if (!book.reviews) {
            book.reviews = [review]
        } else {
            book.reviews.push(review)
        }
        bookService.save(book)
            .then((bookReviewed) => {
                showSuccessMsg('Review added successfully!')
                setBook(prev => ({ ...prev, bookReviewed }))
                setResetForm(prev => prev + 1)
            })
            .catch(err =>
                showErrorMsg('Had problem adding review...')
            )
    }

    function onRemoveReview(bookId, reviewId) {
        bookService.removeReview(bookId, reviewId)
            .then(() => {
                setBook(prevBook => ({
                    ...prevBook,
                    reviews: prevBook.reviews.filter(review => review.id !== reviewId)
                }))
                showSuccessMsg('Review removed successfully!')
            })
            .catch(err =>
                showErrorMsg('Had problem removing review...')
            )
    }


    if (isLoading) return <div className="loader"></div>

    return (
        <section className="book-details container">
            <BookPreview book={book} />
            <section className="book-info">
                <img className='sale' src={isOnSale(book.listPrice.isOnSale)} />
                <h3>Price:
                    <span className={getClassName(book.listPrice.amount)}> {book.listPrice.amount}</span>
                </h3>
                <h4>Published Date: {getPublishedDateDiff(book.publishedDate)}</h4>
                <h4>Book Authors - {book.authors}</h4>
                <h4>Book description:</h4>
                < LongTxt txt={book.description} />
                <p>Page count: {getPageCount(book.pageCount)}</p>

            </section>
            <section className="btns">
                <button onClick={onBack}>Back</button>
                <section className="prev-next">
                    <Link to={`/book/${book.prevBookId}`}>
                        <button>Previous Book</button>
                    </Link>
                    <Link to={`/book/${book.nextBookId}`}>
                        <button>Next Book</button>
                    </Link>
                </section>
            </section>

            <section className="reviews">
                <AddReview onAddReview={onAddReview} resetForm={resetForm} />

                <h2>Reviews</h2>
                {book.reviews && book.reviews.length > 0 ? (
                    <ul>
                        {book.reviews.map((review, idx) => (
                            <li key={idx} className="review clean-list">
                                <section className="same-line">
                                    <h4>Name: {review.fullname}</h4>
                                    <button className="remove-btn" onClick={() => onRemoveReview(book.id, review.id)}>x</button>
                                </section>
                                <p>Date: {new Date(review.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                })}</p>
                                <p>Rating: {review.rating ? (review.rating) : 'No rating'}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews yet. Be the first to add one!</p>
                )}
            </section>

        </section>
    )
}