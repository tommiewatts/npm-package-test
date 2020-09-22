import localforage from "localforage";
import sureAxios from "../services/sureAxios";
import destructureAxiosReq from "../services/destructureAxiosReq";
import axios from "axios";

localforage.config({
  name: "toggle_auto",
  storeName: "toggle_auto",
});

export default {
  setAuthHeader(accessToken) {
    return new Promise((resolve) => {
      sureAxios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
      resolve();
    });
  },

  deleteAuthHeader() {
    delete sureAxios.defaults.headers["Authorization"];
  },

  createQuote(enrollmentApplication) {
    return destructureAxiosReq(
      sureAxios.post(`/api/quotes/v1/quotes`, enrollmentApplication)
    );
  },

  getQuote(quote_number) {
    return destructureAxiosReq(
      sureAxios.get(`/api/quotes/v1/quotes/${quote_number}`)
    );
  },

  updateQuote(quote_number, quote) {
    return destructureAxiosReq(
      sureAxios.put(`/api/quotes/v1/quotes/${quote_number}`, quote)
    );
  },

  getVehiclesYears(region_code) {
    return destructureAxiosReq(
      sureAxios.get(`/api/vehicles/v1/years`, {
        params: {
          region_code,
        },
      })
    );
  },

  getVehiclesMakes(year, region_code) {
    return destructureAxiosReq(
      sureAxios.get(`/api/vehicles/v1/makes`, {
        params: {
          year,
          region_code,
        },
      })
    );
  },

  getVehiclesModels(year, make, region_code) {
    return destructureAxiosReq(
      sureAxios.get(`/api/vehicles/v1/models`, {
        params: {
          year,
          make,
          region_code,
        },
      })
    );
  },

  getQuoteVars(quote_number) {
    return destructureAxiosReq(
      sureAxios.get(`/api/quotes/v1/quotes/${quote_number}/variables`)
    );
  },

  getQuoteCheckout(quoteNumber, application) {
    if (application) {
      return destructureAxiosReq(
        sureAxios.put(`/api/quotes/v1/quotes/${quoteNumber}/checkout`, {
          application,
        })
      );
    } else {
      return destructureAxiosReq(
        sureAxios.get(`/api/quotes/v1/quotes/${quoteNumber}/checkout`)
      );
    }
  },

  finalizeQuote(quote_number, opts) {
    return destructureAxiosReq(
      sureAxios.post(`/api/quotes/v1/quotes/${quote_number}/finalize`, opts)
    );
  },

  getPolicies() {
    return destructureAxiosReq(
      sureAxios.get(`/api/management/v1/policies`, {}, {})
    );
  },

  getPolicy(policyId) {
    return destructureAxiosReq(
      sureAxios.get(`/api/management/v1/policies/${policyId}`)
    );
  },

  updatePolicy(policy) {
    return destructureAxiosReq(
      sureAxios.put(`/api/management/v1/policies/${policy.id}`, policy)
    );
  },

  getPolicyVars(policyId) {
    return destructureAxiosReq(
      sureAxios.get(`/api/management/v1/policies/${policyId}/variables`)
    );
  },

  getPolicyCheckout(policy) {
    return destructureAxiosReq(
      sureAxios.post(
        `/api/management/v1/policies/${policy.id}/checkout`,
        policy
      )
    );
  },

  cancelPolicy(policyId, reason = "") {
    return destructureAxiosReq(
      sureAxios.delete(`/api/management/v1/policies/${policyId}`, {
        data: {
          reason,
        },
      })
    );
  },

  getUser() {
    return destructureAxiosReq(sureAxios.get(`/api/user/v1/profile`));
  },

  createPaymentMethod(opts = {}) {
    return destructureAxiosReq(
      sureAxios.post(`/api/management/v1/payment_methods`, {
        source_token: opts.token,
        email: opts.email,
        name: opts.name,
      })
    );
  },

  changePassword(newPassword, oldPassword) {
    return destructureAxiosReq(
      sureAxios.post(`/api/user/v1/change-password`, {
        old_password: oldPassword,
        new_password: newPassword,
      })
    );
  },

  getClaims(policyId) {
    return destructureAxiosReq(
      sureAxios.get(`/api/management/v1/policies/${policyId}/claims`)
    );
  },

  oktaAuthenticate(opts = { username: null, password: null, options: {} }) {
    const BASE_OKTA_URL = process.env.REACT_APP_OKTA_ISSUER.split("/oauth2")[0];

    return destructureAxiosReq(
      axios.post(`${BASE_OKTA_URL}/api/v1/authn`, opts)
    );
  },

  oktaResetPassword(opts = { username: null }) {
    const BASE_OKTA_URL = process.env.REACT_APP_OKTA_ISSUER.split("/oauth2")[0];

    return destructureAxiosReq(
      axios.post(`${BASE_OKTA_URL}/api/v1/authn/recovery/password`, opts)
    );
  },

  oktaRequest({ url, method, opts = {} }) {
    return destructureAxiosReq(axios[method](url, opts));
  },

  getLinkUrl(quote) {
    sureAxios.defaults.headers[
      "Authorization"
    ] = `Bearer ${process.env.REACT_APP_CARRIER_SECRET_TOKEN}`;
    return destructureAxiosReq(sureAxios.post("/api/auth/v1/links", quote));
  },

  exchangeQuoteAuthToken(quoteNumber, token) {
    return destructureAxiosReq(
      sureAxios.post(process.env.REACT_APP_EXCHANGE_TOKEN_ENDPOINT, {
        quote_number: quoteNumber,
        token,
      })
    );
  },

  downloadDigitalId(policyId, id_type) {
    return destructureAxiosReq(
      sureAxios.post(`/api/management/v1/policies/${policyId}/digital-id`, {
        id_type,
      })
    );
  },
};
