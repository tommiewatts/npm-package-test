import printFromPackage from "./printFromPackage";
import printName from "./printMyName";
import testing from "./services/testing";

export function testPrint() {
  printFromPackage();
}

export default {
  newPrint: printFromPackage,
  printMyName: printName,
  testing: testing,
};
