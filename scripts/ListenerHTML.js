import { comments,  saveComment } from './data.js'
import { RenderingHTML } from './RenderHTML.js'
import { validation } from './main.js'

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
    if (comment.isLiked) {
        comment.isLiked = false
        comment.likes--
    } else {
        comment.isLiked = true
        comment.likes++
    }
    RenderingHTML()
}

function postmessageHTML() {
    let un = document.getElementById('username')
    let uc = document.getElementById('usercomment')
    saveComment(un.value, uc.value)
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
    saveComment(un.value, uc.value)
}

export { initLikeClick, initAnswerClick, postmessageHTML }
