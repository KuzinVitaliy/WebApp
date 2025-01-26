import { comments } from "./data.js";

//Создать  элемент-контейнер в DOM
function CreateParentElement(elementtype, sccclass, childs) {
    let result = document.createElement(elementtype);
    result.className = sccclass;

    childs?.forEach(element => {
        if (element != null)
            result.appendChild(element);
    });
    return result;
}

//Создать конечный элемент в DOM
function CreateTextElement(elementtype, sccclass, text) {
    let result = document.createElement(elementtype);
    result.className = sccclass;
    result.innerText = text;
    return result;
}

//Создать элементы по массиву
function createCommentsDOM(arrComments, rootElement) {
    if (arrComments == null) return;
    for (comment of arrComments) {
        let comElement = CreateCommentElementDOM(comment);
        rootElement.appendChild(comElement);
    }
}
//Создать элемент с комментариями 
function CreateCommentElementDOM(comment) {

    let lb = "like-button" + (comment.like == true ? " -active-like" : "");
    let btn = CreateTextElement("button", lb, "");
    btn.addEventListener("click", () => { ClickLikeDOM(comment); });
    //        btn.addEventListener("click", () => { ClickLike(comment); });
    //btn.addEventListener("onclick", () => { ClickLike(comment); });'let answ'
    let answ = null;
    if (comment.answers != null) {
        answ = CreateParentElement("div", "comments", null);
        createCommentsDOM(comment.answers, answ);
    }
    let newpost = CreateParentElement("li", "comment",
        [
            CreateParentElement("div", "comment-header",
                [CreateTextElement("div", "", comment.userName),
                CreateTextElement("div", "", comment.postDate)]
            ),
            CreateParentElement("div", "comment-body",
                [CreateTextElement("div", "comment-text", comment.comment)]
            ),
            CreateParentElement("div", "comment-footer",
                [CreateParentElement("div", "likes",
                    [CreateTextElement("div", "likes-counter", comment.likeCount),
                        btn]
                )]),
            answ
        ]);
    let y = newpost.children[1];
    newpost.children[1].children[0].addEventListener("click", () => { CommentClick(comment); });
    return newpost;
}

//Рендеринг с помощью DOM
function RenderingDOM() {
    let postList = document.getElementById("posts");
    postList.innerHTML = "";
    createCommentsDOM(comments, postList);
};

export { RenderingDOM };