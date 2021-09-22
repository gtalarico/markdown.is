<template>
  <div class="home">
    <h1 class="font-serif mb-12">
      <a href="/" class="no-underline"># markdown.is</a>
    </h1>

    <h3>what is this</h3>
    <p>
      <strong>markdown.is</strong>
      is a simple website that fetches markdown files from github and renders them as html. The
      initial motivation for this was to be able to view a github profile README.md as a website,
      without taking the user to Github. e.g.
      <a href="/gh/gtalarico">markdown.is/gh/gtalarico</a>
      renders
      <a href="https://github.com/gtalarico/gtalarico/README.md">
        github.com/gtalarico/gtalarico/README.md
      </a>
    </p>

    <h3 class="mt-10">what can I use this for?</h3>
    <ul>
      <li>User your github profile as a website on your bio</li>
      <li>Use any Markdown files on github as a static website</li>
    </ul>

    <h3 class="mt-10">about the url</h3>
    <h4>defaults</h4>
    <p>
      By default, we attempt to render the github profile page of the provided username. For
      example, `markdown.is/gh/gtalarico` will render
      <code>github.com/gtalarico/gtalarico/main/README.md</code>
    </p>
    <h4>other repositories</h4>
    <p>
      To render files in other repositories, just append it to the url. For example,
      `markdown.is/gh/gtalarico/pyairtable` will render
      <code>github.com/gtalarico/pyairtable/main/README.md</code>
    </p>
    <h4>branch</h4>
    <p>
      You can also provide other branch names using the query param `branch`.
      <code>markdown.is/gh/gtalarico?branch=master</code>
    </p>

    <h3 class="mt-10">custom urls</h3>
    <h4>alias</h4>
    <p>
      You can create custom alias by submitting a PR and adding your alias to
      <code>src/config.json</code>
      . The approval of new aliasas is done at the discretion of project maintainers. For example
      adding
      <code>"/gui": "/gh/gtalarico/gtalarico"</code>
      to the config file will allow the profile page of username gtalarico to be available at
      markdown.is/gui
    </p>
    <h3 class="mt-10">url redirects</h3>
    <p>
      You can configure your own domain to redirect to your markdown.is page. For example,
      https://gui.is redirects to https://markdown.is/gui
    </p>

    <h3 class="mt-10">styling (beta)</h3>
    <p>
      In addition to rendering your markdown, you can also apply a custom style. You can do so by
      adding a css file
      <code>README.css</code>
      next to your readme.
    </p>
    <p>
      You can provide a different filename through the query param
      <code>?cssFilename=style.css</code>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {}
  },
  computed: {},
}
</script>
