import Feed from "@components/Feed";
import { PageWrapper } from "@components/page-wrapper";

const Home = () => {
  return (
    <PageWrapper>
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Discover and Share
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center">
            Thoughts on anything and Everything
          </span>
        </h1>
        <p className="desc text-center"></p>

        <Feed />
      </section>
    </PageWrapper>
  );
};

export default Home;
