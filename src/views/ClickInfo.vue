<template>
  <Header />
   <n-statistic label="記錄筆數">
        {{ clickAmount }}
      </n-statistic>
  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :bordered="false"
  />
</template>

<script>
import Header from "@/components/Header.vue";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useCookies } from "vue3-cookies";
export default {
  name: "ClickInfo",
  components: { Header },
  setup() {
    const clickAmount = ref(0);
    const pagination = ref(1);
    const route = useRoute();
    const { cookies } = useCookies();
    const axios = require("axios");
    const createColumns = () => {
      return [
        {
          title: "IP",
          key: "ip",
        },
        {
          title: "瀏覽器",
          key: "browser",
        },
        {
          title: "瀏覽器版本",
          key: "browser_version",
        },
        {
          title: "平台",
          key: "platform",
        },
        {
          title: "作業系統",
          key: "os",
        },
        {
          title: "記錄時間",
          key: "record_time",
        },
      ];
    };
    const data = reactive([]);
    onMounted(() => {
      axios
        .get(
          "http://127.0.0.1:9220/api/v1/short-url/click-info?tracker-id=" +
            route.query.trackerID,
          {
            headers: {
              Authorization: "Bearer " + cookies.get("atomic_token"),
            },
          }
        )
        .then((result) => {
          if (result.data.result_code === 1011) {
            result.data.data.short_url_click_info.forEach(function (value) {
              const shortUrlInfo = {
                ip: value.clicker_ip,
                browser: value.browser,
                browser_version: value.browser_version,
                platform: value.platform,
                os: value.os,
                record_time: formatDate(new Date(value.created_at)),
              };
              data.push(shortUrlInfo);
            });
            clickAmount.value = result.data.data.click_amount;
          }
          console.log(result.data);
        });
    });
    const formatDate = (current_datetime) => {
      let formatted_date =
        current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getDate() +
        " " +
        current_datetime.getHours() +
        ":" +
        current_datetime.getMinutes() +
        ":" +
        current_datetime.getSeconds();
      return formatted_date;
    };
    return {
      columns: createColumns(),
      data,
      pagination,
      clickAmount,
    };
  },
};
</script>

<style></style>
