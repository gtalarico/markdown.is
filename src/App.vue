<template>
  <div id="wrapper">
    <div id="nav">

    </div>
    <router-view class="container-view"/>
    <div id="footer">
      markdn.io | Copyright 2021
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      data: null
    }
  },
  async created() {
    // const user = "gtalarico"
    // const url = `https://raw.githubusercontent.com/${user}/${user}/main/README.md`
    // const response = await fetch(url)
    // this.data = await response.text()
  }
}
</script>

<style >
body {
  margin: 0;
  background-color: #2c3e50;
}
img {
  display: inline;
}
#wrapper {
  margin: 0;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  justify-items: center;
  flex-direction: column;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
.container-view {
  background-color: #fff;
  height: 100%;
  padding: 4rem 4rem;
  box-shadow: 0 0 30px 10px rgba(0,0,0,0.3);
  border: 1px solid #aaa;
}

#nav {
  height: 60px;
  display: flex;
  justify-content: right;
}

#footer {
  font-size: .85rem;
  text-align: center;
  padding: 1rem;
}

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}

</style>
