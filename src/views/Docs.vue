<template>
  <div class="home">
    <h1 class="font-serif mb-12">
      <a href="/" class="no-underline"># markdown.is</a>
    </h1>

    <h2>what is this</h2>
    <p>
      <strong>markdown.is</strong>
      is a simple website that fetches markdown files from github and renders them as html. The
      initial motivation for this was to be able to view a github profile README.md as a website,
      without taking the visitor to Github. e.g.
      <a href="https://markdown.is/gh/gtalarico">markdown.is/gh/gtalarico</a>
      renders
      <a href="https://github.com/gtalarico/gtalarico/README.md">
        github.com/gtalarico/gtalarico/README.md
      </a>
    </p>

    <h2 class="mt-10">what can I use this for?</h2>
    <ul>
      <li>User your github profile as a website on your bio</li>
      <li>Use any Markdown files on github as a static website</li>
    </ul>

    <h2 class="mt-10">about the url</h2>
    <h3>defaults</h3>
    <p>
      By default, we attempt to render the github profile page of the provided username. For
      example,
      <a href="https://markdown.is/gh/gtalarico">markdown.is/gh/gtalarico</a>
      will render
      <a href="https://github.com/gtalarico/gtalarico/main/README.md">
        github.com/gtalarico/gtalarico/main/README.md
      </a>
    </p>
    <h3>other repositories</h3>
    <p>
      To render files in other repositories, just append it to the url. For example,
      <a href="https://markdown.is/gh/gtalarico/pyairtable">markdown.is/gh/gtalarico/pyairtable</a>
      will render
      <a href="https://github.com/gtalarico/pyairtable/main/README.md">
        github.com/gtalarico/pyairtable/main/README.md
      </a>
    </p>
    <h3>branch</h3>
    <p>
      If you want render a different branch name, you can provide the name using the query param
      `branch`:
      <a href="https://markdown.is/gh/gtalarico/pm?branch=master">
        markdown.is/gh/gtalarico/pm?branch=master
      </a>
    </p>

    <h2 class="mt-10">custom urls</h2>
    <h3>alias</h3>
    <p>
      You can create custom alias by submitting a PR and adding your alias to
      <a href="https://github.com/gtalarico/markdown.is/edit/main/src/config.json">
        src/config.json
      </a>

      . The approval of new aliasas is done at the discretion of project maintainers. For example
      adding
      <code>"/gui": "/gh/gtalarico/gtalarico"</code>
      to the config file will allow the profile page of username gtalarico to be available at
      markdown.is/gui
    </p>
    <h2 class="mt-10">url redirects</h2>
    <p>
      You can configure your own domain to redirect to your markdown.is page. For example,
      <a href="https://gui.is">https://gui.is</a>
      redirects to
      <a href="https://markdown.is/gui">https://markdown.is/gui</a>
    </p>

    <h2 class="mt-10">styling (beta)</h2>
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
