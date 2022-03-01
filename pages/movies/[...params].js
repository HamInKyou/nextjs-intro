import { useRouter } from "next/router";
import Seo from "../../components/Seo";

function Detail({ params }) {
  const [title, id] = params;

  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
    </div>
  );
}

export default Detail;

export function getServerSideProps(ctx) {
  const params = ctx.query.params;

  return {
    props: { params },
  };
}
