import { useRouter, withRouter } from "next/router";

const PortfolioProjectPage: React.FC = () => {
  const router = useRouter();

  console.log(router.pathname);
  console.log(router.query);

  return (
    <main>
      <h1>The Portfolio Porject Page</h1>
    </main>
  );
};

export default PortfolioProjectPage;
