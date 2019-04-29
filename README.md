# span-mapp

## Project Standards
### CSS
- Use [BEM naming convention](http://getbem.com/naming/)
- Use [SCSS variables](https://sass-lang.com/documentation/variables) where ever possible, found in _settings.scss

### Syntax Style
- Turn on [autolinting](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) in your IDE

### Vue
- Follow [Vue style guide](https://vuejs.org/v2/style-guide/)
    - Vue will automatically give your warnings during 'serving' if you break the style guide
    - [Parent-Child Communication](https://vuejs.org/v2/guide/components.html#Passing-Data-to-Child-Components-with-Props)
    - [Child-Parent Communication](https://vuejs.org/v2/guide/components.html#Listening-to-Child-Components-Events)

### Git
- Use [this as a diagram of branch relationships](https://nvie.com/posts/a-successful-git-branching-model/, we're only using 'dev' and 'master' until closer to finishing.
- If comfortable, use a [directory naming structure](https://coderwall.com/p/qkofma/a-caution-about-git-branch-names-with-s) to organize branches
- [Seperate concerns and boil down implementation steps in order to commit often](https://www.git-tower.com/learn/git/ebook/en/command-line/appendix/best-practices)
- Write meaningful commit titles, if you can't clarify everything in the title write meaningful message bodies

## Project setup
```
npm install
```

### Set up environment
If you want to test production builds and use your own mapbox basemaps...

Create a file titled .env.local
Paste these variable declarations into it
```
VUE_APP_MAPBOX_API_ACCESS_TOKEN=
VUE_APP_MAPBOX_STYLE_URL=
```
Paste in a Mapbox Public API token and a Mapbox Style URL of your choice basemap.

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
