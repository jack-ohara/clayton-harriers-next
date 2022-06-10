import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import PageHeader from "../PageHeader"
import Styles from "./CentenaryBanner.module.css"

export default function CentenaryBanner(): JSX.Element {
    const [confettiWidth, setConfettiWidth] = useState(0)
    const [confettiHeight, setConfettiHeight] = useState(0)

    useEffect(() => {
        setConfettiWidth(window.innerWidth)
        setConfettiHeight(window.innerHeight)
    }, [setConfettiWidth, setConfettiHeight])

    return (
        <div className={Styles.container}>
            <Confetti
                width={confettiWidth}
                height={confettiHeight}
                numberOfPieces={confettiWidth < 1200 ? 400 : 800}
                recycle={false}
            />

            <PageHeader className={Styles.heading}>Celebrating 100 years of running!</PageHeader>
        </div>
    )
}