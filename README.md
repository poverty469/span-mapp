# span-mapp

## Project Standards

### CSS

- Use [BEM naming convention](http://getbem.com/naming/)
- Use [SCSS variables](https://sass-lang.com/documentation/variables) where ever possible, found in \_settings.scss

### Syntax Style and IDE

- Turn on [autolinting](https://alligator.io/vuejs/eslint-vue-vetur/) in your IDE
  - If using VSCode
    - Download [Vue Extension Pack by Raza](https://marketplace.visualstudio.com/items?itemName=mubaidr.vuejs-extension-pack)
    - If you want to partake in TODO tracking, download [TODO+](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-todo-plus)

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
VUE_APP_PUBLIC_PATH=/
VUE_APP_MAPBOX_API_ACCESS_TOKEN=
VUE_APP_MAPBOX_STYLE_URL=
```

Paste in a Mapbox Public API token and a Mapbox Style URL of your choice basemap.
To improve load times paste `?optimize=true` at the end of the Style URL, this prevents the Mapbox Server from sending
data that is impossible to access (areas beyond the max pan-area and beyond the zoom scope).

Create another file titled .env.staging.local
Paste these variable declarations into it:

```
NODE_ENV=production
VUE_APP_PUBLIC_PATH=/application-title/
VUE_APP_MAPBOX_API_ACCESS_TOKEN=
VUE_APP_MAPBOX_STYLE_URL=
```

The access token for the staging environment should be restricted to the URL of where it will be deployed (e.g. 'poverty469.github.io').
Restrictions can be added in the Mapbox Account dashboard.

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
