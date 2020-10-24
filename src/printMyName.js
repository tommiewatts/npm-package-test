import times from "lodash/times";

function printMyName(name) {
  times(10, () => console.log("Hello my name is " + name));
}

export default printMyName;
