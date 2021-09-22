<template>
  <!-- <progress class="progress-bar" max="100" :value="value">test</progress> -->
  <p v-if="isLoading">Loading</p>
  <!-- <progress class="relative pt-1">
    <div class="overflow-hidden h-2 mb-4 text-xs flex bg-gray-300">
      <div
        :style="`width: ${value}%`"
        class="
          transition-all
          shadow-none
          flex flex-col
          text-center
          whitespace-nowrap
          text-white
          justify-center
          bg-black
        "
      ></div>
    </div>
  </progress> -->
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    isLoading: {
      type: Boolean,
    },
  },
  data() {
    return {
      value: 0,
    }
  },
  created() {
    this.value = this.isLoading ? 100 : 0
    setInterval(() => {
      if (this.value >= 100) {
        this.value = 0
      } else {
        this.value = +this.value + 5
      }
    }, 100)
  },
}
</script>
<style scoped>
</style>
