const { useEffect, useState, useRef } = React
import { debounce } from "../services/util.service.js"
import { bookService } from "../services/book.service.js"
export function BookFilter({ defaultFilter, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...defaultFilter })
    // const onSetFilterByDebounce = debounce(onSetFilterBy, 500)

    const onSetFilterByDebounce = useRef(debounce(onSetFilterBy, 500)).current
    const { txt, minPrice } = filterByToEdit

    useEffect(() => {
        onSetFilterByDebounce(filterByToEdit)
    }, [filterByToEdit])

    const [categories, setCategories] = useState(null)

    useEffect(() => {
        loadCategories()
    }, [categories])

    function loadCategories() {

        bookService.getCategories()
            .then(categories => {
                setCategories(categories)
            })
    }

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
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    return (

            <section className="book-filter">
                <h2>Filer books</h2>
                <form>
                    <label htmlFor='txt'>Search anything</label>
                    <input onChange={handleChange} value={txt} id='txt' name='txt' type='text' />

                    <label htmlFor='minPrice'>Min Price</label>
                    <input onChange={handleChange} value={minPrice || ''} id='minPrice' name='minPrice' type='range' min='80' max='500' title={minPrice} />
                </form>
                <section className="categories">
                    <h4>Book categories:</h4>
                    <ul className="clean-list">
                        {categories && categories.map(category =>
                            <li onClick={() => {
                                const target = {
                                    name: 'txt',
                                    value: category
                                }
                                handleChange({ target })
                            }} key={category}>{category}</li>)}
                    </ul>
                </section>

            </section>
    )
}