//Корневой адрес службы
var rootUrl = `https://wedev-api.sky.pro/api/v2/vk/comments`
var userUrl = `https://wedev-api.sky.pro/api/user`

const userInfoStorage = 'commentUserInfo'

import { RenderingHTML } from './RenderHTML.js'

let comments = []

let currentUser

//$region Работа с пользователями
function getUsers() {
    return fetch(`${rootUrl}\\`, { method: 'GET' }).then((response) => {
        response.json.then((data) => {
            return data.JSON
        })
    })
}

function registerUser(name, login, password) {
    return fetch(userUrl, {
        method: 'POST',
        body: JSON.stringify({ name, login, password }),
    })
        .then((response) => {
            //Получили
            if (response.status == 400)
                throw new Error(`Пользователь ${login} уже существует`)
            response.json().then((data) => {
                currentUser = data.JSON
            })
        })
        .catch((error) => {
            currentUser = null // Обнуляем данные о пользователе
            console.log(error)
            throw new Error(error)
        })
}

function userLogin(login, password) {
    //let js = JSON.stringify({ login, password })
    window.localStorage.removeItem(userInfoStorage)
    return fetch(`${userUrl}/login`, {
        method: 'POST',
        body: JSON.stringify({ login, password }),
    })
        .then((response) => {
            return response.json().then((data) => {
                console.log(data)
                currentUser = data.user
                if (response.status == 400)
                    throw new Error(`Пользователь не существует`)
                window.localStorage.setItem(
                    userInfoStorage,
                    JSON.stringify(data.user),
                )
            })
        })
        .catch((error) => {
            console.log(error)
        })
}

//Можно добавлять комментарии
function сanAddComment() {
    return isNaN(userInfo())
}

function userInfo() {
    let userInfo = window.localStorage.getItem(userInfoStorage)
    let obj = JSON.parse(userInfo)
    return obj
}

//$endregion

function readData(response) {
    return response.json().then((responseData) => {
        comments = responseData.comments
        RenderingHTML()
    })
}

//Сохраняет новый комментарий
function saveComment(userName, comment) {
    let newCom = { name: userName, text: comment }
    let token = userInfo().token
    return fetch(rootUrl, {
        method: 'POST',
        body: JSON.stringify(newCom),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
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

function deleteComment(id) {
    return fetch(`${rootUrl}\\${id}`, { method: 'DELETE' }).then(
        (response) => {},
    )
}

function clearText(text) {
    let elm = document.createElement('div')
    elm.innerHTML = text
    return elm.innerText
}

function loadData() {
    const url = rootUrl
    return fetch(url)
        .then((response) => {
            return readData(response)
        })
        .then(() => {
            console.log('Загрузка завершена')
        })
        .catch((error) => {
            console.log(error.message)
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

export {
    comments,
    clearText,
    loadData,
    rootUrl,
    saveComment,
    deleteComment,
    getUsers,
    registerUser,
    userLogin,
    сanAddComment,
    userInfo,
}
