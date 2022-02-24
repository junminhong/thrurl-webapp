<template>
  <n-form>
    <n-form-item-row label="信箱">
      <n-input
        type="text"
        placeholder="請輸入信箱"
        v-model:value="email"
        :maxlength="30"
      />
    </n-form-item-row>
    <n-form-item-row label="密碼">
      <n-input
        type="password"
        show-password-on="click"
        placeholder="請輸入密碼"
        :maxlength="20"
        v-model:value="password"
      />
    </n-form-item-row>
  </n-form>
  <n-button type="info" bordered circle block strong @click="Login">
    登入
  </n-button>
</template>

<script>
import { ref } from "vue";
import { useCookies } from "vue3-cookies";
import { useRouter } from "vue-router";
import { useDialog } from "naive-ui";

export default {
  name: "SignIn",
  setup() {
    const email = ref("");
    const password = ref("");
    const axios = require("axios");
    const { cookies } = useCookies();
    const router = useRouter();
    const dialog = useDialog();
    function gotoHome() {
      dialog.destroyAll();
      router.push("/");
    }
    async function Login() {
      await axios
        .post("http://127.0.0.1:9200/api/v1/member/login", {
          email: email.value,
          password: password.value,
        })
        .then((result) => {
          if (result.data.result_code === 1007) {
            console.log(result.data);
            cookies.set("atomic_token", result.data.data.atomic_token, "4h");
            cookies.set(
              "refresh_atomic_token",
              result.data.data.refresh_atomic_token,
              "24h"
            );
            dialog.success({
              title: "Thrurl會員中心",
              content: "登入成功，正在為你跳轉",
              loading: true
            });
            window.setTimeout(gotoHome, 1000);
          } else {
            dialog.error({
              title: "Thrurl會員中心",
              content: "登入失敗，請確保帳號正確",
               loading: true
            });
          }
        });
      email.value = "";
      password.value = "";
    }
    return {
      email,
      password,
      Login,
    };
  },
};
</script>

<style></style>
