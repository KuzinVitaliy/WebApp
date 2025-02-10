//Корневой адрес службы
var rootUrl = `https://wedev-api.sky.pro/api/v1/vk/comments`

import { RenderingHTML } from './RenderHTML.js'
import { elLoadData, elAddComment, elCommentEdit } from './elements.js'

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
    return fetch(rootUrl, { method: 'POST', body: JSON.stringify(newCom) })
        .then((response) => {
            if (response.ok) {
                addCommentData()
            } else {
                console.log(`Ошибка сохранения данных: ${response.status}`)
                showError(response)
            }
        })
        .catch((error) => {
            console.log(error.message)
        })
}

function clearText(text) {
    let elm = document.createElement('div')
    elm.innerHTML = text
    return elm.innerText
}

function loadData() {
    const url = rootUrl
    elLoadData.style.display = 'block'
    fetch(url)
        .then((response) => {
            return readData(response)
        })
        .then(() => {
            console.log('Загрузка завершена')
        })
        .catch((error) => {
            console.log(error.message)
        })
        .finally(() => {
            elLoadData.style.display = 'none'
        })
}

function addCommentData() {
    const url = rootUrl
    elAddComment.style.display = 'block'
    elCommentEdit.style.display = 'none'
    fetch(url)
        .then((response) => {
            return readData(response)
        })
        .then(() => {
            console.log('Загрузка завершена')
            elAddComment.style.display = 'none'
        })
        .finally(() => {
            elAddComment.style.display = 'none'
            elCommentEdit.style.display = 'block'
        })
}

export { comments, clearText, loadData, rootUrl, saveComment }
