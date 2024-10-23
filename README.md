# display-templates

Contains base templates for OS2Display.
See [https://github.com/os2display/display-docs/blob/main/templates.md](https://github.com/os2display/display-docs/blob/main/templates.md) for a description of how to create templates.

## Develop

To enable easy development of templates, the supplied docker-compose setup serves a page where the
slides in `src/slides.js` are displayed as a list of templates that can be open. The slides file contains
example content for the different templates.

`index.html` serves a local setup for working with the templates.

```bash
docker compose pull
docker compose run --rm node yarn
docker compose up --detach
```

The docker setup serves the files in the `build/` (see build for production) folder as `display-templates.local.itkdev.dk/build/`.

## Add a new template

To add a template:

* Create a folder in src with the name of the template, e.g. `my-template` that contains the following files:
  * `my-template.js` - The React component to render.
  * `my-template.config.json` - The file describing the where to find the files required for the template.
  * `my-template-admin.json` - The file describing the content interface for populating the template.

Add one or more entries to `src/slides.js` with examples of the data required for the template. 

Also import the template in `src/index.js` and add the template to `const renderSlide = {}` in `src/index.js`.

To compile the template it is necessary to add it to the webpack setup. This is done in `webpack.config.js`.

Add it to `const entry = {}`:

```
{
  "my-template": path.resolve(__dirname, "./src/my-template/my-template.js")
}
```

Running the build script will build all templates and set new timestamps in the config json files.
Only add the files relating to the new template to git.

## Build for production.

To build the templates for production

```bash
docker compose run --rm node yarn install
docker compose run --rm node yarn build
```

To continually build components when files change

```bash
docker compose run --rm node yarn build-watch
```

The compiled files will be placed in `build/`. These should be committed to
git repository, to enable Remote Components to load them in the clients.

### Build base URL

The default base build URLs,
`https://raw.githubusercontent.com/os2display/display-templates/develop/build/`
and
`https://raw.githubusercontent.com/os2display/display-templates/main/build/`,
respectively, can be overridden via environment variables:

Override both with same value:

```sh
docker compose run --rm --env DEPLOYMENT_BUILD_BASE_URL="http://$(docker compose port nginx 80)/build/" node yarn build
```

Override "develop" base URL only:

```sh
docker compose run --rm --env DEPLOYMENT_BUILD_BASE_URL_DEVELOP="http://$(docker compose port nginx 80)/build/" node yarn build
```

Override "main" base URL only:

```sh
docker compose run --rm --env DEPLOYMENT_BUILD_BASE_URL_MAIN="http://$(docker compose port nginx 80)/build/" node yarn build
```

The default behavoir is equivalent to

```sh
docker compose run --rm \
    --env DEPLOYMENT_BUILD_BASE_URL_DEVELOP="https://raw.githubusercontent.com/os2display/display-templates/develop/build/" \
    --env DEPLOYMENT_BUILD_BASE_URL_MAIN="https://raw.githubusercontent.com/os2display/display-templates/main/build/" \
    node yarn build
```

### Linting

```bash
docker compose run --rm node yarn check-coding-standards
```

```bash
docker compose run --rm node yarn apply-coding-standards
```

### Tests

Run tests

```sh
# Templates
docker compose run --rm cypress run --component
# Screen layouts
docker compose run --rm cypress run
```

Or open mode
```sh
yarn cypress open
```
