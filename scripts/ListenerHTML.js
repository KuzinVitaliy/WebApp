import { comments, saveComment } from './data.js'
import { RenderingHTML } from './RenderHTML.js'

import {
    elUserName,
    elUserComment,
    elAddComment,
    elCommentEdit,
    elPostButton,
    //elPostButton,
    //elLoadData,
} from './elements.js'

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

//Проверка корректности введенных данные
function validation() {
    if (elUserName.value.length > 0 && elUserComment.value.length > 0)
        elPostButton.disabled = false
    else elPostButton.disabled = true
}

//Обработчик события нажатия на кнопку публикации комментария
function postmessageHTML() {
    elAddComment.style.display = 'block'
    elCommentEdit.style.display = 'none'
    saveComment(elUserName.value, elUserComment.value)
        .then(() => {
            RenderingHTML()
            elUserName.value = ''
            elUserComment.value = ''
            validation()
        })
        .catch((error) => {
            console.log ( error)
            alert(`Ошибка сохранения данных ${error}`)
        })
        .finally(() => {
            elAddComment.style.display = 'none'
            elCommentEdit.style.display = 'block'
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

export { initLikeClick, initAnswerClick, postmessageHTML, validation }
