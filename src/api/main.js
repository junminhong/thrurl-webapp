// import { useCookies } from "vue3-cookies";

export const thrurlHost = "http://127.0.0.1:9220";
export const thrurlWebHost = "http://127.0.0.1:8080";
export const memberHost = "http://127.0.0.1:9200";
export const loginAPI = "/api/v1/member/login";
export const shortenUrlAPI = "/api/v1/short-url";
export const getMemberInfoAPI = "/api/v1/member/profile";
export const shortUrlAPI = "/api/v1/short-url";
export const getShortUrlListAPI = "/api/v1/short-url/list?limit=10&offset=";
export const getClickInfoAPI = "/api/v1/short-url/click-info?tracker-id=";
export const getRedirectAPI = "/api/v1/short-url/redirect?tracker-id=";
export const recordClickInfoAPI = "/api/v1/url/record?tracker-id=";
export const checkUrlSafeAPI = "/api/v1/url/check-safe?source-url=";
// const { cookies } = useCookies();
const axios = require("axios");

export async function loginHandler(email, password) {
  await axios
    .post(
      memberHost + loginAPI,
      {
        email: email.value,
        password: password.value,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((result) => {
      console.log(result);
      return result.data.result_code;
    });
}
