<template>
  <div class="home">
    <h1 class="font-serif"># markdown.is</h1>

    <div class="mt-10 pt-0">
      <div class="flex flex-row font-mono">
        <span>markdown.is/gh/</span>
        <input
          type="text"
          v-model="username"
          placeholder="username"
          :style="`width: ${usernameWidth}px`"
          @blur="isEditingUsername = false"
          @focus="isEditingUsername = true"
          class="
            transition-colors
            placeholder-gray-400
            gray-400
            relative
            bg-white
            outline-none
            focus:outline-none
          "
        />
        <span>/</span>
        <input
          type="text"
          v-model="reponame"
          :placeholder="isEditingUsername ? 'repo (optional)' : ''"
          class="
            transition-colors
            placeholder-gray-400
            gray-400
            relative
            bg-white
            outline-none
            focus:outline-none
          "
          :class="{ 'opacity-0': !username }"
        />
      </div>
      <div class="mt-2">
        <a
          :href="`gh/${username}/${reponame}`"
          class="transition-opacity text-sm"
          :class="{ 'mt-0 opacity-0 pointer-events-none': !username }"
        >
          <img src="@/assets/external-link.svg" class="inline h-4" />
          <span class="ml-2">View</span>
          <span class="ml-1">{{ pagePath }}</span>
        </a>
      </div>
    </div>

    <div class="mt-10">
      <router-link :to="{ name: 'Docs' }" tag="a">Docs</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      username: '',
      reponame: '',
      isEditingUsername: false,
    }
  },
  computed: {
    pagePath() {
      return (
        `github.com/${this.username}` +
        (this.reponame ? `/${this.reponame}` : `/${this.username}`) +
        `/main` +
        `/README.md`
      )
    },
    usernameWidth() {
      return (this.username.length || 'username'.length) * 9.5
    },
  },
}
</script>
