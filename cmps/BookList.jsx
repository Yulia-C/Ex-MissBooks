import { BookPreview } from "./BookPreview.jsx";

const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {
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
                        <Link to={`/book/${book.id}`} >
                            <button> Details</button>
                        </Link>
                        <Link to={`/book/edit/${book.id}`} >
                            <button> Edit</button>
                        </Link>
                    </section>

                </li>
            )}
        </ul>
    )
}