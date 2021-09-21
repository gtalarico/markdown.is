<template>
  <div class="markdown-body">
    <div v-if="readme" v-html="readme"></div>
  </div>
</template>

<script>
// import Loader from '../components/Loader.vue'

export default {
  name: 'App',
  props: ['username', 'reponame'],
  // components: { Loader },
  data() {
    return {
      readme: null,
    }
  },
  mounted() {
    console.log(this.$route.params)
  },
  async created() {
    const [username, reponame] = [this.username, this.reponame]
    const path = reponame ? `${username}/${reponame}` : `${username}/${username}`
    const branch = this.$route.query.branch || 'main'
    // debugger
    const mdUrl = `https://raw.githubusercontent.com/${path}/${branch}/README.md`
    const cssUrl = `https://raw.githubusercontent.com/${path}/${branch}/readme.css`

    const [mdResult, cssResult] = await Promise.allSettled([fetch(mdUrl), fetch(cssUrl)])
    const md = mdResult.value.status === 200 ? await mdResult.value.text() : null
    const css = cssResult.value.status === 200 ? await cssResult.value.text() : null

    if (md) {
      this.readme = this.$md.render(this.$sanitize(md))

      if (css) {
        const style = document.createElement('style')
        style.textContent = css
        document.head.append(style)
      }
    }
  },
}
</script>

<style></style>
