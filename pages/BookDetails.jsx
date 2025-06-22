import { bookService } from "../services/book.service.js";
import { BookPreview } from "../cmps/BookPreview.jsx";
import { LongTxt } from "../cmps/LongTxt.jsx";
import { AddReview } from "../cmps/AddReview.jsx";

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

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

    useEffect(() => {
        loadBook()
    }, [isReviewModalOpen])
    
    function toggleReviewModal() {
        setIsReviewModalOpen(prev => !prev)
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
                <button onClick={toggleReviewModal}>Add a review</button>
                <h2>Reviews</h2>
                {book.reviews && book.reviews.length > 0 ? (
                    <ul>
                        {book.reviews.map((review, idx) => (
                            <li key={idx} className="review">
                                <h4>Name: {review.fullname}</h4>
                                <p>Date: {new Date(review.createdAt).toLocaleDateString()}</p>
                                <p>Rating: {'⭐'.repeat(review.rating)}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews yet. Be the first to add one!</p>
                )}
            </section>

            {isReviewModalOpen && (
                    <div className="review-modal" onClick={(ev) => ev.stopPropagation()}>
                        <button className="close-btn" onClick={toggleReviewModal}>×</button>
                        <AddReview onClose={toggleReviewModal} />
                </div>
            )}
        </section>
    )
}