import { AppHeader } from "./cmps/AppHeader.jsx";
import { BookIndex } from "./pages/BookIndex.jsx";
import { NotFound } from "./cmps/NotFount.jsx";
import { BookEdit } from "./pages/BookEdit.jsx";
import { About } from "./pages/About.jsx";
import { Home } from "./pages/Home.jsx";
import { BookDetails } from "./pages/BookDetails.jsx";
import { Team } from "./cmps/Team.jsx";
import { Vision } from "./cmps/Vision.jsx";
import { UserMsg } from "./cmps/UerMsg.jsx";

const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

export function RootCmp() {
    return (
        <Router>
            <section className="app">
                <AppHeader />

                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} >
                            <Route path="team" element={<Team />} />
                            <Route path="vision" element={<Vision />} />
                        </Route>

                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />

                        <Route path="*" element={<NotFound />} />

                    </Routes>
                </main>
                <UserMsg />
            </section>
        </Router>
    )
}