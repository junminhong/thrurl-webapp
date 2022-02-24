<template>
  <Header />
  <div style="margin-top: 30px">
    <n-grid :cols="24">
      <n-gi span="2"></n-gi>
      <n-gi span="20">
        <n-card title="Thrurl - 最好用的短網址服務">
          <template #cover>
            <n-image
              width="100"
              height="300"
              src="https://img.freepik.com/free-vector/coming-soon-sale-template-hand-drawn-style_23-2149008590.jpg?t=st=1645698748~exp=1645699348~hmac=caa06594138754c86b8100b4f34966cc77fe08210747ba190c54fe4d6f502200&w=1380"
            />
          </template>
          <n-tabs
            default-value="shorten-url"
            size="large"
            justify-content="space-evenly"
          >
            <n-tab-pane name="shorten-url" tab="短網址">
              <ShortUrlPane />
            </n-tab-pane>
            <n-tab-pane name="developer-talk" tab="開發者的話">
              痾...就一個好用的開源服務？
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </n-gi>
      <n-gi span="2"></n-gi>
    </n-grid>
  </div>
</template>

<script>
import ShortUrlPane from "@/components/ShortUrlPane.vue";
import Header from "@/components/Header.vue";
export default {
  name: "Home",
  components: { ShortUrlPane, Header },
};
</script>
<style>
.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
}
</style>
