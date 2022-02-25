<template>
  <n-grid cols="24">
    <n-gi span="2"></n-gi>
    <n-gi span="20">
      <n-card>
        <n-result
          :status="status"
          :title="title"
          size="huge"
          description="該檢測結果僅表示含有可能性"
        >
          <template #footer>
            <n-space vertical align="start" wrap>
              <div>您將前往：{{ sourceUrl }}</div>
              <div>
                安全性檢測結果：<n-tag :type="type">
                  {{ checkResult }}
                </n-tag>
              </div>
            </n-space>
            <n-space justify="end" style="margin-top: 30px">
              <n-button @click="gotoHomePage">回Thrurl</n-button>
              <n-button :type="type" @click="gotoSourceUrl">繼續前往</n-button>
            </n-space>
          </template>
        </n-result>
      </n-card>
    </n-gi>
    <n-gi span="2"></n-gi>
  </n-grid>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { thrurlHost, getRedirectAPI, recordClickInfoAPI, checkUrlSafeAPI } from "../api/main";
export default {
  name: "Redirect",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const axios = require("axios");
    const sourceUrl = ref("");
    const title = ref("Thrurl貼心提醒");
    const status = ref("info");
    const type = ref("info");
    const checkResult = ref("");
    const trackerID = ref("");
    onMounted(() => {
      trackerID.value = route.params.trackerID;
      axios
        .get(
          thrurlHost + getRedirectAPI +
            trackerID.value
        )
        .then((result) => {
          if (result.data.result_code === 1010) {
            // console.log(result.data.data.source_url);
            sourceUrl.value = result.data.data.source_url;
          }
        })
        .then(() => {
          axios
            .get(
              thrurlHost + checkUrlSafeAPI +
                sourceUrl.value
            )
            .then((result) => {
              if (result.data.data.result) {
                status.value = "warning";
                type.value = "warning";
                checkResult.value = "欲前往網站可能含有惡意成份";
              } else {
                checkResult.value = "通過";
              }
            });
        });
    });

    function gotoHomePage() {
      router.push({ path: "/" });
    }

    async function gotoSourceUrl() {
      await axios.get(
        thrurlHost + recordClickInfoAPI + trackerID.value
      ).then(()=>{
          window.location = sourceUrl.value
      });
    }

    return {
      title,
      status,
      sourceUrl,
      type,
      checkResult,
      gotoHomePage,
      gotoSourceUrl
    };
  },
};
</script>

<style></style>
