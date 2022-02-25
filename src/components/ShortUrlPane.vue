<template>
  <n-input-group>
    <n-input-group-label>https://</n-input-group-label>
    <n-input placeholder="請輸入網址" v-model:value="sourceUrl" />
    <n-button type="primary" @click="shortenUrl">縮址</n-button>
  </n-input-group>
</template>

<script>
import { useDialog } from "naive-ui";
import { ref } from "vue";
import { useCookies } from 'vue3-cookies';
import { thrurlHost, thrurlWebHost, shortenUrlAPI } from "../api/main";
export default {
  name: "ShortUrlPane",
  setup() {
    const dialog = useDialog();
    const axios = require("axios");
    const sourceUrl = ref("");
    const { cookies } = useCookies();
    async function shortenUrl() {
      await axios
        .post(
          thrurlHost + shortenUrlAPI,
          {
            source_url: sourceUrl.value,
          },
          {
            headers: {
              Authorization: "Bearer " + cookies.get("atomic_token"),
            },
          }
        )
        .then((result) => {
          if (result.data.result_code === 1002) {
            dialog.success({
              title: "Thrurl",
              content: thrurlWebHost + "/" + result.data.data.shorten_url,
              positiveText: "複製",
            });
          } else {
            dialog.error({
              title: "Thrurl",
              content: "短連結生成失敗，請檢查網址是否正確！",
            });
          }
          sourceUrl.value = "";
        });
    }

    return {
      sourceUrl,
      shortenUrl,
    };
  },
};
</script>

<style></style>
