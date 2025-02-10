import {
    elUserName,
    elUserComment,
    //elPostButton,
    //elLoadData,
    //elAddComment,
} from './elements.js'

import {RenderingDOM} from './RenderDOM.js'

function CommentClick(comment) {
    elUserName.value = comment.userName
    elUserName.ariaReadOnly = true
    elUserComment.value = comment.comment + ' > '
   // editComment = comment
}

function ClickLikeDOM(comment) {
       if (comment.like) {
        comment.like = false
        comment.likeCount--
    } else {
        comment.like = true
        comment.likeCount++
    }
    RenderingDOM()
}

export { CommentClick, ClickLikeDOM }