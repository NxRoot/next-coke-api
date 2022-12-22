import { useEffect, useState } from "react"
import { coke } from "../coke"
import { Box, Button } from "@chakra-ui/react"

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
        <Box p="4">
            <Box>{name}</Box>
            <Box>{numbers}</Box>
            <Button onClick={get}>Send</Button>
        </Box>
    )
}

export default Index
