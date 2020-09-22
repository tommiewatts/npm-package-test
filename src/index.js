import times from "lodash/times";
import api from "./services/api";

export function printFromPackage() {
  console.log(
    "SURE-AUTO-INSURANCE: REACT_APP_SURE_API_URL is",
    process.env.REACT_APP_SURE_API_URL
  );
  console.log(
    "SURE-AUTO-INSURANCE: REACT_APP_TESTING_THIS is",
    process.env.REACT_APP_TESTING_THIS
  );
  times(10, () =>
    console.log(
      "SURE-AUTO-INSURANCE: Hello from package once more, should not work like this right?"
    )
  );
}

export function testApiCall() {
  api
    .getUser()
    .then((data) =>
      console.log("SURE-AUTO-INSURANCE: GET USER FROM PACKAGE", data)
    );
}

export function doThisThing(accessToken) {
  console.log("SURE-AUTO-INSURANCE: SETTING AUTH HEADER FROM PACKAGE");
  api.setAuthHeader(accessToken);
}

export default { printFromPackage };
