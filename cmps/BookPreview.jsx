export function BookPreview({ book }) {
    const { title, thumbnail } = book

    return (
        <article className="book-preview">
            <h2> {title}</h2>
            <img src={`${thumbnail}`} alt="book-thumbnail" />
        </article>
    )
}