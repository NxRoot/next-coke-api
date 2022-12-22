<div align="center" >
  <h1>Next Coke API 👑</h1>
</div>

<a href="https://github.com/NxRoot/next-coke-api" target="_blank" rel="noopener">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://i.ibb.co/Z8NL37W/dfgdgf.png" />
    <img alt="next-coke-api" src="https://i.ibb.co/Z8NL37W/dfgdgf.png" />
  </picture>
</a>

##
<div align="center" >
 <figure>
    <img src="https://i.ibb.co/tHRYyt9/ezgif-com-gif-maker-6.gif" alt="example" />
    <figcaption>
      <p align="center">
        Typed communication between <a href="https://nextjs.org/" target="_blank">NextJS</a> server/client.<br>Only <b>2kb</b> to see magic happening.
      </p>
    </figcaption>
  </figure>
  </div>
  
## Demo
  [![Edit next-coke-api](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/next-coke-api-7swl7u?fontsize=10&hidenavigation=1&theme=dark&file=/pages/index.tsx)

## Description

* This package provides simple methods to develop client/server communication using NextJS.
* Next has a huge potential, but the **communication can be tricky** for starters, that's why we exist.
* Coke works by creating a proxy from the server routes and abstracting its methods with "client-ready" functionality.
* It **does not** use a custom server, we use the default 'pages' file system, allowing next to **preserve optimizations**.

## Examples
* [coke-minimal](https://github.com/NxRoot/next-coke-api/tree/master/examples/coke-minimal)
* [coke-firebase-auth](https://github.com/NxRoot/next-coke-api/tree/master/examples/coke-firebase-auth)
* [coke-chakra-ui](https://github.com/NxRoot/next-coke-api/tree/master/examples/coke-chakra-ui)

## Installation 
```
npm i next-coke-api
```
**You need to structure your `api` folder** to use the `[...route].ts` slug <br>

```
📂 pages
 ├─📂 api
 │  └─📄 [...route].ts
 ├─📄 _app.tsx
 ├─📄 _document.tsx
 ├─📄 index.tsx 
```

> If you need to change this structure, make sure you specify a `customUrl` in the client options.

## Usage

**Server**
```js
// define API methods
const routes = {
    getName: async (body) => {
        return "your name is " + body.name 
    }
}

// export types to the client
export type AppRoutes = typeof routes

// export nextCokeHandler
export default function handler(req, res) {
    return nextCokeHandler(req, res, routes)
}
```
**Client**
```js
// define coke client
const { coke } = nextCokeClient<AppRoutes>()

// call API methods
coke.getName({ name: "John" }).then((res) => {
    console.log(res)
})

```

## Using REST [WIP]

> Everything works using REST methods, but the GET method is receiveing `req.body` instead of `req.query`.

**Server**
```js
// define REST methods
const routes = {
    users: {
        POST: async (body) => {
            return "You created a user. Congratulations " + body.name 
        }
    } 
}

// export types to the client
export type AppRoutes = typeof routes

// export nextCokeHandler with last arg as TRUE
export default function handler(req, res) {
    return nextCokeHandler(req, res, routes, true)
}
```
**Client**
```js
// define coke client with isREST = true
const { coke } = nextCokeClient<AppRoutes>({ isREST: true })

// call REST methods
coke.users.POST({ name: "John" }).then((res) => {
    console.log(res)
})

```

## TODO
* Refactor communication arguments.
* Create more examples.