# gltf-project-explorer

[![Build Status](https://travis-ci.com/KhronosGroup/glTF-Project-Explorer.svg?branch=master)](https://travis-ci.com/KhronosGroup/glTF-Project-Explorer)

Tool to provide a filterable registry of glTF community projects.

http://github.khronos.org/glTF-Project-Explorer/

## Contributions

In order to add your project to the project list, you can fork this
repository, add your project information to the
[`glTF-projects-data.json`](public/data/glTF-projects-data.json) file,
and submit a pull request with the changes. Alternatively, you can
also open an issue that contains the relevant project information
as described below.

The JSON properties that can be contained in the project information
are summarized in the following table:

| Property              | Type                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                | `string`                 | The name of the project. This will be the title of the project card, and turned into a link, leading to the URL that is given as the `link` property                                                                                                                                                                                                                                                                                                                                                           |
| `link`                | `string` (URL)           | The URL of the homepage of the project.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `description`         | `string`                 | A short description of the project. This string can contain basic [Markdown](https://help.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax) formatting.                                                                                                                                                                                                                                                                                                                              |
| `task`                | `string[]`               | An array of strings, describing the basic tasks that are supported by the project. <br> <br> Common examples of tasks are `view`, `load`, `import`, `export`, `validate`, or `optimize`                                                                                                                                                                                                                                                                                                                        |
| `type`                | `string[]`               | An array of strings characterizing the type of the project. <br> <br> Common types are `application`, `library`, `plugin`, `demo`, `web-api`, or `engine`. The types can be combined, for example, when a library can also be used as a standalone command-line application. <br> <br> Other types of projects may be `forum` or `website`, or `model-repository`.                                                                                                                                             |
| `license`             | `string[]`               | An array of strings describing the licenses under which the project is published. The strings should be the [license identifiers according to the SPDX license list](https://spdx.org/licenses/).<br> <br> Examples of licenses are `Apache-2.0`, `BSD-3-Clause`, or `MIT`.                                                                                                                                                                                                                                    |
| `language`            | `string[]`               | An array of strings indicating the programming languages of the project, where applicable. <br> <br> Examples of languages are `JavaScript`, `C++`, `Java`, or `TypeScript`                                                                                                                                                                                                                                                                                                                                    |
| `inputs`<br>`outputs` | `string[]`<br>`string[]` | Arrays of strings listing the supported file types. These fields should at least contain the string `glTF 1.0` or `glTF 2.0`, indicating which glTF version is supported.<br> <br> Further file types may be listed for viewers or converters, to indicate the supported input- and output types. This is usually done by listing the file extension - for example, `OBJ`, `FBX`, or `COLLADA`. For universal viewers or converters, the string `Multiple` can be used instead of listing all file extensions. |

All properties except for the `name` are optional.

An example of the JSON description of a project is shown here:

```json
{
  "name": "Example",
  "link": "http://example.com",
  "description": "An example project. The description can contain basic markdown.",
  "task": ["view", "import", "export"],
  "type": ["application", "library"],
  "license": ["MIT", "CC-BY-2.5"],
  "language": ["TypeScript"],
  "inputs": ["glTF 1.0", "glTF 2.0", "OBJ"],
  "outputs": ["glTF 2.0", "FBX"]
}
```

## Developing

The glTF Project Explorer tool uses Create React App to simplify maintenance.
Please look at [DEVELOPING.md](DEVELOPING.md) for information on how Create
React App works.
