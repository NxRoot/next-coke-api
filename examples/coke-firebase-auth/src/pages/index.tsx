import { useEffect, useState } from "react"
import { useCoke } from "../coke"
import { useAuth } from "../hooks/useAuth"
import Login from "../components/login"
import { auth } from "../firebase/client"

function Index() {

    const random = (arr) => arr[Math.floor(Math.random() * arr.length)]

    const [name, setName] = useState("")
    const [numbers, setNumbers] = useState([])

    const { user } = useAuth()
    const coke = useCoke(user?.token) // using authorization tokens

    const get = async () => {

        const newName = random(["john", "mike", "steve", "peter"])

        coke.getName({ name: newName })
            .then(setName)
            .catch(console.log)

        coke.getNumbers().then(setNumbers).catch(console.log)
    }

    useEffect(() => { get() }, [])

    if(!user) return <Login/>

    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{padding: 20}}>
                <div>You are logged in</div>
                <div>{user.email.toString()}</div>
                <button onClick={()=>auth.signOut()}>Logout</button>
            </div>
            <div style={{padding: 20}}>
                <div>{JSON.stringify(name)}</div>
                <div>{JSON.stringify(numbers)}</div>
                <button onClick={get}>Send</button>
            </div>
        </div>
    )
}

export default Index
