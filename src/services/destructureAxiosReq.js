/**
 * Returns a new promise which resolves the axios response body or rejects with the error data.
 * @param {Promise} axiosPromise The Axios promise
 * @param {Object} [opts] The options
 * @param {Boolean} [opts.returnResponseHeaders] The flag to include the response headers in the returned payload under '_headers'
 */
export default function destructureAxiosReq(
  axiosPromise,
  opts = { returnResponseHeaders: false }
) {
  return new Promise((resolve, reject) => {
    axiosPromise.then(
      (response) => {
        if (opts.returnResponseHeaders) {
          resolve({ ...response.data, _headers: response.headers });
        } else {
          resolve(response.data);
        }
      },
      (error) => {
        if (error.response) {
          if (error.response.data) {
            if (error.response.data.error) {
              reject(error.response.data.error);
            } else {
              reject(error.response.data);
            }
          } else {
            reject(error.response);
          }
        } else {
          reject(error);
        }
      }
    );
  });
}
