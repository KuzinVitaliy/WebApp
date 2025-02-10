//import { RenderingHTML } from './RenderHTML.js'
//import { RenderingDOM } from './RenderDOM.js'
import { postmessageHTML } from './ListenerHTML.js'
import { loadData } from './data.js'
import { elUserName, elUserComment, elPostButton } from './elements.js'

//Проверка корректности введенных данные
function validation() {
    if (elUserName.value.length > 0 && elUserComment.value.length > 0)
        elPostButton.disabled = false
    else elPostButton.disabled = true
}

//Добавить обработчики
function eventValidationLink() {
    elUserName.addEventListener('change', () => validation())
    elUserComment.addEventListener('change', () => validation())
    elPostButton.addEventListener('click', () => postmessageHTML())
}

export { validation }

eventValidationLink()
loadData()
//RenderingHTML()
//RenderingDOM();
