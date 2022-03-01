import { useEffect, useState } from "react";
import Seo from "../components/Seo";

const API_KEY = "57644f2e20cf1ba7f37fe8ae2dbb46bf";
export default function Home() {
  const [movies, setMovies] = useState(); //초기 state를 아예 빈배열도 아닌 undefined로!
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      const data = await response.json();
      setMovies(data.results);
    })(); //익명함수를 만들고 바로 실행시키기
  }, []);
  return (
    <div className="container">
      <Seo title="Home" />
      {/*movies가 undefined면 Loading... 띄우기*/}
      {!movies && <h4>Loading...</h4>}
      {/*movies가 있으면? .map 실행*/}
      {movies?.map((movie) => (
        <div className="movie" key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.original_title}
          />
          <h4>{movie.original_title}</h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
