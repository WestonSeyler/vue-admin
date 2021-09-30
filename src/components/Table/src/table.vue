<template>
  <!-- <div></div> -->
  <div class="tableAction">
    <div class="flex items-center justify-center">
      <template v-for="(action, index) in []" :key="`${index}-${action.label}`">
        <n-button v-bind="action" class="mx-2">{{ action.label }}</n-button>
      </template>
      <n-dropdown trigger="hover" @select="handleSelect" :options="options">
        <n-button>找个地方休息</n-button>
      </n-dropdown>
    </div>
  </div>
</template>
<script lang='ts' setup>
const options = [
  {
    label: "滨海湾金沙，新加坡",
    key: "marina bay sands",
    disabled: true,
  },
  {
    label: "布朗酒店，伦敦",
    key: "brown's hotel, london",
  },
  {
    label: "亚特兰蒂斯巴哈马，拿骚",
    key: "atlantis nahamas, nassau",
  },
  {
    label: "比佛利山庄酒店，洛杉矶",
    key: "the beverly hills hotel, los angeles",
  },
];
const handleSelect = (key) => {
  //   window["$message"].success(
  //     "Cause you walked hand in hand With another man in my place"
  //   );
};
</script>