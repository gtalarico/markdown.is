const fetch = require('node-fetch')
const GITHUB_TOKEN = process.env.VUE_APP_GITHUB_TOKEN

const handler = async function (event, context) {
  if (!GITHUB_TOKEN) {
    return {
      statusCode: 503,
      body: "Github Token not set",
    }
  }
  const body = event.body
  try {
    const response = await fetch(
      'https://api.github.com/markdown/raw',
      {
        method: 'POST',
        headers: { "Content-Type": "text/plain", "Authorization": `token ${GITHUB_TOKEN}` },
        body: body
      }
    )
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.text()
    return {
      statusCode: 200,
      body: data,
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error }),
    }
  }
}

module.exports = { handler }
