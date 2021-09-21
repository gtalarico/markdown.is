<template>
  <div class="mx-auto w-screen">
    <!-- <div id="nav"></div> -->
    <router-view class="mx-auto container shadow-xl p-16 bg-white" />
    <div class="mx-auto container h-12">markdn.io | Copyright 2021</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      data: null,
    }
  },
  async created() {},
}
</script>

<style lang="postcss"></style>
