import { LongTxt } from "../cmps/LongTxt.jsx"
// import { Team } from "./cmps /Team.jsx"
// import { Vision } from "./cmps /Vision.jsx"

const { Outlet, Link } = ReactRouterDOM

export function About() {
    const txt = `The sky burn a different story 
    was to to to the port bit by bit to the port. 
    above burn the story had to bit by bit as generally The sky burn and 
    as generally this happened each time It a different story from various
    people.above.The sky from various people I was above the color of
    television was as generally It tuned as generally was All a pleasure
    to a different story was was in such cases the port the story it`

    return (
        <section className="about container">
            <h1>About Miss Books...</h1>
            <LongTxt txt={txt} />
            <nav>
                <Link to="/about/team" >Team</Link>
                <Link to="/about/vision" >Vision</Link>
            </nav>
            <section>
                <Outlet />
            </section>

        </section>
    )
}