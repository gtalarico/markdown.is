import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// This adds support for dark, but markdown.is does not yet
// /* <link href="https://cdn.jsdelivr.net/gh/hyrious/github-markdown-css/github-markdown.css" rel="stylesheet"></link> */}
import './styles/app.css'
import 'github-markdown-css/github-markdown.css'

const app = createApp(App)
app.use(router).mount('#app')

