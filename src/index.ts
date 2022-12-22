const path = require("path")

function nextCokeApi() {

    function headers(token = "") {
        return new Headers({
            'Content-Type': 'application/json',
            "Authorization": token
        })
    }

    return {
        send: ({ url, method, body, token }: any) => {
            return new Promise((resolve, reject) => {
                fetch(path.join("api", url), {
                    method,
                    headers: headers(token),
                    body: JSON.stringify(body),
                })
                .then((req) => req.json()).then(resolve)
                .catch(reject)
            })
        },
    }
}

function restFormat(prop, fetcher, token = "") {
    if (fetcher) return (body) => fetcher(prop, body, token)
    const api = nextCokeApi()
    const url = prop
    return {
        GET: () => api.send({ method: "GET", url, token }),
        PUT: (body) => api.send({ method: "PUT", url, body, token }),
        POST: (body) => api.send({ method: "POST", url, body, token }),
        DELETE: (body) => api.send({ method: "DELETE", url, body, token }),
    }
}

function cokeFormat(prop, fetcher, token = "") {
    return async (body) => fetcher
        ? fetcher(prop, body, token)
        : nextCokeApi().send({
            method: "POST",
            url: prop,
            body, token
        })
}

type NextCokeClientProps = {
    isREST?: boolean, 
    fetcher?: (_, prop) => Promise<any>
    customUrl?: string
}

export function nextCokeClient<T>({ isREST, fetcher, customUrl }: NextCokeClientProps = {}) {
    const obj = {}
    const endpoint = (to) => path.join(customUrl || "", to)
    const format = isREST ? restFormat : cokeFormat
    const handler = { get: (_, prop) => format(endpoint(prop), fetcher) }
    const result = new Proxy(obj, handler) as T
    return {
        coke: result,
        useCoke: (token = "") => {
            const customHandler = { get: (_, prop) => format(endpoint(prop), fetcher, token) }
            return new Proxy(obj, customHandler) as T
        },
    }
}

export async function nextCokeHandler(req, res, router, isREST = false) {
    const data = req.method === "GET" ? req.query : req.body
    const routing = isREST ? router[req.query.route][req.method] : router[req.query.route]
    const result = await routing(data)
    return res.status(200).json(result)
}

