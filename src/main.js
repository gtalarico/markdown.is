import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import DOMPurify from 'dompurify'
import MarkdownIt from 'markdown-it'

import 'github-markdown-css/github-markdown.css'
// This adds support for dark, but markdown.is does not yet
// /* <link href="https://cdn.jsdelivr.net/gh/hyrious/github-markdown-css/github-markdown.css" rel="stylesheet"></link> */}
import './styles/app.css'

const app = createApp(App)
app.config.globalProperties.$sanitize = DOMPurify.sanitize
app.config.globalProperties.$md = MarkdownIt('commonmark')
app.use(router).mount('#app')
