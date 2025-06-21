const { Link } = ReactRouterDOM


export function NotFound() {

    return (
        <section className="not-found center">

            <h2>Ooops... Error <span>404</span></h2>

            <p>Sorry but the page you are looking for does not exist.</p>
            <Link to="/home">Go back home</Link>
        </section>
    )
}