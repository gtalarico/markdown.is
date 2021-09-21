import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import DOMPurify from 'dompurify'
import MarkdownIt from 'markdown-it'

import 'github-markdown-css/github-markdown.css';
import './styles/app.css';

const app = createApp(App)
app.config.globalProperties.$sanitize = DOMPurify.sanitize
app.config.globalProperties.$md = MarkdownIt('commonmark')
app.use(router).mount('#app')
