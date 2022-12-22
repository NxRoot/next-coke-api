import admin from "./server"


export async function checkAuth(token, requiredClaims){
    try{
        const decoded = await admin.auth().verifyIdToken(token)
        const user = await admin.auth().getUser(decoded.uid)
        for(const claim of requiredClaims){
            if(!user.customClaims?.[claim]) return false
        }
        return true
    }catch(err){
        console.log(err)
        return false
    }
}