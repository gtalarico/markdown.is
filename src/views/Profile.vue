<template>
  <div class="markdown-body">
    <ProgressBar :isLoading="isLoading"></ProgressBar>
    <div v-if="readme" v-html="readme"></div>
  </div>
</template>

<script>
import ProgressBar from '../components/ProgressBar.vue'
export default {
  name: 'App',
  props: ['username', 'reponame'],
  components: { ProgressBar },
  data() {
    return {
      readme: null,
      isLoading: true,
    }
  },
  mounted() {
    console.log(this.$route.params)
  },
  async created() {
    const [username, reponame] = [this.username, this.reponame]
    const path = reponame ? `${username}/${reponame}` : `${username}/${username}`
    const branch = this.$route.query.branch || 'main'
    const filename = this.$route.query.filename || 'README.md'

    const mdUrl = `https://raw.githubusercontent.com/${path}/${branch}/${filename}`
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
    this.isLoading = false
  },
}
</script>

<style></style>
