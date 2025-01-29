//import { RenderingHTML } from './RenderHTML.js'
//import { RenderingDOM } from './RenderDOM.js'
import { postmessageHTML } from './ListenerHTML.js'
import { loadData, init } from './data.js'

function validation() {
    let un = document.getElementById('username')
    let uc = document.getElementById('usercomment')
    let bt = document.getElementById('postbutton')
    if (un.value.length > 0 && uc.value.length > 0) bt.disabled = false
    else bt.disabled = true
}

function eventValidationLink() {
    const elm = document.getElementById('username')
    elm.addEventListener('change', () => validation())

    const elm2 = document.getElementById('usercomment')
    elm2.addEventListener('change', () => validation())

    const elm3 = document.getElementById('postbutton')
    elm3.addEventListener('click', () => postmessageHTML())
}

export { validation }

eventValidationLink()
init()
loadData()
//RenderingHTML()
//RenderingDOM();
