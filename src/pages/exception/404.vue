<template>
  <div class="flex flex-col justify-center page-container">
    <div class="text-center" >
      <n-result
        status="404"
        description="非常抱歉，您访问的页面没有找到..."
        v-permission='200'
      >
        <template #footer>
          <n-button type="info" @click="goHome">回到首页</n-button>
        </template>
      </n-result>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
function goHome() {
  router.push("/");
}
</script>

<style lang="scss" scoped>
.page-container {
  width: 100%;
  border-radius: 4px;
  padding: 50px 0;
  // min-height: calc(90vh - (80px));
  text-align: center;
  bottom: 20px;
  .text-center {
    h1 {
      color: #666;
      padding: 20px 0;
    }
  }

  img {
    width: 350px;
    margin: 0 auto;
  }
}
</style>
