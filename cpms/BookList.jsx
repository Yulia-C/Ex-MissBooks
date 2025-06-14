import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemoveBook, onSelectBookId }) {
    return (
        <ul className="book-list">
            {books.map((book, idx) =>
                <li key={book.id}>
                    <BookPreview
                        book={book}
                        imgIdx={(idx + 1)}
                    />
                    <section>
                        <button onClick={() => onRemoveBook(book.id)} >
                            Remove
                        </button>
                        <button onClick={() => onSelectBookId(book.id)}>
                            Details
                        </button>
                    </section>

                </li>
            )}
        </ul>
    )
}