import Link from "next/link";
import { useRouter } from "next/router";
import Seo from "../components/Seo";

export default function Home({ results }) {
  const router = useRouter();
  const onMovieClick = (id, title) => {
    //router를 통해 링크연결하는 방법
    //다음과 같은 방법으로 쿼리를 url에서 숨길 수 있다(마스킹 가능)
    router.push(
      {
        pathname: `/movies/${id}`,
        query: {
          title,
        },
      },
      `/movies/${id}`
    );
  };
  return (
    <div className="container">
      <Seo title="Home" />
      {/*dada가 있으면? .map 실행*/}
      {results?.map((movie) => (
        <div
          className="movie"
          key={movie.id}
          onClick={() => onMovieClick(movie.id, movie.original_title)}
        >
          <img
            src={`/api/image${movie.poster_path}`}
            alt={movie.original_title}
          />
          {/* 다음과 같은 방법으로 쿼리를 url에서 숨길 수 있다(마스킹 가능) */}
          <Link
            href={{
              pathname: `/movies/${movie.id}`,
              query: {
                title: movie.original_title,
              },
            }}
            as={`/movies/${movie.id}`}
          >
            <a>
              <h4>{movie.original_title}</h4>
            </a>
          </Link>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
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

//이 코드는 서버에서만 동작! 클라이언트 쪽에선 어떤 일이 일어나는지 모름.
export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/movies"); //이건 절대경로(풀 경로)여야한다!
  const { results } = await response.json();

  //이 리턴하는 데이터가 페이지에 전달됨.
  //props: {} 객체가 props로 전달되어, 이걸 활용하면 된다.
  return {
    props: {
      results,
    },
  };
}
