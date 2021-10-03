

export const renderMarkdown = async markdown => {
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
export const processMarkup = (htmlMarkup, repoPath, branch) => {
    const context = { repoPath, branch }
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlMarkup, 'text/html')
    const middlewares = [
        fixImgPaths,
        addMediaPlayer
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
const fixImgPaths = (dom, context) => {
    const newdom = dom.cloneNode(true)
    dom.querySelectorAll('img').forEach((node) => {
        let imgPath = node.attributes.src.value
        if (!imgPath.startsWith('http') & !imgPath.startsWith('//')) {
            const newUrl = `https://raw.githubusercontent.com/${context.repoPath}/${context.branch}/${imgPath}`
            node.src = newUrl
        }
    })
    return dom
}
