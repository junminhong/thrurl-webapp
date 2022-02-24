<template>
  <Header />
  <n-space vertical :size="12">
    <n-data-table
      :bordered="true"
      :columns="columns"
      :data="data"
      :pagination="pagination"
    />
  </n-space>
  <n-space style="margin-top: 30px" justify="center">
    <n-pagination
      :v-model:page="page"
      :page-count="pageSize"
      :on-update:page="refreshTable"
    />
  </n-space>
</template>

<script>
import Header from "@/components/Header.vue";
import { onMounted, reactive, h, defineComponent, ref, nextTick } from "vue";
import { NButton, NSwitch, NInput, useMessage } from "naive-ui";
import { useCookies } from "vue3-cookies";
import { useRouter } from "vue-router";
export default {
  name: "DataCenter",
  components: { Header },
  setup() {
    // const dd = ref("");
    const message = useMessage();
    const pagination = ref(false);
    const pageSize = ref(1);
    const page = ref(1);
    const router = useRouter();

    const createColumns = ({ clickInfo, handleChange }) => {
      return [
        {
          title: "ID",
          key: "trackerID",
        },
        {
          title: "來源A",
          key: "sourceA",
          ellipsis: {
            tooltip: true,
          },
          render(row) {
            return h(ShowOrEdit, {
              value: row.sourceA,
              onUpdateValue(v) {
                if (v !== "") {
                  row.sourceA = v;
                } else {
                  row.sourceA = "無";
                }
              },
            });
          },
        },
        {
          title: "來源B",
          key: "sourceB",
          ellipsis: {
            tooltip: true,
          },
          render(row) {
            return h(ShowOrEdit, {
              value: row.sourceB,
              onUpdateValue(v) {
                if (v !== "") {
                  row.sourceB = v;
                } else {
                  row.sourceB = "無";
                }
              },
            });
          },
        },
        {
          title: "AB測試機率",
          key: "abPercent",
          render(row) {
            return h(ShowOrEdit, {
              value: row.abPercent,
              onUpdateValue(v) {
                if (v !== "") {
                  if (v >= 100) {
                    row.abPercent = 100;
                  } else if (v <= 0) {
                    row.abPercent = 0;
                  } else {
                    row.abPercent = v;
                  }
                } else {
                  row.abPercent = "0";
                }
              },
            });
          },
        },
        {
          title: "成效記錄",
          key: "whoClick",
          render(row) {
            return h(NSwitch, {
              value: row.whoClick,
              onUpdateValue: (value) => handleChange(row, value),
            });
          },
        },
        {
          title: "Action",
          key: "actions",
          render(row) {
            return h(
              NButton,
              {
                strong: true,
                tertiary: true,
                size: "small",
                onClick: () => clickInfo(row),
              },
              { default: () => "成效報告" }
            );
          },
        },
      ];
    };
    const ShowOrEdit = defineComponent({
      props: {
        value: [String, Number],
        onUpdateValue: [Function, Array],
      },
      setup(props) {
        const isEdit = ref(false);
        const inputRef = ref(null);
        const inputValue = ref(props.value);
        function handleOnClick() {
          isEdit.value = true;
          nextTick(() => {
            inputRef.value.focus();
          });
        }
        function handleChange() {
          props.onUpdateValue(inputValue.value);
          console.log("a");
          isEdit.value = false;
        }
        return () =>
          h(
            "div",
            {
              onClick: handleOnClick,
            },
            isEdit.value
              ? h(NInput, {
                  ref: inputRef,
                  value: inputValue.value,
                  onUpdateValue: (v) => {
                    inputValue.value = v;
                  },
                  onChange: handleChange,
                  onBlur: handleChange,
                })
              : props.value
          );
      },
    });
    const data = reactive([]);
    const dataTmp = reactive([]);
    const axios = require("axios");
    const { cookies } = useCookies();
    onMounted(() => {
      refreshTable()
    });
    function refreshTable(page) {
      axios
        .get("http://127.0.0.1:9220/api/v1/short-url/list?limit=10&offset=" + 10*(page-1), {
          headers: {
            Authorization: "Bearer " + cookies.get("atomic_token"),
          },
        })
        .then((result) => {
          pageSize.value = result.data.data.page;
          result.data.data.short_url_list.forEach(function (value) {
            const shortUrlInfo = {
              trackerID: value.tracker_id,
              sourceA: value.source_url_a,
              anotherSourceA: value.source_url_a,
              sourceB: value.source_url_b,
              anotherSourceB: value.source_url_b,
              abPercent: value.ab_percent,
              whoClick: value.who_click,
            };
            dataTmp.push(shortUrlInfo);
          });
          data.length = 0;
          Object.assign(data, dataTmp);
          dataTmp.length = 0;
        });
    }
    return {
      columns: createColumns({
        clickInfo(row) {
          message.info(`Play ${row.trackerID}`);
          console.log(row);
          const trackerID = row.trackerID;
          router.push({ path: "/click-info", query: { trackerID } });
        },
        handleChange(row, value) {
          message.info(`${row.trackerID} Update value: ${value}`);
          row.whoClick = !row.whoClick;
        },
      }),
      data,
      dataTmp,
      pagination,
      page,
      pageSize,
      refreshTable,
    };
  },
};
</script>

<style></style>
