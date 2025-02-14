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

function procErrorResponse(response) {
    return response.json((jsonError) => {
        // Подписываемся на результат преобразования
        return jsonError.then((error) => {
            const msg = error.error
            console.log(msg)
            throw new Error(msg)
        })
    })
}

//Сохраняет новый комментарий
function saveComment(userName, comment) {
    let newCom = { name: userName, text: comment }
    return fetch(rootUrl, { method: 'POST', body: JSON.stringify(newCom) })
        .then((response) => {
            if (response.ok) {
                return addCommentData()
            }
            return response.json().then((data) => {
                throw new Error(data.error)
            })
        })
        .then((eeee) => {
            console.log(eeee)
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

    return fetch(url)
        .then((response) => {
            return readData(response)
        })
        .then(() => {
            console.log('Загрузка завершена')
            //     elAddComment.style.display = 'none'
        })
        .finally(() => {})
}

export { comments, clearText, loadData, rootUrl, saveComment }
