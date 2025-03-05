import { getUsers, registerUser } from './data.js'

let elLogin = document.getElementById('inp_login')
let elName = document.getElementById('inp_name')
let elPassword = document.getElementById('inp_password')
let elRegBtn = document.getElementById('reg_btn')

function initEventListenerReg() {
    console.log('initEventListenerReg')
    elLogin.addEventListener('change', () => LoginChange(elLogin.value))
    elName.addEventListener('change', () => LoginChange(elName.value))
    elPassword.addEventListener('change', () => LoginChange(elPassword.value))
    elRegBtn.addEventListener('click', () => registreNewUser())
}

function registreNewUser() {
    registerUser(elLogin.value, elName.value, elPassword.value)
        .then(() => {
            window.location.href = './index.html'
        })
        .catch((error) => {
            alert(error)
        })
}

function LoginChange(name) {
    console.log(name)
    let d = getUsers()
    console.log(d)
    //   let dd = document.getElementById('login')
}

export { initEventListenerReg }

console.log('Init registration JS')

initEventListenerReg()
