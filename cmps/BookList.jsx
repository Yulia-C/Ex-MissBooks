import { BookPreview } from "./BookPreview.jsx";
// const { useEffect } = React
const { Link, useLocation } = ReactRouterDOM

export function BookList({ books, onRemoveBook, onAddBook}) {

    const location = useLocation().pathname

    return (
        <ul className="book-list">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview
                        book={book}
                    />
                    {location === '/book/gbook' ? <section>
                        <button onClick={() => onAddBook(book.id)} >Add</button></section>
                        : (<section>
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
                        )
                    }

                </li>
            )}
        </ul>
    )
}