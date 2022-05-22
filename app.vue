<template>
  <div @click="test">
    <NuxtWelcome />
  </div>
</template>

<script>
import consolaGlobalInstance from "consola";

export default {
  methods: {
    async test() {
      const ay = await $fetch("/api/hello");
      console.log("🚀 ~ ay", ay);
    },
  },
};
</script>
