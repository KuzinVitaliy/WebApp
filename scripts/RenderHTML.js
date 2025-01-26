import { comments } from "./data.js";
import { initLikeClick } from "./ListenerHTML.js";
import { initAnswerClick } from "./ListenerHTML.js";

function CreateCommentsHTML(arrComments, rootElement) {
    if (arrComments == null) return;
    let commentsElementHTML = "";
    rootElement.innerHTML = arrComments.map((comment, index) => { return CreateCommentElementHTML(comment, index) }).join("");
};

//Создать один элемент комментарий 
function CreateCommentElementHTML(comment, index) {
    let res = "";
    let date = new Date();
    let dateStr = `${date.getMonth() + 1}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}: ${date.getMinutes()}`;
    let lb = "like-button" + (comment.like == true ? " -active-like" : "");
    res = `<li class="comment" style="margin-left:${comment.level * 50}px">
            <div class="comment-header">
                <div>${comment.userName}</div>
                <div>${dateStr}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">
                    ${comment.comment}
                </div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">${comment.likeCount}</span>
                    <button data-index="${index}" class="${lb}" ></button>
                </div>
            </div>
        </li>`;
    return res;
}

function RenderingHTML() {
    let postList = document.getElementById("posts");
    postList.innerHTML = "";

    CreateCommentsHTML(comments, postList);
    const likeBtns = document.getElementsByClassName("like-button");
    initLikeClick();

    initAnswerClick();
};

export { RenderingHTML };