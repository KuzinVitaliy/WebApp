//import { RenderingHTML } from './RenderHTML.js'
//import { RenderingDOM } from './RenderDOM.js'
import { postmessageHTML, validation } from './ListenerHTML.js'
import { loadData } from './data.js'
import {
    elUserName,
    elUserComment,
    elPostButton,
    elLoadData,
} from './elements.js'
import { RenderingHTML } from './RenderHTML.js'



//Добавить обработчики
function eventValidationLink() {
    elUserName?.addEventListener('change', () => validation())
    elUserComment?.addEventListener('change', () => validation())
    elPostButton?.addEventListener('click', () => postmessageHTML())
}

function firstLoadData() {
    if (elLoadData != null) elLoadData.style.display = 'block'
    loadData()
        .then(() => {
            RenderingHTML()
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            if (elLoadData != null) elLoadData.style.display = 'none'
        })
}



eventValidationLink()
firstLoadData()
//RenderingHTML()
//RenderingDOM();
