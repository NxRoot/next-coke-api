import { useState } from "react"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../firebase/client"

export default function Login(){

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("test@email.com")
    const [pass, setPass] = useState("123qweasd")
    const [error, setError] = useState()
  
    function submit(){
      setLoading(true)
      signInWithEmailAndPassword(auth, email, pass)
        .catch(setError)
        .finally(()=>setLoading(false))
    }
  
    return (
      <div>
        <h3>LOGIN PLEASE</h3>
        <input disabled={loading} type="text" defaultValue={email} onChange={e=>setEmail(e.target.value)} placeholder='Email'/>
        <input disabled={loading} type="password" defaultValue={pass} placeholder='Password' onChange={e=>setPass(e.target.value)}/>
        <button onClick={submit} disabled={loading}>Sign In</button>
        <pre><code>{JSON.stringify(error)}</code></pre>
      </div>
    )
}