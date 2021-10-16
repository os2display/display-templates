# display-templates

Work in progress. Contains base templates for OS2Display.

## Develop

In `examples/` is a local setup that is loading the components.

```bash
docker-compose run template npm install
docker-compose up -d
```

The docker setup serves the `build/` (see build for production) folder as `display-templates.local.itkdev.dk/build/`.

## Build for production.

To build the templates for production

```bash
npm run build
```

To continually build components when files change

```bash
npm run build-watch
```

The compiled files will be placed in `build/`. These should be committed to
git repository, to enable Remote Components to load them in the clients.

## @TODOs:

* Add tests for all templates.
* Fixed styles-components issue. Should be declared outside components and overridden by props.
