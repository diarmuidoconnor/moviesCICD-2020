
class StubAPI {
    constructor() {
        this.favoriteMovies = [];
    }

    add(movie) {
        this.favoriteMovies.push(movie);
        console.log(this.favoriteMovies)
    }

    getAll() {
        return this.favoriteMovies;
    }

}

export default new StubAPI();