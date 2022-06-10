import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import Styles from "./CentenaryBanner.module.css"

export default function CentenaryBanner(): JSX.Element {
    const [confettiWidth, setConfettiWidth] = useState(0)
    const [confettiHeight, setConfettiHeight] = useState(0)

    useEffect(() => {
        setConfettiWidth(window.innerWidth - 15)
        setConfettiHeight(window.innerHeight)
    }, [setConfettiWidth, setConfettiHeight])

    return (
        <div className={Styles.container}>
            <Confetti
                width={confettiWidth}
                height={confettiHeight}
                numberOfPieces={confettiWidth < 1200 ? 200 : 800}
                recycle={false}
                initialVelocityY={-3}
            />

            <div className={Styles.content}>
                <h3 className={Styles.heading}>Celebrating 100 years of running!</h3>
            </div>
        </div>
    )
}