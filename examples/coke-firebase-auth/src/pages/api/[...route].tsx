import { nextCokeHandler } from "next-coke-api"
import { checkAuth } from "../../firebase/checkAuth"

const routes = {
  getName: async (body) => "your name is " + body.name,
  getNumbers: async () => [1,2,3,4,5,6,7,8,9].sort((a,b) => Math.random() > 0.5 ? 1 : -1)
}

export type AppRoutes = typeof routes
export default async function handler(req, res) {
  // check firebase claims
  if (!await checkAuth(req.headers.authorization, [])) {
    return res.status(500).send({ message: 'NO-AUTHENTICATION' })
  }
  // return coke handler
  return nextCokeHandler(req, res, routes)
}