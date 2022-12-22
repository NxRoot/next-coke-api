import { useEffect, useState } from "react"
import { coke } from "../coke"

function Index() {

    const random = (arr) => arr[Math.floor(Math.random() * arr.length)]

    const [name, setName] = useState("")
    const [numbers, setNumbers] = useState([])

    const get = async () => {

        const newName = random(["john", "mike", "steve", "peter"])

        coke.getName({ name: newName })
            .then(setName)
            .catch(console.log)

        coke.getNumbers().then(setNumbers).catch(console.log)

    }

    useEffect(() => { get() }, [])

    return (
        <div>
            <div>{name}</div>
            <div>{numbers}</div>
            <button onClick={get}>Send</button>
        </div>
    )
}

export default Index
