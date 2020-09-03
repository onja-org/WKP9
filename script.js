const endpoint = `https://ghibliapi.herokuapp.com/films`;
const container = document.querySelector('.container');

async function fetchMovie() {
	const response = await fetch(endpoint);
	const data = await response.json();
	return data;
}

async function populateMovie() {
	// GET THE DATA
	const movies = await fetchMovie();
	// SORT THE DATA
	const sortedMovies = movies.sort((a, b) => b.rt_score - a.rt_score);
	// SHOW THE DATA
	const html = sortedMovies
		.map(movie => {
			return `
            <article>
                    <header>
                        <h3>${movie.title} <small>${movie.release_date}</small></h3>
                        <span class="score">
                            <svg viewBox="0 0 20 20" fill="currentColor" class="heart w-6 h-6"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path></svg>
                            ${movie.rt_score}
                        </span>
                    </header>
                    <p>${movie.description}</p>
                    <div class="pill-container">
                        <div class="pill"><svg viewBox="0 0 20 20" fill="currentColor" class="film w-6 h-6"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z" clip-rule="evenodd"></path></svg>${movie.director}</div>
                        <div class="pill"><svg viewBox="0 0 20 20" fill="currentColor" class="briefcase w-6 h-6"><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path></svg>${movie.producer}</div>
                    </div>
                </article> 
        `;
		})
		.join('');
	container.innerHTML = html;
}

populateMovie();
