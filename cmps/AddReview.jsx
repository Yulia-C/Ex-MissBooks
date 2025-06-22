import { bookService } from "../services/book.service.js"

const { useState } = React
const { useNavigate, useParams } = ReactRouterDOM

export function AddReview({ onClose }) {
    const { bookId } = useParams()

    function onSaveReview(ev) {
        ev.preventDefault()

        const { fullname, rating, date } = ev.target

        const review = {
            fullname: fullname.value,
            rating: +rating.value,
            createdAt: new Date(date.value).getTime() || Date.now()
        }

        bookService.addBookReview(bookId, review)
            .then(() => {
                showSuccessMsg(`Review added successfully!`)
                if (onClose) onClose()
            })
            .catch(err => {
                console.log('Cannot Add book:', err)
                showErrorMsg(`Had a problem adding review...`)
            })
    }

    return (
        <section className="add-review">

            <form onSubmit={onSaveReview}>
                <label htmlFor="fullname">Full name:
                </label>
                    <input name="fullname" id="fullname" type="text" />
                <label forHtml="date">Select date:</label>
                <input type="date" id="date" name="date" />

                <label htmlFor="rating">Book Rating:</label>
                <select className="rating" name="rating" id="rating">
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