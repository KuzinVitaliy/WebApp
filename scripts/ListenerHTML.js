import { comments, saveComment } from './data.js'
import { RenderingHTML } from './RenderHTML.js'
import { validation } from './main.js'
import {
    elUserName,
    elUserComment,
    //elPostButton,
    //elLoadData,
    //elAddComment,
} from './elements.js'

//let selectedComment = -1

//let editComment

function CommentClickHTML(id) {
    const comment = comments[id]
    elUserName.value = comment.userName
    elUserComment.ariaReadOnly = true
    elUserComment.value = comment.comment + ' > '
    //editComment = comment
    //selectedComment = id
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
    saveComment(elUserName.value, elUserComment.value).then(() => {
        RenderingHTML()
        elUserName.value = ''
        elUserComment.value = ''
        validation()
    })
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

export { initLikeClick, initAnswerClick, postmessageHTML }
