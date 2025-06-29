const { useState } = React

export function RateByTxt({ review, handleChange, onAddReview }) {

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
                <textarea onChange={handleChange} value={rating} id="rating" name="rating" style={{width:'200px', height:'100px'}} placeholder="Write your review here..."></textarea>
                         <button>Submit review</button>
                    </form >
                </section >
                )
}