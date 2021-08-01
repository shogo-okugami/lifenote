import { useContext, useState } from "react"
import { app } from '../../App/useApp'

const useTextArea = () => {

    const { mediaScreenL } = useContext(app)
    const [count, setCount] = useState(0)
    const [isOver, setIsOver] = useState(false)

    const handleKeyUp = (e) => {

        const value = e.target.value.replace(/\n/g, "")

        setCount(value.length)

        const newCount = value.length

        newCount > 500 ? setIsOver(true) : setIsOver(false)
    }

    return { mediaScreenL, count, isOver, handleKeyUp }
}

export default useTextArea
