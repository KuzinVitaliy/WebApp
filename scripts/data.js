var rootUrl = `https://wedev-api.sky.pro/api/v1/vk/comments`

import { RenderingHTML } from './RenderHTML.js'

let comments = []

function readData(response) {
    const jsonPromise = response.json()

    // Подписываемся на результат преобразования
    jsonPromise.then((responseData) => {
        comments = responseData.comments
        RenderingHTML()
    })
}

function saveComment(userName, comment) {
    let newCom = { name: userName, text: comment }
    fetch(rootUrl, { method: 'POST', body: JSON.stringify(newCom) })
        .then((response) => {
            if (response.ok) {
                loadData()
            } else {
                let body = response.body
            }
        })
        .catch((response) => {
            response
        })
}

function clearText(text) {
    let elm = document.createElement('div')
    elm.innerHTML = text
    return elm.innerText
}

function init() {
    rootUrl = `https://wedev-api.sky.pro/api/v1/vk/comments`
}

function loadData() {
    const url = rootUrl
    fetch(url).then((response) => readData(response))
}

export { comments, clearText, loadData, rootUrl, init, saveComment }
