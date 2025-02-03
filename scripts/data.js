var rootUrl = `https://wedev-api.sky.pro/api/v1/vk/comments`

import { RenderingHTML } from './RenderHTML.js'

let loadDataDiv = document.getElementById('loaddata')
let addComDiv = document.getElementById('addCommnet')
let commentEditDiv = document.getElementById('commentEdit')

let comments = []

function readData(response) {
    return response.json().then((responseData) => {
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
                addComentData()
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
    loadDataDiv.style.display = 'block'
    fetch(url)
        .then((response) => {
            return readData(response)
        })
        .then(() => {
            console.log('Загрузка завершена')
        })
        .finally(() => {
            loadDataDiv.style.display = 'none'
        })
}

function addComentData() {
    const url = rootUrl
    addComDiv.style.display = 'block'
    commentEditDiv.style.display = 'none'
    fetch(url)
        .then((response) => {
            return readData(response)
        })
        .then(() => {
            console.log('Загрузка завершена')
            addComDiv.style.display = 'none'
        })
        .finally(() => {
            addComDiv.style.display = 'none'
            commentEditDiv.style.display = 'block'
        })
}

export { comments, clearText, loadData, rootUrl, saveComment }
