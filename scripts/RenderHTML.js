import { comments } from './data.js'
import { initLikeClick } from './ListenerHTML.js'
import { initAnswerClick } from './ListenerHTML.js'

function CreateCommentsHTML(arrComments, rootElement) {
    if (arrComments == null) return
    // let commentsElementHTML = "";
    rootElement.innerHTML = arrComments
        .map((comment) => {
            return CreateCommentElementHTML(comment)
        })
        .join('')
}

//Создать один элемент комментарий
function CreateCommentElementHTML(comment) {
    let res = ''
    let date = new Date(comment.date)
    let dateStr = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}: ${date.getMinutes()}`
    let lb = 'like-button' + (comment.isLiked == true ? ' -active-like' : '')
    res = `<li class="comment" style="margin-left:${comment.level * 50}px">
            <div class="comment-header">
                <div>${comment.author.name}</div>
                <div>${dateStr}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">
                    ${comment.text}
                </div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">${comment.likes}</span>
                    <button data-id="${comment.id}" class="${lb}" ></button>
                </div>
            </div>
        </li>`
    return res
}

function RenderingHTML() {
    let postList = document.getElementById('posts')
    postList.innerHTML = ''
    CreateCommentsHTML(comments, postList)
    initLikeClick()
    initAnswerClick()
}

export { RenderingHTML }
