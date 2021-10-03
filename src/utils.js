import DOMPurify from 'dompurify'
import MarkdownIt from 'markdown-it'
import MarkdownItTasks from 'markdown-it-task-lists'
import MarkdownItAnchor from 'markdown-it-anchor'

export const renderMarkdownLocal = markdown => {
    // DOMPurify.sanitize
    const md = MarkdownIt()
        .use(MarkdownItTasks)
    // .use(MarkdownItAnchor)

    return md.render(markdown)
}

export const renderMarkdownRemote = async markdown => {
    const response = await fetch(
        "/.netlify/functions/github-markdown",
        {
            method: "POST",
            body: markdown,
            headers: { "Content-Type": "text/plain" }
        }
    )
    try {
        const html = response.text()
        return html
    } catch (e) {
        console.error(e)
        return ""
    }
}

// process html markup for rendering
export const processMarkup = (htmlMarkup, username, reponame, branch) => {
    const context = { username, reponame, branch }
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlMarkup, 'text/html')
    const middlewares = [
        fixRelativeImagePaths,
        fixRelativePaths,
        addMediaPlayer,
        addAnchors,
    ]
    const reducer = (prev, fn) => fn(prev, context)
    const processedDoc = middlewares.reduce(reducer, doc)
    // dom parser adds html & body so we strip back out
    return processedDoc.body.innerHTML
}

// Swaps out <a> where target is an mp4 with a video player
const addMediaPlayer = (dom, context) => {
    const newdom = dom.cloneNode(true)
    dom.querySelectorAll('a').forEach((node) => {
        let href = node.attributes.href.value
        if (href.endsWith('mp4')) {
            const video = document.createElement('video');
            video.src = href
            video.width = "640"
            video.height = "264"
            video.autoplay = false;
            video.controls = true;
            node.parentElement.replaceChild(video, node)
        }
    })
    return dom
}

// Swaps out relative paths to full github absolute URL
const fixRelativeImagePaths = (dom, context) => {
    const newdom = dom.cloneNode(true)
    dom.querySelectorAll('img').forEach((node) => {
        let imgPath = node.attributes.src.value
        if (!imgPath.startsWith('http') & !imgPath.startsWith('//')) {
            const newUrl = `https://raw.githubusercontent.com/${context.username}/${context.reponame}/${context.branch}/${imgPath}`
            node.src = newUrl
        }
    })
    return dom
}

// Fix Relative Paths
const fixRelativePaths = (dom, context) => {
    const newdom = dom.cloneNode(true)
    dom.querySelectorAll('a').forEach((node) => {
        let href = node.attributes.href.value || ""
        // Matches all relative targets
        // https://stackoverflow.com/questions/10687099/how-to-test-if-a-url-string-is-absolute-or-relative
        if (!href.match(/(?:^[a-z][a-z0-9+.-]*:|\/\/|^#)/g)) {
            if (href.match(/.md$/g)) {
                // md - link to markdown.is version
                node.href = `/gh/${context.username}/${context.reponame}/${href}`
            } else {
                // not md - link to github
                node.href = `https://github.com/${context.username}/${context.reponame}/blob/${context.branch}` + (href.startsWith('/') ? href : `/${href}`)
            }
        }
    })
    return dom
}

const addAnchors = (dom, context) => {
    `
    <h3>
        <a id="user-content-demo" class="anchor" href="#demo" aria-hidden="true">
            <span aria-hidden="true" class="octicon octicon-link">
            </span>
        </a>
        Demo
    </h3>`

    for (const h of dom.querySelectorAll('h1, h2, h3, h4, h5, h6')) {
        const slug = h.getAttribute('id') || slugify(h.textContent)
        h.setAttribute('id', slug)
        const el = `
            <a id="user-content-demo" class="anchor" href="#${slug}" aria-hidden="true">
            <span aria-hidden="true" class="octicon octicon-link">
            </span>
            </a>`
        h.insertAdjacentHTML('afterbegin', el)
    }
    return dom

}


const slugify = (str) => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}
