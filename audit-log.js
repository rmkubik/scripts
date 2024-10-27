const fs = require("fs").promises;
const git = require("simple-git")();
const { stdin } = process;

/**
 * Copy pasted from here:
 * https://github.com/sindresorhus/get-stdin/blob/main/index.js
 *
 * Didn't want to convert this to an esm module to use the supplied npm package.
 */
async function getStdin() {
  let result = "";

  if (stdin.isTTY) {
    return result;
  }

  stdin.setEncoding("utf8");

  for await (const chunk of stdin) {
    result += chunk;
  }

  return result;
}

getStdin.buffer = async () => {
  const result = [];
  let length = 0;

  if (stdin.isTTY) {
    return Buffer.concat([]);
  }

  for await (const chunk of stdin) {
    result.push(chunk);
    length += chunk.length;
  }

  return Buffer.concat(result, length);
};

async function run() {
  const input = await getStdin();
  const commits = input.split("\n");
  const [, , filePath, searchTerm] = process.argv;
  const { current: currentBranch } = await git.branchLocal();

  for (commit of commits) {
    console.log(`Searching commit, ${commit}`);

    const [hash] = commit.split(" - ");

    await git.checkout(hash);

    const fileContents = await fs.readFile(filePath, "utf8");

    if (fileContents.includes(searchTerm)) {
      console.log(`Found a reference to "${searchTerm}":
      ${commit}
      `);
    }
  }

  console.log(`Returning to original branch, ${currentBranch}`);

  await git.checkout(currentBranch);
}

run();
