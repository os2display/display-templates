# display-templates

Contains base templates for OS2Display.
See [https://github.com/os2display/display-docs/blob/main/templates.md](https://github.com/os2display/display-docs/blob/main/templates.md) for a description of how to create templates.

## Develop

To enable easy development of templates, the supplied docker-compose setup serves a page where the
slides in `src/slides.js` are displayed as a list of templates that can be open. The slides file contains 
example content for the different templates.

`index.html` serves a local setup for working with the templates.

```bash
docker-compose run node npm install
docker-compose up -d
```

The docker setup serves the files in the `build/` (see build for production) folder as `display-templates.local.itkdev.dk/build/`.

## Add a new template

To add a template:
* Create a folder in src with the name of the template, e.g. `my-template` that contains the following files:
  * `my-template.js` - The React component to render.
  * `my-template.json` - The file describing the where to find the files required for the template.
  * `my-template-dev.json` - The file describing the where to find the files required for the template in a dev context.
  * `my-template-admin.json` - The file describing the content interface for populating the template.
  * `my-template-content-example.json` - An example content.
  * `my-template-schema.json` - Json Schema description of the content for the slide.

Also add one or more entries to `src/slides.js` with examples of the data required for the template.

To compile the template it is necessary to add it to the webpack setup.

Add it to `const entry = {}`:

```
{
  "my-template": path.resolve(__dirname, "./src/my-template/my-template.js")
}
```

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

### Linting

```bash
docker-compose run node npm run check-coding-standards
```

```bash
docker-compose run node npm run apply-coding-standards
```
