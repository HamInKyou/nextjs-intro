import Seo from "../components/Seo";

export default function Home({ results }) {
  return (
    <div className="container">
      <Seo title="Home" />
      {/*dada가 있으면? .map 실행*/}
      {results?.map((movie) => (
        <div className="movie" key={movie.id}>
          <img
            src={`/api/image${movie.poster_path}`}
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
