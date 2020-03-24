import React from "react";
import PropTypes from "prop-types";
import Hello from "./Hello";
import Wrapper from "./Wrapper";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";
// function App() {
//   return (
//     <Wrapper>
//       <Hello color="pink" />
//       <Hello name="react" color="red" isSpecial={true} />
//     </Wrapper>
//   );
// }

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    this.setState({ movies, isLoading: false });
  };
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    console.log(movies);

    return (
      <section class="container">
        {isLoading ? (
          <div class="loader">
            <span class="loader_text">Loading...</span>
          </div>
        ) : (
          <div class="movies">
            {movies.map(movie => {
              return (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              );
            })}
          </div>
        )}
      </section>
    );
  }
}

export default App;
