import { createContext, useContext, useEffect, useState } from "react"
import { IdTokenResult, onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/client"

export interface AuthUser extends IdTokenResult {
  uid: string
  displayName: string
  photoURL: string
  email: string
  claims: any
  token: string
}

export interface AuthContextType {
  user?: AuthUser
  loading: boolean
}

const Auth = createContext<AuthContextType>({ loading: true })

export function AuthProvider(props) {
  const [user, setUser] = useState<AuthUser>()
  const [loading, setLoading] = useState(true)

  async function onResult(user){
    if(user){
      const authUser = await auth.currentUser.getIdTokenResult()
      setUser({...user, ...authUser})
    }else{
      setUser(null)
    }
    setLoading(false)
  }

  useEffect(() =>  {
    const change = onAuthStateChanged(auth, onResult, console.error)
    return () => change()
  }, [])

  if (loading) return null

  return (
    <Auth.Provider value={{ user, loading }}>
      {props.children}
    </Auth.Provider>
  )
}

export const useAuth = () => useContext(Auth)
