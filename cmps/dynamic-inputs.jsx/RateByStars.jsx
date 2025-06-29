export function RateByStars({ review, handleChange, onAddReview }) {

    const { fullname, rating, createdAt } = review

    return (
        <section className="add-review">
            <form onSubmit={(ev) => {
                ev.preventDefault()
                onAddReview(review)
            }}>
                <label htmlFor="fullname">Full name:
                </label>
                <input onChange={handleChange} value={review.fullname} name="fullname" id="fullname" type="text" />

                <label htmlFor="date">Select date:</label>
                <input onChange={handleChange} value={review.createdAt} type="datetime-local" id="date" name="createdAt" />

                <label htmlFor="rating">Book Rating:</label>
                <select onChange={handleChange} value={review.rating} className="rating" name="rating" id="rating">
                    <option value="⭐">⭐</option>
                    <option value="⭐⭐">⭐⭐</option>
                    <option value="⭐⭐⭐">⭐⭐⭐</option>
                    <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
                    <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
                </select>
                <button>Submit review</button>
            </form >
        </section >
    )
}