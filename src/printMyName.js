import times from "lodash/times";

export default function printMyName(name) {
  times(10, () => console.log("Hello my name is " + name));
}
