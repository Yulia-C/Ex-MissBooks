const { useState } = React
export function LongTxt({ txt, length = 100 }) {

    const [isExtended, setIsExtended] = useState(false)

    return (
        <p className='long-txt'>{isExtended ? txt : txt.substring(0, length)}
            <span onClick={() => setIsExtended(!isExtended)}>
                {isExtended ? ' see less...' : ' see more...'}</span></p>
    )

}