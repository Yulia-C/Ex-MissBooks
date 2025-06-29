import { bookService } from "../services/book.service.js"
import { RateByStars } from "./dynamic-inputs.jsx/RateByStars.jsx"
import { RateBySelect } from "./dynamic-inputs.jsx/RateBySelect.jsx"
import { RateByTxt } from "./dynamic-inputs.jsx/RateByTxt.jsx"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function AddReview({ onAddReview, resetForm }) {

    const { bookId } = useParams()
    const [review, setReview] = useState(bookService.getEmptyReview())

    useEffect(() => {
        setReview(bookService.getEmptyReview())
        setReviewType("")
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

    const [reviewType, setReviewType] = useState("")

    function onSetReviewType(value) {
        setReviewType(value)
        console.log('reviewType:', reviewType)
    }

    return (
        <section className="add-review">
            <h4>Add a review by:</h4>
            <div className="radio-btns">

            <label className="radio" htmlFor="selection">Selection
            <input type="radio" id="selection" value="selection" checked={reviewType === "selection"} onChange={ev => onSetReviewType(ev.target.value)} />
            </label>
            <label className="radio" htmlFor="text" >By Text
            <input type="radio" id="text" value="text" checked={reviewType === "text"} onChange={ev => onSetReviewType(ev.target.value)} />
            </label>
            <label className="radio" htmlFor="stars" >By Stars
            <input type="radio" id="stars" value="stars" checked={reviewType === "stars"} onChange={ev => onSetReviewType(ev.target.value)} />
            </label>
            </div>

            <DynamicCmp reviewType={reviewType} review={review} handleChange={handleChange} onAddReview={onAddReview} />

        </section>

    )
}

function DynamicCmp(props) {
    const dynamicCmpMap = {
        stars: <RateByStars {...props} />,
        text: <RateByTxt {...props} />,
        selection: < RateBySelect {...props} />
    }
    return dynamicCmpMap[props.reviewType]
}