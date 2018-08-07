# Micro-next.js

[![build status](https://travis-ci.org/hung-phan/micro-nextjs.svg?branch=master)](http://travis-ci.org/hung-phan/micro-nextjs/)

## Previous project
- [koa-react-isomorphic](https://github.com/hung-phan/koa-react-isomorphic)

## Requirement
- Install [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) to have better experience when developing.

### Idea to structure redux application
For now, the best way is to place all logic in the same place with components to make it less painful when scaling the application.
Current structure is the combination of ideas from [organizing-redux](http://jaysoo.ca/2016/02/28/organizing-redux-application/) and
[ducks-modular-redux](https://github.com/erikras/ducks-modular-redux). Briefly, I will have our reducer, action-types, and actions
in the same place with featured components.

## Development

```bash
$ npm run dev
```

## Test

```bash
$ npm test
```

## Production

### Start production server

```bash
$ npm run build
$ npm start
```

Access `http://localhost:3000` to see the application

## QA

Feel free to open an issue on the repo.
