import times from "lodash/times";

export default function printFromPackage() {
  const test = [];
  for (let i = 0; i < 100; i++) {
    console.log(i);
    test.push(`item${i}`);
  }

  console.log(test);
}
