class Movie {
  constructor(title, director, year) {
    this.title = title;
    this.director = director;
    this.year = year;
  }
}

let movies = [];

function validateMovie(title, director, year) {
  if (!title || !director || !year || isNaN(year)) {
    alert('Пожалуйста, заполните все поля.');
    return false;
  }

  if (/^\d+$/.test(title) || /\d/.test(director)) {
    alert('Название фильма и имя режиссера не могут состоять только из цифр.');
    return false;
  }

  if (director === title) {
    alert('Название фильма и имя режиссера не могут совпадать.')
    return false;
  }

  if (year < 1895 || year > 2025) {
    alert('Указанный год не является корректным.');
    return false;
  }

  return true;
}

function addMovie(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const director = document.getElementById('director').value;
  const year = parseInt(document.getElementById('year').value);

  if (!validateMovie(title, director, year))  return;

  const movie = new Movie(title, director, year);

  movies.push(movie);
  displayMovies();

  document.getElementById('title').value = '';
  document.getElementById('director').value = '';
  document.getElementById('year').value = '';
}

function displayMovies() {
  const moviesContainer = document.getElementById('movies-container');
  moviesContainer.innerHTML = '';

  movies.forEach((movie, index) => {
    const movieElement = createMovieElement(movie, index);
    moviesContainer.appendChild(movieElement);
  });
}

function createMovieElement(movie, index) {
  const movieElement = document.createElement('div');
  movieElement.classList.add('col-md-4', 'mb-4');
  movieElement.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text"><strong>Режиссер:</strong> ${movie.director}</p>
        <p class="card-text"><strong>Год выпуска:</strong> ${movie.year}</p>
        <button type="button" class="btn btn-primary mr-2" onclick="editMovie(${index})">Изменить</button>
        <button type="button" class="btn btn-danger" onclick="deleteMovie(${index})">Удалить</button>
      </div>
    </div>
  `;

  return movieElement;
}

function editMovie(index) {
  const movie = movies[index];
  const movieElement = document.getElementById('movies-container').children[index];
  movieElement.innerHTML = `
    <div class="card">
      <div class="card-body">
        <input type="text" class="form-control mb-2" value="${movie.title}" id="edit-title-${index}">
        <input type="text" class="form-control mb-2" value="${movie.director}" id="edit-director-${index}">
        <input type="number" class="form-control mb-2" value="${movie.year}" id="edit-year-${index}">
        <button type="button" class="btn btn-success mr-2" onclick="saveMovie(${index})">Сохранить</button>
        <button type="button" class="btn btn-secondary" onclick="cancelEdit(${index})">Отмена</button>
      </div>
    </div>
  `;
}

function saveMovie(index) {
  const title = document.getElementById(`edit-title-${index}`).value;
  const director = document.getElementById(`edit-director-${index}`).value;
  const year = parseInt(document.getElementById(`edit-year-${index}`).value);

  if (!validateMovie(title, director, year)) return;

  movies[index].title = title;
  movies[index].director = director;
  movies[index].year = year;

  displayMovies();
}

function cancelEdit(index)  {
  displayMovies();
}

function deleteMovie(index) {
  movies.splice(index, 1);
  displayMovies();
}

document.getElementById('movie-form').addEventListener('submit', addMovie);
