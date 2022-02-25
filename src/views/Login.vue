<template>
  <Header />
  <n-grid :cols="24">
    <n-gi span="1"></n-gi>
    <n-gi span="22">
      <n-card title="Thrurl會員中心">
        <n-tabs
          default-value="signin"
          size="large"
          justify-content="space-evenly"
        >
          <n-tab-pane name="signin" tab="登入">
            <SignIn />
          </n-tab-pane>
          <n-tab-pane name="signup" tab="註冊">
            <SignUp />
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </n-gi>
    <n-gi span="1"></n-gi>
  </n-grid>
</template>

<script>
import Header from "@/components/Header.vue";
import SignIn from "@/components/SignIn.vue";
import SignUp from "@/components/SignUp.vue";
export default {
  name: "Login",
  components: { Header, SignUp, SignIn },
};
</script>

<style></style>
