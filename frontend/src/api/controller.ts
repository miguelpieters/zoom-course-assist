import axios, {AxiosInstance} from "axios";

export default class Controller {

  protected static client: AxiosInstance;

  static setup() {
    this.client = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/api/v1/` });

    this.client.interceptors.request.use(config => {
        const token = localStorage.getItem("token") || "";

        if (token.length > 0)
          config.headers['Authorization'] = 'Token ' + token;

        return Promise.resolve(config);
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      response => response,
      async error => {
        // Reject promise if usual error
        if (error.response.status !== 401) {
          return Promise.reject(error);
        }

        /*
         * When response code is 401, try to refresh the token.
         * Eject the interceptor so it doesn't loop in case
         * token refresh causes the 401 response
         */
        //axios.interceptors.response.eject(interceptor);
        return Promise.reject(error);
      }
    )
  }
}
