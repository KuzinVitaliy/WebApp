function CommentClick(comment) {
    let un = document.getElementById("username");
    let uc = document.getElementById("usercomment");

    un.value = comment.userName;
    un.ariaReadOnly = true;
    uc.value = comment.comment + " > ";
    editComment = comment;
}

function ClickLikeDOM(comment) {
    let r = 0;
    if (comment.like) {
        comment.like = false;
        comment.likeCount--;
    } else {
        comment.like = true;
        comment.likeCount++;
    }
    RenderingDOM();
}

