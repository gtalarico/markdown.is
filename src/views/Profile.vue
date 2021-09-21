<template>
  <div class="markdown-body">
    <div v-html="readme"></div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      readme: null
    }
  },
  props: ["username"],
  async created() {
    const user = "gtalarico"
    const url = `https://raw.githubusercontent.com/${user}/${user}/main/README.md`
    const response = await fetch(url)
    // this.$sanitize(
    this.readme =
      this.$md.render(
        await response.text()
      )
  }
}
</script>

<style>

</style>
