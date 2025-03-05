setTimeout(() => {
    console.log('Макрозадача 1')
}, 0)

Promise.resolve().then(() => {
    console.log('Микрозадача 1')
})

setTimeout(() => {
    console.log('Макрозадача 2')
}, 0)

Promise.resolve().then(() => {
    console.log('Микрозадача 2')
})

console.log('Синхронный код')
