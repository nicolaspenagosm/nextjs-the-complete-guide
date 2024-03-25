import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <main>
      <h1>The Home Page</h1>
      <ul>
        <li>
            <Link href="/portfolio">Portfolio</Link>
        </li>
        <li>
            <Link href="/clients">Clients</Link>
        </li>
      </ul>
    </main>
  );
};

export default HomePage;