import { comments } from './data.js'
import { elPostList } from './elements.js'
import { CommentClick, ClickLikeDOM } from './ListenerDom.js'

//Создать  элемент-контейнер в DOM
function CreateParentElement(elementType, cssClass, children) {
    let result = document.createElement(elementType)
    result.className = cssClass

    children?.forEach((element) => {
        if (element != null) result.appendChild(element)
    })
    return result
}

//Создать конечный элемент в DOM
function CreateTextElement(elementType, cssClass, text) {
    let result = document.createElement(elementType)
    result.className = cssClass
    result.innerText = text
    return result
}

//Создать элементы по массиву
function createCommentsDOM(arrComments, rootElement) {
    if (arrComments == null) return
    for (let comment of arrComments) {
        let comElement = CreateCommentElementDOM(comment)
        rootElement.appendChild(comElement)
    }
}
//Создать элемент с комментариями
function CreateCommentElementDOM(comment) {
    let lb = 'like-button' + (comment.like == true ? ' -active-like' : '')
    let btn = CreateTextElement('button', lb, '')
    btn.addEventListener('click', () => {
        ClickLikeDOM(comment)
    })

    let answer = null
    if (comment.answers != null) {
        answer = CreateParentElement('div', 'comments', null)
        createCommentsDOM(comment.answers, answer)
    }
    let newPost = CreateParentElement('li', 'comment', [
        CreateParentElement('div', 'comment-header', [
            CreateTextElement('div', '', comment.userName),
            CreateTextElement('div', '', comment.postDate),
        ]),
        CreateParentElement('div', 'comment-body', [
            CreateTextElement('div', 'comment-text', comment.comment),
        ]),
        CreateParentElement('div', 'comment-footer', [
            CreateParentElement('div', 'likes', [
                CreateTextElement('div', 'likes-counter', comment.likeCount),
                btn,
            ]),
        ]),
        answer,
    ])
    newPost.children[1].children[0].addEventListener('click', () => {
        CommentClick(comment)
    })
    return newPost
}

//Рендеринг с помощью DOM
function RenderingDOM() {
    elPostList.innerHTML = ''
    createCommentsDOM(comments, elPostList)
}

export { RenderingDOM }
