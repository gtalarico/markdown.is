<template>
  <div class="home">
    <h1 class="font-serif"># markdown.is</h1>

    <div class="mt-10 pt-0">
      <form class="flex flex-wrap gap-3 w-full" @submit="goToPath()">
        <label class="relative w-full flex flex-col">
          <span class="font-bold mb-3">Github Username</span>
          <input
            v-model="username"
            @blur="isEditingUsername = false"
            @focus="isEditingUsername = true"
            class="
              rounded-md
              peer
              pl-12
              pr-2
              py-2
              border-2 border-gray-200
              placeholder-gray-300
              focus:outline-none
              focus:border-black
            "
            type="text"
            name="username"
            placeholder="Username"
          />
          <img
            src="@/assets/social-github.svg"
            class="
              absolute
              bottom-0
              left-0
              -mb-0.5
              transform
              translate-x-1/2
              -translate-y-1/2
              text-black
              peer-placeholder-shown:text-gray-300
              h-6
              w-6
            "
          />
        </label>
        <label class="relative w-full flex flex-col" v-if="username">
          <span class="font-bold mb-3">Repo</span>
          <input
            v-model="reponame"
            placeholder="Repo (optional)"
            @blur="isEditingUsername = false"
            @focus="isEditingUsername = true"
            class="
              rounded-md
              peer
              pl-12
              pr-2
              py-2
              border-2 border-gray-200
              placeholder-gray-300
              focus:outline-none
              focus:border-black
            "
            type="text"
            name="reponame"
          />
          <img
            src="@/assets/fork.svg"
            class="
              absolute
              bottom-0
              left-0
              -mb-0.5
              transform
              translate-x-1/2
              -translate-y-1/2
              text-black
              peer-placeholder-shown:text-gray-300
              h-6
              w-6
            "
          />
        </label>
        <div :class="{ 'mt-0 opacity-0 pointer-events-none': !username }">
          <button
            type="submit"
            class="
              mt-8
              bg-black
              hover:bg-gray-600
              font-semibold
              text-white
              hover:text-white
              py-2
              px-4
              border-none
              rounded
            "
          >
            Render
          </button>
          <div class="mt-6 bg-gray-50 py-4 px-4 overflow-scroll rounded flex">
            <img src="@/assets/target.svg" class="inline h-6" />
            <a :href="`https://${pagePath}`" class="inline">
              <span class="ml-2 text-sm font-mono text-gray-600">{{ pagePath }}</span>
            </a>
          </div>
        </div>
      </form>
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
        `/blob` +
        `/main` +
        `/README.md`
      )
    },
  },
  methods: {
    goToPath() {
      if (this.reponame) {
        this.$router.push({
          name: 'GithubRepo',
          params: { username: this.username, reponame: this.reponame },
        })
      } else {
        this.$router.push({
          name: 'GithubProfile',
          params: { username: this.username },
        })
      }
    },
  },
}
</script>
