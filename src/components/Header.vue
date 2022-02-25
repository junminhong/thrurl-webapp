<template>
  <div style="background-color: white">
    <n-grid cols="24">
      <n-gi span="1"></n-gi>
      <n-gi span="2">
        <n-space justify="end">
          <h1 @click="gotoHome">Thrurl</h1>
        </n-space>
      </n-gi>
      <n-gi span="16"> </n-gi>
      <n-gi span="4">
        <n-space style="margin-top: 15px" justify="end" align="center">
          <n-button
            size="large"
            v-if="nickName === ''"
            strong
            @click="gotoLogin"
            >登入</n-button
          >
          <n-dropdown
            v-if="nickName !== ''"
            @select="getMenuSelect"
            :options="options"
          >
            <h3>Hello, {{ nickName }}</h3>
          </n-dropdown>
        </n-space>
      </n-gi>
      <n-gi span="1"></n-gi>
    </n-grid>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import { memberHost, getMemberInfoAPI } from "../api/main";
export default {
  name: "Header",
  setup() {
    const router = useRouter();
    const { cookies } = useCookies();
    const axios = require("axios");
    const nickName = ref("");
    const options = reactive([
      {
        label: "資料中心",
        key: "data center",
      },
      {
        type: "divider",
        key: "d1",
      },
      {
        label: "登出",
        key: "logout",
      },
    ]);
    function gotoLogin() {
      router.push("/login");
    }
    function gotoHome() {
      router.push("/");
    }
    function getMenuSelect(key) {
      console.log(key);
      switch (key) {
        case "logout":
          cookies.remove("atomic_token");
          cookies.remove("refresh_atomic_token");
          nickName.value = "";
          router.push("/");
          break;
        case "data center":
          router.push("/data-center");
          break;
      }
    }
    onMounted(() => {
      axios
        .get(memberHost + getMemberInfoAPI, {
          headers: {
            Authorization: "Bearer " + cookies.get("atomic_token"),
          },
        })
        .then((result) => {
          if (result.data.result_code === 1015) {
            nickName.value = result.data.data.nick_name;
          }
        });
    });
    return {
      gotoLogin,
      gotoHome,
      nickName,
      options,
      getMenuSelect,
    };
  },
};
</script>

<style></style>
