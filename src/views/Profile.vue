<template>
  <div class="markdown-body">
    <div v-if="readme" v-html="readme"></div>
  </div>
</template>

<script>
// import Loader from '../components/Loader.vue'

export default {
  name: 'App',
  props: ['username'],
  // components: { Loader },
  data() {
    return {
      readme: null,
    }
  },
  async created() {
    const user = 'gtalarico'
    const url = `https://raw.githubusercontent.com/${user}/${user}/main/README.md`
    const response = await fetch(url)
    this.readme = this.$md.render(this.$sanitize(await response.text()))
  },
}
</script>

<style></style>
