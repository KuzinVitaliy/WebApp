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

function showError(response) {
    const jsonError = response.json()

    // Подписываемся на результат преобразования
    jsonError.then((error) => {
        alert(`Ошибка сохранения данных ${error.error}`)
    })
}

function saveComment(userName, comment) {
    let newCom = { name: userName, text: comment }
    fetch(rootUrl, { method: 'POST', body: JSON.stringify(newCom) })
        .then((response) => {
            if (response.ok) {
                loadData()
            } else {
                console.log(`Ошибка сохранения данных: ${response.status}`)
                showError(response)
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

function loadData() {
    const url = rootUrl
    fetch(url).then((response) => readData(response))
}

export { comments, clearText, loadData, rootUrl, saveComment }
