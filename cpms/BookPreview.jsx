export function BookPreview({ book}) {
    const { title, listPrice, thumbnail} = book
    // const { amount } = listPrice

    return (
        <article className="book-preview">
            <h2> {title}</h2>
            <h3>Price: {listPrice.amount}</h3>
            <img src={thumbnail} alt="book-img" />
        </article>
    )
}