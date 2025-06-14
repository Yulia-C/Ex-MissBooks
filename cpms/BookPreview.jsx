export function BookPreview({ book, imgIdx}) {
    console.log('imgIdx:', imgIdx)
    const { title, listPrice } = book
    const { amount } = listPrice

    return (
        <article className="book-preview">
            <h2> {title}</h2>
            <h3>Price: {amount}</h3>
            <img src={ `assets/img/${imgIdx}.jpg`} alt="book-img" />
        </article>
    )
}