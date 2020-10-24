import times from "lodash/times";

function printFromPackage() {
  times(10, () =>
    console.log(
      "SURE-AUTO-INSURANCE: Hello from package once more, should not work like this right?"
    )
  );
}

export default { printFromPackage };
