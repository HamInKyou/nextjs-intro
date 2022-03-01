import { useRouter } from "next/router";

function Detail() {
  const router = useRouter();
  //title이 있으면 띄우고 없으면 loading...
  //이렇게 하는건 유저가 메인에서 클릭을 통해 상세페이지로 넘어올 때만 가능
  return <h4>{router.query.title || "Loading..."}</h4>;
}

export default Detail;
