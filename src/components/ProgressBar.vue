<template>
  <div class="py-2 transition-opacity opacity-1" :class="{ 'opacity-0': !isLoading }">
    <div class="loader w-100 m-0 relative before:bg-gray-200">
      <div class="loaderBar"></div>
    </div>
  </div>
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
    return {}
  },
}
</script>
<style scoped>
/* TODO: Tailwind? */
.loader:before {
  content: '';
  background-color: #eee;
  position: absolute;
  width: 100%;
  height: 6px;
}
.loader .loaderBar {
  height: 6px;
  position: absolute;
  top: 0;
  right: 100%;
  bottom: 0;
  left: 0;
  background: black;
  width: 0;
  animation: borealisBar 2.25s linear infinite;
}

@keyframes borealisBar {
  0% {
    left: 0%;
    right: 100%;
    width: 0%;
  }
  10% {
    left: 0%;
    right: 75%;
    width: 25%;
  }
  90% {
    right: 0%;
    left: 75%;
    width: 25%;
  }
  100% {
    left: 100%;
    right: 0%;
    width: 0%;
  }
}
</style>
