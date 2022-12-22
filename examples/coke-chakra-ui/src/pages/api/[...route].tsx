import { nextCokeHandler } from "next-coke-api"

const routes = {
  getName: async (body) => "your name is " + body.name,
  getNumbers: async () => [1,2,3,4,5,6,7,8,9].sort((a,b) => Math.random() > 0.5 ? 1 : -1)
}

export type AppRoutes = typeof routes
export default function handler(req, res) {
  return nextCokeHandler(req, res, routes)
}