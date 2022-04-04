const csrftoken = getCookie('csrftoken');

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

async function makeRequest(url, method = 'GET', body) {
    let headers = {
        'X-CSRFToken': csrftoken
    }
    let response = await fetch(url, {method, headers: headers, body: body, mode: "no-cors"});
    if (response.ok) {
        return await response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        return response
    }
}

window.addEventListener('load', function () {
    const mainPage = document.getElementById('main');
    const addQuote = document.getElementById('addQuote');
    const submit = document.getElementById('submit');

    mainPage.onclick = MainPage;
    addQuote.onclick = ViewForm;
    submit.onclick = AddQuote;
});

async function AddQuote() {
    const allQuotes = document.getElementById('get');
    const form = document.getElementById('post');
    const message = document.getElementById('message');
    const Quote = document.getElementById('Quote');
    Quote.style.display = 'none';
    message.style.display = '';
    form.style.display = 'none';
    allQuotes.style.display = 'none';
    const text = document.getElementById('text').value;
    const author = document.getElementById('author').value;
    const email = document.getElementById('email').value;

    try {
        let response = await makeRequest('http://localhost:8000/api/quote/', 'POST',
            {"text": text, "author": author, "email": email});
        console.log(response);
        message.innerHTML = '<h5 style="font-size:40px;">Цитата созданна успешно!</h5>';
        message.style.background = '';
    } catch (error) {
        error = await error.response;
        console.log(error)
        console.log(error.status)
        console.log(error.statusText)
        message.innerHTML = `<h4 style="font-size:50px;"> ${error.status}<b> ${error.statusText}</b> </h4> `;
    }
}


async function ViewForm() {
    const allQuotes = document.getElementById('get');
    const form = document.getElementById('post');
    const message = document.getElementById('message');
    const Quote = document.getElementById('Quote');
    Quote.style.display = 'none';
    message.style.display = 'none';
    form.style.display = '';
    allQuotes.style.display = 'none'
    let response = await makeRequest('http://localhost:8000/api/quote/', 'GET');
}

async function MainPage() {
    const allQuotes = document.getElementById('get');
    const form = document.getElementById('post');
    const message = document.getElementById('message');
    const Quote = document.getElementById('Quote');
    Quote.style.display = 'none';
    message.style.display = 'none';
    form.style.display = 'none';
    allQuotes.innerHTML = '';
    allQuotes.style.display = '';
    allQuotes.innerHTML = `<h1>Quotes!</h1>`
    let response = await makeRequest('http://localhost:8000/api/quote/', 'GET');
    console.log(response.body)
    for (let i = 0; i < response.length; i++) {
        let div = document.createElement('div');
        div.innerHTML = `<a onclick='onClick(preventDefault);' style="text-decoration: none;" href="http://localhost:8000/api/quote/${response[i]['id']}">Детальный просмотр</a> <br>
            ${response[i]['text']} <br>
            Автор - ${response[i]['author']}<br>
            Рейтинг: <b class="rating">${response[i]['rating']} </b>  | 
            <a onclick='Up(event);' id="up" href="http://localhost:8000/api/quote/${response[i]['id']}/Up/"> + </a> | 
            <a onclick='Down(event);' id="down" href="http://localhost:8000/api/quote/${response[i]['id']}/Down/"> - </a>
            <br>
            <p>${response[i]['create_date']}</p> <hr>`;
        allQuotes.appendChild(div);
    }
}

async function onClick(event) {
    event.preventDefault();
    let a = event.target;
    let url = a.href;
    console.log(url);
    const allQuotes = document.getElementById('get');
    const form = document.getElementById('post');
    const message = document.getElementById('message');
    const Quote = document.getElementById('Quote');
    Quote.style.display = '';
    Quote.innerHTML = '';
    message.style.display = 'none';
    form.style.display = 'none';
    allQuotes.style.display = 'none';
    let response = await makeRequest(url, 'GET');
    console.log(response);
    let div = document.createElement('div');
    div.innerHTML = `<a onclick='onclick(event);' href="http://localhost:8000/api/quote/${response['id']}">Изменить</a>
        <br>
        ${response['text']}<br>
        ${response['author']}<br>
        Рейтинг: <b class="rating">${response['rating']} </b>  | 
        <a onclick='Up(event);' id="up" href="http://localhost:8000/api/quote/${response['id']}/Up/">+</a> | 
        <a onclick='Down(event);' id="down" href="http://localhost:8000/api/quote/${response['id']}/Down/">-</a><br>
        <p> ${response['create_date']}</p> <hr>`;
    Quote.appendChild(div);
}

async function Up(event) {
    event.preventDefault();
    let a = event.target;
    let url = a.href;
    console.log(url);
    let response = await makeRequest(url, 'POST');
    const rating = a.parentElement.getElementsByClassName('rating')[0];
    rating.innerText = `${response['rating']}`;

}

async function Down(event) {
    event.preventDefault();
    let a = event.target;
    let url = a.href;
    console.log(url);
    let response = await makeRequest(url, 'POST');
    const rating = a.parentElement.getElementsByClassName('rating')[0];
    rating.innerText = `${response['rating']}`;

}

async function getToken() {
    let url = "http://127.0.0.1:8000/api/get-csrf-token/"
    await fetch(url);
}

window.addEventListener('load', getToken)