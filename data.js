const comments = [
    {
        userName: 'Глеб Фокин',
        postDate: '12.02.22 12: 18',
        comment: 'Это будет первый комментарий на этой странице',
        likeCount: 3,
        like: false,
        level: 0,
        answers: [
            {
                userName: 'Глеб Фокин',
                postDate: '12.02.22 12: 18',
                comment: 'Это будет первый комментарий на этой странице',
                likeCount: 5,
                like: false
            }
        ]
    },
    {
        userName: 'Варвара Н.',
        postDate: '13.02.22 19:22',
        comment: 'Мне нравится как оформлена эта страница! ❤',
        likeCount: 75,
        like: true,
        level: 0
    }
];

function clearText(text) {
    let elm = document.createElement("div");
    elm.innerHTML = text;
    return elm.innerText;
}

export { comments, clearText };