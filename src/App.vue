<template>
  <div class="mx-auto w-screen p-4">
    <router-view class="mx-auto container shadow-xl p-16 mt-2" style="background-color: white" />

    <div class="mx-auto container h-12 mt-4 relative">
      <a class="absolute left-0" href="https://github.com/gtalarico/markdown.is">
        <span class="leading-12">
          <img class="inline h-4 align-middle" src="@/assets/social-github.svg" alt="Github Icon" />
          <span class="align-middle ml-1 no-underline">gtalarico/markdown.is</span>
        </span>
      </a>
      <a class="font-serif absolute right-0 no-underline" href="/"># markdown.is</a>
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
