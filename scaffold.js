const fs = require("fs").promises;
const { promisify } = require("util");
const path = require("path");
const exec = promisify(require("child_process").exec);

// npm deps
// commander - parse args
// chalk - pretty printing
// some solution to show progress bar?

async function run() {
  const [exe, exePath, projectName, template] = process.argv;

  console.log(`Creating "${projectName}" from template "${template}"`);

  const projectPath = path.join(process.cwd(), projectName);
  await fs.mkdir(projectPath);

  const readmePath = path.join(projectPath, "README.md");
  const readmeTemplate = `# ${projectName}
  `;
  await fs.writeFile(readmePath, readmeTemplate);

  const srcPath = path.join(projectPath, "src");
  await fs.mkdir(srcPath);

  const indexHtmlPath = path.join(srcPath, "index.html");
  const indexHtmlTemplate = `<html>
    <body>
        ${
          template === "react"
            ? '<div id="root"></div>'
            : `<h1>${projectName}</h1>`
        }
        <script src="./index.js"></script>
    </body>
</html>`;
  await fs.writeFile(indexHtmlPath, indexHtmlTemplate);

  const indexJsPath = path.join(srcPath, "index.js");
  const indexJsTemplate = `${
    template === "react"
      ? `import React from "react";
import ReactDOM from "react-dom";`
      : ""
  }
import "./styles/main.scss";
  
${
  template === "react"
    ? `const App = () => <h1>${projectName}</h1>;
ReactDOM.render(<App />, document.getElementById("root"));`
    : `console.log("Hello from ${projectName}.")`
}`;
  await fs.writeFile(indexJsPath, indexJsTemplate);

  const stylesPath = path.join(srcPath, "styles");
  await fs.mkdir(stylesPath);

  const mainScssPath = path.join(stylesPath, "main.scss");
  const mainScssTemplate = `h1 {
    color: red;
}`;
  await fs.writeFile(mainScssPath, mainScssTemplate);

  const gitIgnorePath = path.join(projectPath, ".gitignore");
  const gitIgnoreTemplate = `dist
node_modules
.DS_Store
.cache`;
  await fs.writeFile(gitIgnorePath, gitIgnoreTemplate);

  let { stdout, stderr } = await exec("npm init -y", {
    cwd: projectPath,
  });
  console.log(stdout);
  console.error(stderr);
  ({ stdout, stderr } = await exec(`npm install --save-dev parcel-bundler`, {
    cwd: projectPath,
  }));
  console.log(stdout);
  console.error(stderr);

  if (template === "react") {
    ({ stdout, stderr } = await exec(`npm install react react-dom`, {
      cwd: projectPath,
    }));
    console.log(stdout);
    console.error(stderr);
  }

  const packageJsonPath = path.join(projectPath, "package.json");
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));
  packageJson.scripts = {
    start: "parcel src/index.html",
    build: "parcel build src/index.html",
  };
  await fs.writeFile(
    packageJsonPath,
    JSON.stringify(packageJson, undefined, 2)
  );

  ({ stdout, stderr } = await exec("git init", {
    cwd: projectPath,
  }));
  console.log(stdout);
  console.error(stderr);
  ({ stdout, stderr } = await exec("git add -A", {
    cwd: projectPath,
  }));
  console.log(stdout);
  console.error(stderr);
  ({ stdout, stderr } = await exec('git commit -m "Initial commit"', {
    cwd: projectPath,
  }));
  console.log(stdout);
  console.error(stderr);
}

run();
