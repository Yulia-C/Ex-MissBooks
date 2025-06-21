import { makeId, saveToStorage, loadFromStorage, getRandomIntInclusive, makeLorem } from "./util.service.js"
import { storageService } from "./async-storage.service.js"

const BOOKS_KEY = 'booksDB'

_createBooks()

export const bookService = {
    query,
    get,
    save,
    remove,
    getDefaultFilter,
    getCategories,
}

function query(filterBy = {}) {
    return storageService.query(BOOKS_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book =>
                    regExp.test(book.title)
                    || regExp.test(book.subtitle)
                    || regExp.test(book.description)
                    || book.authors.join(' ').includes(filterBy.txt + ' ')
                    || book.categories.includes(filterBy.txt)
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
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOKS_KEY, bookId)
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
        listPrice: ''
    }
}

function _createBooks() {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    let books = loadFromStorage(BOOKS_KEY)

    if (!books || !books.length) {

        books = []
        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [
                    utilService.makeLorem(1)
                ],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(100),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `assets/img/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                }
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
            return [...new Set(books.flatMap(book => book.categories))]
        })
}