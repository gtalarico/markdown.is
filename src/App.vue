<template>
  <div class="mx-auto w-screen p-4">
    <!-- <div id="nav"></div> -->
    <router-view class="mx-auto container shadow-xl p-16 mt-16" style="background-color: white" />
    <div class="mx-auto container h-12">
      <div class="mt-4 w-auto">
        <a href="https://github.com/gtalarico/markdown.is">
          <img src="@/assets/social-github.svg" alt="" class="src" />
          gtalarico/markdown.is
        </a>
      </div>
    </div>
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
