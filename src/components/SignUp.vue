<template>
  <n-form>
    <n-form-item-row label="信箱">
      <n-auto-complete
        v-model:value="autoCompleteValue"
        :options="autoCompleteOptions"
        type="text"
        placeholder="請輸入信箱"
        :maxlength="30"
      />
    </n-form-item-row>
    <n-form-item-row label="密碼">
      <n-input
        type="password"
        show-password-on="click"
        placeholder="請輸入密碼"
        :maxlength="20"
      />
    </n-form-item-row>
    <n-form-item-row label="重複密碼">
      <n-input
        type="password"
        show-password-on="click"
        placeholder="請輸入密碼"
        :maxlength="20"
      />
    </n-form-item-row>
  </n-form>
  <n-space justify="start" align="center"> <n-switch size="large"></n-switch>已閱讀會員政策</n-space>
  <n-button type="info" block strong style="margin-top:30px"> 註冊 </n-button>
</template>

<script>
import { ref, computed } from "vue";
export default {
  name: "SignUp",
  setup() {
    const autoCompleteValue = ref("");

    return {
      autoCompleteValue,
      autoCompleteOptions: computed(() => {
        return ["@gmail.com"].map((suffix) => {
          const prefix = autoCompleteValue.value.split("@")[0];
          return {
            label: prefix + suffix,
            value: prefix + suffix,
          };
        });
      }),
    };
  },
};
</script>

<style></style>
