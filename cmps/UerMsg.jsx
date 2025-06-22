import { eventBusService } from "../services/event-bus.service.js";

const { useState, useEffect } = React
// const demoMsg = { type: 'success', txt: 'Oh how great of you to join us!' }

export function UserMsg() {
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)
        })

        setTimeout(() => {
            closeMsg()
        }, 2000)
        return () => unsubscribe()

    }, [])

    function closeMsg() {
        setMsg(null)
    }

    if (!msg) return null
    return (
        <section className={`user-msg ${msg.type}`}>
            <h2>{msg.txt}</h2>
            <button onClick={closeMsg} className="close-btn">X</button>
        </section>
    )

}