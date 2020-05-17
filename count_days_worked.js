const fs = require("fs").promises;
const util = require("util");
const exec = util.promisify(require("child_process").exec);

// git log --author="Ryan Kubik" --format="%cD" > commits.txt

let author = process.argv[2];

if (!process.argv[2]) {
  console.log("No author specified, defaulting to all authors.");
  author = "";
}

class DateMap {
  constructor() {
    this.dates = {};
  }

  add(date) {
    // strip time
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (!this.contains(date)) {
      this.dates[date] = 0;
    }

    this.dates[date] += 1;
  }

  contains(date) {
    return Object.keys(this.dates).some((existingDate) =>
      DateMap.compare(date, new Date(existingDate))
    );
  }

  static compare(a, b) {
    return (
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear()
    );
  }

  toString() {
    return Object.entries(this.dates)
      .map(([date, commits]) => {
        return `    ${DateMap.formatDate(date)}: ${commits} commits`;
      })
      .join("\n");
  }

  static formatDate(date) {
    const formatter = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    return formatter.format(new Date(date));
  }
}

// git log --author="Ryan Kubik" --format="%cD" > commits.txt
async function read() {
  const { stdout, stderr } = await exec(
    `git log ${
      author ? `--author="${process.argv[2]}"` : ""
    } --format="%cD" < /dev/tty`
  );

  if (stderr) {
    throw stderr;
  }

  const dates = new DateMap();
  const commits = stdout; // await fs.readFile("./commits.txt", "utf-8");

  commits.split("\n").forEach((commitDate) => {
    if (commitDate.length > 0) {
      const date = new Date(commitDate);

      dates.add(date);
    }
  });

  console.log(`
    For Author: ${author || "all"}

    Total Days: ${Object.keys(dates.dates).length}
    Total Commits: ${Object.values(dates.dates).reduce(
      (count, commits) => count + commits,
      0
    )}

    First Day: ${DateMap.formatDate(
      Object.keys(dates.dates)[Object.keys(dates.dates).length - 1]
    )}
    Most Recent Day: ${DateMap.formatDate(Object.keys(dates.dates)[0])}
${process.argv[3] === "showDates" ? `\n${dates.toString()}\n` : ""}`);
}

read();
