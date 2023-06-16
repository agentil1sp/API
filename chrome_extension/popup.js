document.addEventListener('DOMContentLoaded', function () {
    const API_URL = 'https://afternoon-sierra-81018-40a536799e2f.herokuapp.com/';

    fetch(API_URL + 'read/chatgpt')
        .then((response) => {
            return(response.json())
        })
        .then((data) => {
            console.log(data[0]);
        })
})

