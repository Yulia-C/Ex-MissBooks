import { makeId, saveToStorage, loadFromStorage, getRandomIntInclusive, makeLorem, animateCSS, debounce } from "./util.service.js";
import { storageService } from "./async-storage.service.js";
import { mockData } from "./mock-googleBooksService.js";
const BOOKS_KEY = 'booksDB'
const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']

const authorsList = [
    'George Orwell', 'Jane Austen', 'Mark Twain', 'J.K. Rowling',
    'Ernest Hemingway', 'Virginia Woolf', 'F. Scott Fitzgerald',
    'Haruki Murakami', 'Stephen King', 'Toni Morrison',
    'Agatha Christie', 'Leo Tolstoy', 'Gabriel Garcia Marquez',
    'Isaac Asimov', 'Chinua Achebe', 'Margaret Atwood'
]

_createBooks()

export const bookService = {
    query,
    get,
    save,
    remove,
    getDefaultFilter,
    getCategories,
    getEmptyBook,
    getEmptyReview,
    removeReview,
    getGoogleBooks,
    getGoogleBook,
    getFilterFromSearchParams,
}

function query(filterBy = {}) {
    return storageService.query(BOOKS_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book =>
                    regExp.test(book.title)
                    || regExp.test(book.subtitle)
                    || regExp.test(book.authors.join(' '))
                    || regExp.test(book.category)
                )
            }
            if (filterBy.minPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOKS_KEY, bookId)
        .then(_setNextPrevBookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOKS_KEY, bookId)
}

function removeReview(bookId, reviewId) {
    return get(bookId)
        .then(book => {
            const reviewIdx = book.reviews.findIndex(review => review.id === reviewId)
            if (reviewIdx < 0) throw new Error(`Cannot find review with id: ${reviewId}`)
            book.reviews.splice(reviewIdx, 1)
            return save(book)
        })
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOKS_KEY, book)
    } else {
        return storageService.post(BOOKS_KEY, book)
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        minPrice: ''
    }
}

function getFilterFromSearchParams(searchParam) {
    const txt = searchParam.get('txt') || ''
    const minPrice = searchParam.get('minPrice') || ''

    return {
        txt,
        minPrice
    }
}

function getEmptyReview() {
    return {
        id: makeId(),
        fullname: '',
        rating: '',
        createdAt: '',
    }
}

function _createBooks() {
    let books = loadFromStorage(BOOKS_KEY)

    if (!books || !books.length) {

        books = []
        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [authorsList[getRandomIntInclusive(0, authorsList.length - 1)]],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(100),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                category: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `assets/img/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                },
            }
            books.push(book)
        }
        saveToStorage(BOOKS_KEY, books)
    }
    console.log('books', books)
}

function getCategories() {
    return storageService.query(BOOKS_KEY)
        .then(books => {
            return [...new Set(books.flatMap(book => book.category))]
        })
}

function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function getEmptyBook() {
    const book = {
        title: '',
        subtitle: utilService.makeLorem(4),
        authors: [''],
        publishedDate: '',
        description: '',
        pageCount: utilService.getRandomIntInclusive(20, 600),
        thumbnail: `assets/img/${1}.jpg`,
        category: ctgs[getRandomIntInclusive(0, ctgs.length - 1)],
        listPrice: {
            amount: '',
            currencyCode: 'EUR',
            isOnSale: Math.random() > 0.7
        },
    }
    return book
}


function getGoogleBook(googleBook) {
    return {
        id: googleBook.id || makeId(),
        title: googleBook.volumeInfo.title || 'Unknown Title',
        subtitle: googleBook.volumeInfo.subtitle || '',
        authors: googleBook.volumeInfo.authors || ['Unknown Author'],
        publishedDate: googleBook.volumeInfo.publishedDate || 'Unknown Date',
        description: googleBook.volumeInfo.description || 'No description available',
        pageCount: googleBook.volumeInfo.pageCount || 0,
        thumbnail: (googleBook.volumeInfo.imageLinks && googleBook.volumeInfo.imageLinks.thumbnail) || '', category: googleBook.volumeInfo.categories || ['Uncategorized'],
        listPrice: {
            amount: utilService.getRandomIntInclusive(80, 500),
            currencyCode: 'EUR',
            isOnSale: Math.random() > 0.7
        }
    }
}



function getGoogleBooks(searchTerm) {
    // const data = mockData.items
    // searchTerm = searchTerm || 'java'
    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20${searchTerm}`
    return fetch(url)
        .then(res => res.json())
        .then(res => res.items)

    return Promise.resolve(data)

}
