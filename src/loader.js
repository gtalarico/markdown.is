

export const getGithubProfile = async username => {
    const url = `https://raw.githubusercontent.com/${username}/${username}/main/README.md`
    const response = await fetch(url)
    return this.$md.render(this.$sanitize(await response.text()))
}
