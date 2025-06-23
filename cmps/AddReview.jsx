import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function AddReview({ onAddReview, resetForm }) {
    const { bookId } = useParams()
    const [review, setReview] = useState(bookService.getEmptyReview())

    useEffect(() => {
        setReview(bookService.getEmptyReview())
    }, [resetForm])

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
        setReview(review => ({ ...review, [field]: value }))
    }

    const { fullname, rating, createdAt } = review
    return (
        <section className="add-review">
            <form onSubmit={(ev) => {
                ev.preventDefault()
                onAddReview(review)
            }}>
                <h4>Add a review</h4>
                <label htmlFor="fullname">Full name:
                </label>
                <input onChange={handleChange} value={fullname} name="fullname" id="fullname" type="text" />

                <label htmlFor="date">Select date:</label>
                <input onChange={handleChange} value={createdAt} type="datetime-local" id="date" name="createdAt" />

                <label htmlFor="rating">Book Rating:</label>
                <select onChange={handleChange} value={rating} className="rating" name="rating" id="rating">
                    <option value="1">⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="5">⭐⭐⭐⭐⭐</option>
                </select>
                <button>Submit review</button>
            </form>
        </section>
    )
}