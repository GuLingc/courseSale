<script setup lang="ts">
import AppHeader from "@/components/appHeader.vue";
import AppFooter from "@/components/appFooter.vue";
</script>
<template>
  <AppHeader></AppHeader>
  <router-view :key="$route.fullPath"></router-view>
  <AppFooter></AppFooter>
</template>

<style scoped lang="scss"></style>
