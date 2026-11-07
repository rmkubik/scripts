// Script to convert Animal Well 64 egg
// song into arrows from numbers.
// Incorrect initial interpretation,
// there was one upside down egg.
// Corrected in the second version.
const input_v1 = `
6 3 1 3 6 3 1 3 6 4
2 4 3 4 2 4 0 5 3 5 0 5
3 5 7 5 2 5 7 5 2 5 6 3 1 3
6 3 1 3 6 4 2 4 6 4 2 4 6 0
6 4 0 7 5 3 7 6 4 5 7 6 5 6
`;
const input_v2 = `
6 3 1 3 6 3 1 3 6 4
2 4 6 4 2 4 0 5 3 5 0 5
3 5 7 5 2 5 7 5 2 5 6 3 1 3
6 3 1 3 6 4 2 4 6 4 2 4 6 0
6 4 0 7 5 3 7 6 4 5 7 6 5 6
`;

const arrowMapping = {
  1: "→",
  2: "↘",
  3: "↓",
  4: "↙",
  5: "←",
  6: "↖",
  7: "↑",
  0: "↗",
};

const numbers = input_v2
  .trim()
  .split("\n")
  .map((line) => line.split(" "))
  .flat()
  .map((number) => parseInt(number));

console.log(numbers);

const arrows = numbers.map((number) => arrowMapping[number]);

console.log(arrows);

let output = "";

let buffer = [...arrows];
while (buffer.length > 0) {
  const firstEight = buffer.slice(0, 8);
  buffer = [...buffer.slice(8)];
  output += firstEight.join(" ") + "\n";
}

console.log(output);
