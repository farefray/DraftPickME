## What do the scripts in package.json do?

Unfortunately, scripts in package.json can't be commented inline because the JSON spec doesn't support comments, so I'm providing info on what each script in package.json does here.

| **Script**        | **Description**                                                                                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| remove-demo       | Removes the demo application so you can begin development.                                                                                                 |
| prestart          | Runs automatically before start to display a message.                                                                                                      |
| start             | Runs tests, lints, starts dev webserver, and opens the app in your default browser.                                                                        |
| lint:tools        | Runs ESLint on build related JS files. (eslint-loader lints src files via webpack when `npm start` is run)                                                 |
| clean-dist        | Removes everything from the dist folder.                                                                                                                   |
| remove-dist       | Deletes the dist folder.                                                                                                                                   |
| create-dist       | Creates the dist folder and the necessary subfolders.                                                                                                      |
| prebuild          | Runs automatically before build script (due to naming convention). Cleans dist folder, builds html, and builds sass.                                       |
| build             | Bundles all JavaScript using webpack and writes it to /dist.                                                                                               |
| test              | Runs tests (files ending in .spec.js or .test.js) using Jest and outputs results to the command line. Watches all files so tests are re-run upon save.     |
| test:cover        | Runs tests as described above. Generates a HTML coverage report to ./coverage/index.html                                                                   |
| test:cover:travis | Runs coverage as described above, however sends machine readable lcov data to Coveralls. This should only be used from the travis build!                   |
| analyze-bundle    | Analyzes webpack bundles for production and gives you a breakdown of where modules are used and their sizes via a convenient interactive zoomable treemap. |


## What are the dependencies in package.json used for?

