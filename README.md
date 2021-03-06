# FrontendArchetype
Project for inventing robust, complete and easy to use archetype for browser based frontend applications. Focused on using modern build tools and technologies.

# Requirements
- [TypeScript](https://www.typescriptlang.org/) support - modern, statically typed language based on JavaScript syntax.
- Asychronously loaded modules - so application will not have to load all of the source code at once.
- Tests
- Internationalization (i18next)
- Minification


# Build tool
- [Node.js](https://nodejs.org/en/) as a platform to run build tool
- npm - node.js dependencies management tool
- [Webpack](https://webpack.github.io/) with amd module management

Configuration tutorial: [Typescript + Webpack + React](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)

# Dependencies
- node.js
- webpack
- typescript
- on hold - [Typings](https://github.com/typings/typings) - TypeScript Definition Manager - it will grab diefinition files.
- React + React DOM
- Redux
- lodash
- moment.js

# Requirements
- Ensure some dependencies are installed globally (sudo might be required):
 npm install -g typescript typings webpack




#Typings installed:

typings install dt~react --global --save
typings install dt~react-router --global --save
typings install dt~react-router/history --global --save
typings install dt~react-dom --global --save