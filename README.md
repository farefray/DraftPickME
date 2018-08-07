## DraftPickMe

What does it mean to be a draft pick?
A draft is a process used in some countries and sports to allocate certain players to teams. In a draft, teams take turns selecting from a pool of eligible players. When a team selects a player, the team receives exclusive rights to sign that player to a contract, and no other team in the league may sign the player.

## Folder structure

```bash
.
├── .editorconfig             # Configures editor rules
├── .gitignore                # Tells git which files to ignore
├── .istanbul.yml             # Configure istanbul code coverage
├── .npmrc                    # Configures npm to save exact by default
├── README.md                 # This file.
├── dist                      # Folder where the build script places the built app.
├── package.json              # Package configuration. The list of 3rd party libraries and utilities
├── src                       # Source code
│   ├── actions               # Flux/Redux actions. List of distinct actions that can occur in the app.
│   ├── constants             # Application constants including constants for Redux
│   ├── factories             # factories pattern (just tiny alerts factoria, but planning to extend)
│   ├── helpers               # All the bits and pieces that don't fit into other folders but don't justify having a folder of their own.
│   ├── images                # Images :)
│   ├── js                    # Vanilla JS which is used by App
│   ├── pages                 # Fractal structure. Root level components, ones which are directly mounted on level 1 routes.
│   ├───── components         # Contains shared React components that can be used anywhere in the application.
│   ├───── ~                  # Components and their nested components. All components are CamelCased. The sub components of Component.js are present in a folder called component. All components required by a page go to it’s node folder. 
│   ├── reducers              # Redux reducers. Your state is altered here based on actions
│   ├── services              # Handles all http communication with backend apis for the application, can also have methods that don't wrap http calls.
│   ├── styles                # CSS Styles
│   ├───── fonts              # Fonts
│   ├── favicon.ico           # favicon to keep your browser from throwing a 404 during dev. Not actually used in prod build.
│   ├── index.ejs             # Template for homepage
│   ├── index.js              # Entry point for your app
│   ├── store.js              # Redux store configuration
├── tools                     # Node scripts that run build related tools
│   └── analyzeBundle.js      # Analyzes the webpack bundle
│   ├── assetsTransformer.js  # Fix for jest handling static assets like imported images
│   ├── build.js              # Runs the production build
│   ├── chalkConfig.js        # Centralized configuration for chalk (adds color to console statements)
│   ├── distServer.js         # Starts webserver and opens final built app that's in dist in your default browser
│   ├── nodeVersionCheck.js   # Confirm supported Node version is installed
│   ├── removeDemo.js         # Remove demo app
│   ├── srcServer.js          # Starts dev webserver with hot reloading and opens your app in your default browser
│   ├── startMessage.js       # Display message when development build starts
│   ├── testCi.js             # Configure Jest to run on a CI server
├── webpack.config.dev.js     # Configures webpack for development builds
└── webpack.config.prod.js    # Configures webpack for production builds
```