| **Dependency**                                 | **Use**                                                                                                                                                                                                                                                                                        |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autoprefixer                                   | Automatically adds vendor prefixes, using data from Can I Use.                                                                                                                                                                                                                                 |
| object-assign                                  | Polyfill for Object.assign                                                                                                                                                                                                                                                                     |
| babel-cli                                      | Babel Command line interface                                                                                                                                                                                                                                                                   |
| babel-core                                     | Babel Core for transpiling the new JavaScript to old                                                                                                                                                                                                                                           |
| babel-eslint                                   | Integrates Babel with ESLint so experimental JS features ESLint doesn't support yet can be linted.                                                                                                                                                                                             |
| babel-jest                                     | Integrates Babel with Jest so tests are transpiled                                                                                                                                                                                                                                             |
| babel-loader                                   | Adds Babel support to Webpack                                                                                                                                                                                                                                                                  |
| babel-polyfill                                 | Polyfills features that cannot be transpiled                                                                                                                                                                                                                                                   |
| babel-plugin-react-display-name                | Add displayName to React.createClass calls                                                                                                                                                                                                                                                     |
| babel-plugin-transform-react-constant-elements | Performance optimization: Hoists the creation of elements that are fully static to the top level. reduces calls to React.createElement and the resulting memory allocations. [More info](https://medium.com/doctolib-engineering/improve-react-performance-with-babel-16f1becfaa25#.2wbkg8g4d) |
| babel-preset-latest                            | Babel preset for ES2015, ES2016 and ES2017                                                                                                                                                                                                                                                     |
| babel-preset-react-hmre                        | Hot reloading preset for Babel                                                                                                                                                                                                                                                                 |
| babel-preset-react                             | Add JSX support to Babel                                                                                                                                                                                                                                                                       |
| babel-preset-stage-1                           | Include stage 1 feature support in Babel                                                                                                                                                                                                                                                       |
| browser-sync                                   | Supports synchronized testing on multiple devices and serves local app on public URL                                                                                                                                                                                                           |
| chalk                                          | Adds color support to terminal                                                                                                                                                                                                                                                                 |
| connect-history-api-fallback                   | Support reloading deep links                                                                                                                                                                                                                                                                   |
| coveralls                                      | For tracking and displaying code coverage information via Coveralls.io                                                                                                                                                                                                                         |
| cross-env                                      | Cross-environment friendly way to handle environment variables                                                                                                                                                                                                                                 |
| css-loader                                     | Add CSS support to Webpack                                                                                                                                                                                                                                                                     |
| enzyme                                         | Simplified JavaScript Testing utilities for React                                                                                                                                                                                                                                              |
| eslint                                         | Lints JavaScript                                                                                                                                                                                                                                                                               |
| eslint-loader                                  | Adds ESLint support to Webpack                                                                                                                                                                                                                                                                 |
| eslint-plugin-import                           | Adds ES6 import related linting rules                                                                                                                                                                                                                                                          |
| eslint-plugin-react                            | Adds additional React-related rules to ESLint                                                                                                                                                                                                                                                  |
| eslint-watch                                   | Wraps ESLint to provide file watch support and enhanced command line output                                                                                                                                                                                                                    |
| extract-text-webpack-plugin                    | Extracts CSS into separate file for production build                                                                                                                                                                                                                                           |
| file-loader                                    | Adds file loading support to Webpack                                                                                                                                                                                                                                                           |
| html-webpack-plugin                            | Generates custom index.html for each environment as part of webpack build                                                                                                                                                                                                                      |
| identity-obj-proxy                             | Mocks webpack imports that Jest doesn't understand such as image and CSS imports.                                                                                                                                                                                                              |
| jest                                           | Testing framework                                                                                                                                                                                                                                                                              |
| json-loader                                    | Enhance Webpack to support importing .json files                                                                                                                                                                                                                                               |
| mockdate                                       | Mock dates in testing                                                                                                                                                                                                                                                                          |
| node-sass                                      | Adds SASS support to Webpack                                                                                                                                                                                                                                                                   |
| npm-run-all                                    | Run multiple scripts at the same time                                                                                                                                                                                                                                                          |
| open                                           | Open the app in your default browser                                                                                                                                                                                                                                                           |
| postcss-loader                                 | Adds PostCSS support to Webpack                                                                                                                                                                                                                                                                |
| react                                          | React library                                                                                                                                                                                                                                                                                  |
| redux-immutable-state-invariant                | Alert if Redux state is mutated (helps catch bugs, since Redux state is immutable)                                                                                                                                                                                                             |
| react-dom                                      | React library for DOM rendering                                                                                                                                                                                                                                                                |
| react-redux                                    | Redux library for connecting React components to Redux                                                                                                                                                                                                                                         |
| react-router                                   | React library for routing                                                                                                                                                                                                                                                                      |
| react-test-renderer                            | Renders React components to pure JavaScript objects without depending on the DOM or a native mobile environment                                                                                                                                                                                |
| redux                                          | Library for unidirectional data flows                                                                                                                                                                                                                                                          |
| redux-thunk                                    | Middleware for redux that allows actions to be declared as functions                                                                                                                                                                                                                           |
| replace                                        | Renaming files, cross-platform                                                                                                                                                                                                                                                                 |
| rimraf                                         | Delete files, cross-platform                                                                                                                                                                                                                                                                   |
| sass-loader                                    | Adds Sass support to Webpack                                                                                                                                                                                                                                                                   |
| style-loader                                   | Add Style support to Webpack                                                                                                                                                                                                                                                                   |
| url-loader                                     | Add Webpack support for loading files via url with querystring                                                                                                                                                                                                                                 |
| webpack                                        | Bundler with plugin system and integrated development server                                                                                                                                                                                                                                   |
| webpack-bundle-analyzer                        | Webpack plugin and CLI utility that represents bundle content as convenient interactive zoomable treemap                                                                                                                                                                                       |
| webpack-dev-middleware                         | Used to integrate Webpack with Browser-sync                                                                                                                                                                                                                                                    |
| webpack-hot-middleware                         | Use to integrate Webpack's hot reloading support with Browser-sync                                                                                                                                                                                                                             |
| webpack-md5-hash                               | Hash bundles, and use the hash for the filename so that the filename only changes when contents change                                                                                                                                                                                         |

## Where are the files being served from when I run `npm start`?

Webpack serves your app in memory when you run `npm start`. No physical files are written. However, the web root is /src, so you can reference files under /src in index.html. When the app is built using `npm run build`, physical files are written to /dist and the app is served from /dist.

## Where is index.html?

It's generated by webpack using htmlWebpackPlugin. This plugin dynamically generates index.html based on the configuration in webpack.config. It also adds references to the JS and CSS bundles using hash-based filenames to bust cache. Separate bundles for vendor and application code are created and referencing within the generated index.html file so that vendor libraries and app code can be cached separately by the browser. The bundle filenames are based on the file's hash, so the filenames only change when the file contents change. For more information on this, read [Long-term caching of static assets with Webpack](https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.4aeatmtfz) and [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)

## How is Sass being converted into CSS and landing in the browser?

Magic! Okay, more specifically, we're handling it differently in dev (`npm start`) vs prod (`npm run build`)

When you run `npm start`:

1.  The sass-loader compiles Sass into CSS
2.  Webpack bundles the compiled CSS into bundle.js. Sounds odd, but it works!
3.  bundle.js contains code that loads styles into the &lt;head&gt; of index.html via JavaScript. This is why you don't see a stylesheet reference in index.html. In fact, if you disable JavaScript in your browser, you'll see the styles don't load either.

The approach above supports hot reloading, which is great for development. However, it also creates a flash of unstyled content on load because you have to wait for the JavaScript to parse and load styles before they're applied. So for the production build, we use a different approach:

When you run `npm run build`:

1.  The sass-loader compiles Sass into CSS
2.  The [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin) extracts the compiled Sass into styles.css
3.  Webpack adds a reference to the stylesheet to the head of index.html.

For both of the above methods, a separate sourcemap is generated for debugging Sass in [compatible browsers](http://thesassway.com/intermediate/using-source-maps-with-sass).

## I don't like the magic you just described above. I simply want to use a CSS file.

No problem. Reference your CSS file in index.html, and add a step to the build process to copy your CSS file over to the same relative location /dist as part of the build step. But be forwarned, you lose style hot reloading with this approach.

## How do I deploy this?

`npm run build`. This will build the project for production. It does the following:

* Minifies all JS
* Sets NODE_ENV to prod so that React is built in production mode
* Places the resulting built project files into /dist. (This is the folder you'll expose to the world).

If the app destination is different from the server root (`/`) you need to reconfigure `output.publicPath` in `webpack.config.prod.js` before building the app. See [webpack docs](https://webpack.js.org/configuration/output/#output-publicpath) for more information.

Check out this [blog post](www.latrovacommits.com/en/2017/12/14/how-publish-dist-folder-heroku/) showing two ways of deploying to Heroku.

## Why are test files placed alongside the file under test (instead of centralized)?

Streamlined automated testing is a core feature of this starter kit. All tests are placed in files that end in .spec.js. Spec files are placed in the same directory as the file under test. Why?

* The existence of tests is highly visible. If a corresponding .spec file hasn't been created, it's obvious.
* Easy to open since they're in the same folder as the file being tested.
* Easy to create new test files when creating new source files.
* Short import paths are easy to type and less brittle.
* As files are moved, it's easy to move tests alongside.

That said, you can of course place your tests under **test** instead. Then Jest will simply look in /test to find your spec files.

## How do I debug?

Since browsers don't currently support ES6, we're using Babel to compile our ES6 down to ES5. This means the code that runs in the browser looks different than what we wrote. But good news, a [sourcemap](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) is generated to enable easy debugging. This means your original JS source will be displayed in your browser's dev console.
_Note:_ When you run `npm start`, no JS is minified. Why? Because minifying slows the build. So JS is only minified when you run the `npm run build` script. See [more on building for production above](https://github.com/coryhouse/react-slingshot/blob/master/docs/FAQ.md#how-do-i-deploy-this).

Also note that no actual physical files are written to the filesystem during the dev build. **For performance, all files exist in memory when served from the webpack server.**. Physical files are only written when you run `npm run build`.

**Tips for debugging via sourcemaps:**

1.  Browsers vary in the way they allow you to view the original source. Chrome automatically shows the original source if a sourcemap is available. Safari, in contrast, will display the minified source and you'll [have to cmd+click on a given line to be taken to the original source](http://stackoverflow.com/questions/19550060/how-do-i-toggle-source-mapping-in-safari-7).
2.  Do **not** enable serving files from your filesystem in Chrome dev tools. If you do, Chrome (and perhaps other browsers) may not show you the latest version of your code after you make a source code change. Instead **you must close the source view tab you were using and reopen it to see the updated source code**. It appears Chrome clings to the old sourcemap until you close and reopen the source view tab. To clarify, you don't have to close the actual tab that is displaying the app, just the tab in the console that's displaying the source file that you just changed.
3.  If the latest source isn't displaying the console, force a refresh. Sometimes Chrome seems to hold onto a previous version of the sourcemap which will cause you to see stale code.

## Debugging in Visual Studio Code:

* Install the [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) extension.
* Follow the instructions on how to [configure debugging in Visual Studio code](https://github.com/Microsoft/vscode-chrome-debug/blob/master/README.md#using-the-debugger).

Don't see your favorite code editor debugging configuration here? Submit a PR and we'll be glad to add it to the FAQ.md.

## Why does the build use npm scripts instead of Gulp or Grunt?

In short, Gulp is an unnecessary abstraction that creates more problems than it solves. [Here's why](https://medium.com/@housecor/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.vtaziro8n).

## How do I handle images?

Via [Webpack's file loader](https://github.com/webpack/file-loader). Example:

```html
<img src={require('./src/images/myImage.jpg')} />
```

Webpack will then intelligently handle your image for you. For the production build, it will copy the physical file to /dist, give it a unique filename, and insert the appropriate path in your image tag.

## What about the Redux Devtools?

Install the [Redux devtools extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) in Chrome Developer Tools. If you're interested in running Redux dev tools cross-browser, Barry Staes created a [branch with the devtools incorporated](https://github.com/coryhouse/react-slingshot/pull/27).

## How do I setup code coverage reporting?

Use the `npm run test:cover` command to run the tests, building a code coverage report. The report is written to `/coverage/lcov-report/index.html`. Slingshot provides a script for this:

```bash
npm run open:cover
```
