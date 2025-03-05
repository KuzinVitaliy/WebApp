import { userLogin } from './data.js'

let elLogin = document.getElementById('login_btn')
let elName = document.getElementById('inp_login')
let elPassword = document.getElementById('inp_password')

function addEventListener2() {
    elLogin.addEventListener('click', () => loginPress())
}

function loginPress() {
    userLogin(elName.value, elPassword.value)
        .then(() => {
            window.location.href = './index.html'
        })
        .catch((error) => {
            console.log(error)
        })
}

export { addEventListener2 }

addEventListener2()
