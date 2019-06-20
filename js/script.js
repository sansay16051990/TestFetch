let searchForm = document.querySelector('.search__form');
let searchSubmit = document.querySelector('.search__submit');
let content = document.querySelector('.row.content');
let emptyImg = "http://placehold.it/150x225"
let posterUrl = "https://image.tmdb.org/t/p/w500"
function apiSearch(event){
event.preventDefault();
let searchText = document.querySelector('.search__text').value;
server = 'https://api.themoviedb.org/3/search/multi?api_key=d74067b4d63689bd8b2da28744f99141&language=ru&query=' + searchText;
content.innerHTML = "Загрузка...";

fetch(server)
    .then((value) =>{
        if(value.status !== 200){
            return Promise.reject(value)
        }
        return value.json();
    })
    .then((output) =>{
        let inner = '';
        output.results.forEach((item) =>{
            console.log(item)
            let title = item.title || item.name;
            let poster = posterUrl + item.poster_path;
            if(item.poster_path == null){
                poster = emptyImg;
            }
            let date = item.release_date || item.first_air_date;
            let descr = item.overview.substring(0,150) + '...';
            let rating = item.vote_average;
            inner += 
            `<div class="col-4">
                <div class="movie__card">
                    <h2 class="movie__title">${title}</h2>
                    <a class="movie__poster" href="${poster}"><img src="${poster}" alt=""></a>\
                    <p class="movie__date">Дата выхода:<span> ${date}</span></p>
                    <p class="movie__descr">Описание:<span> ${descr}</span></p>
                    <p class="movie__rating">Рейтинг:<span> ${rating}</span></p>
                    <a class="movie__more" href="#">Подробнее</a>
                </div>
            </div>`;
        })
        content.innerHTML = inner;
      
    })
    .catch((error) =>{
        content.innerHTML = "Что то пошло не так!!!";
        console.error('Ошибка: ' + error.status)
    })
}
searchForm.addEventListener('submit', apiSearch);

