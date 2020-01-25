
class StubAPI {
    constructor() {
        this.favoriteMovies = [];
        this.reviews = []
    }

    add(movie) {
        this.favoriteMovies.push(movie);
        console.log(this.favoriteMovies)
    }

    getAll() {
        return this.favoriteMovies;
    }

    addReview(review) {
        this.reviews.push(review)
    }

}

export default new StubAPI();