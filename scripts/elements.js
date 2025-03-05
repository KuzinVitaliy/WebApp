//Элемент с именем пользователя
let elUserName = document.getElementById('userName')
//Элемент с комментарием пользователя
let elUserComment = document.getElementById('userComment')
//Кнопка - создание комментария
let elPostButton = document.getElementById('postButton')
//Элемент с текстом "идет загрузка"
let elLoadData = document.getElementById('loadData')
//Элемент с текстом "идет загрузка"
let elAddComment = document.getElementById('addComment')
//Список постов. Корневой элемент
let elPostList = document.getElementById('posts')

//Блок редактирования комментариев
let elCommentEdit = document.getElementById('commentEdit')

export {
    elUserName,
    elUserComment,
    elPostButton,
    elLoadData,
    elAddComment,
    elPostList,
    elCommentEdit,
}
