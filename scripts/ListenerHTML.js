import { comments, clearText } from './data.js'
import { RenderingHTML } from './RenderHTML.js'

let selectedComment = -1

let editComment

function CommentClickHTML(id) {
    let un = document.getElementById('username')
    let uc = document.getElementById('usercomment')
    const comment = comments[id]
    un.value = comment.userName
    un.ariaReadOnly = true
    uc.value = comment.comment + ' > '
    editComment = comment
    selectedComment = id
}

function ClickLikeHTML(id) {
    const comment = comments[id]
    if (comment.like) {
        comment.like = false
        comment.likeCount--
    } else {
        comment.like = true
        comment.likeCount++
    }
    RenderingHTML()
}

function postmessageHTML() {
    let un = document.getElementById('username')
    let uc = document.getElementById('usercomment')
    let date = new Date()
    let dateStr = `${date.getMonth() + 1}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}: ${date.getMinutes()}`
    let newCom = {
        userName: clearText(un.value),
        postDate: dateStr,
        comment: clearText(uc.value),
        likeCount: 0,
        like: false,
        level: 0,
    }

    if (selectedComment >= 0) {
        const comment = comments[selectedComment]
        newCom.level = comment.level + 1
        comments.splice(selectedComment + 1, 0, newCom)
    } else {
        comments.push(newCom)
    }
    selectedComment = -1
    RenderingHTML()
    un.value = ''
    uc.value = ''
    validation()
}

//Добавить обработчик события кнопки like
function initLikeClick() {
    const btns = document.querySelectorAll('.like-button')
    btns.forEach((btn, index) => {
        btn.addEventListener('click', () => ClickLikeHTML(index))
    })
}

//Добавить обработчик события кнопки like
function initAnswerClick() {
    const btns = document.querySelectorAll('.comment-body')
    btns.forEach((btn, index) => {
        btn.addEventListener('click', () => CommentClickHTML(index))
    })
}

function postmessage2() {
    let un = document.getElementById('username')
    let uc = document.getElementById('usercomment')
    let date = new Date()
    let dateStr = `${date.getMonth() + 1}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}: ${date.getMinutes()}`
    let newCom = {
        userName: un.value,
        postDate: dateStr,
        comment: uc.value,
        likeCount: 0,
        like: false,
    }
    if (editComment == null) {
        comments.push(newCom)
    } else {
        if (editComment.answers == null) editComment.answers = []
        editComment.answers.push(newCom)
    }

    editComment = null
    RenderingHTML()
    un.value = ''
    uc.value = ''
    validation()
}

export { initLikeClick, initAnswerClick, postmessageHTML }
