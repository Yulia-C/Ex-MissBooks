import { BookPreview } from "./BookPreview.jsx";

export function BookList({books}){
    return(
        <ul className="book-list container">
            {JSON.stringify(books)}
        </ul>
    )
}