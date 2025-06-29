const { useState } = React

export function RateBySelect({ review,handleChange, onAddReview }) {
 
        const { fullname, rating, createdAt } = review

    return (

        <section className="add-review">
            <form onSubmit={(ev) => {
                ev.preventDefault()
                onAddReview(review)
            }}>
                <label htmlFor="fullname">Full name:
                </label>
                <input onChange={handleChange} value={fullname} name="fullname" id="fullname" type="text" />

                <label htmlFor="date">Select date:</label>
                <input onChange={handleChange} value={createdAt} type="datetime-local" id="date" name="createdAt" />

                <label htmlFor="rating">Rate this book:</label>
                <select id="rating" value={rating} onChange={handleChange} className="rating" name="rating">
                    <option value="">Choose a rating</option>
                    <option value="1 - Poor">1 - Poor</option>
                    <option value="2 - Fair">2 - Fair</option>
                    <option value="3 - Good">3 - Good</option>
                    <option value="4 - Very Good">4 - Very Good</option>
                    <option value="5 - Excellent">5 - Excellent</option>
                </select>
                <button>Submit review</button>
            </form >
        </section >
    )
}