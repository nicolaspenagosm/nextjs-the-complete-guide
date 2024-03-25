import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
export type Product = { id: string; title: string; description: string };

export default function Home(props: { products: Product[] }) {
  const { products } = props;
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          <Link href={`/products/${p.id}`}>{p.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  console.log("(Re-)Generating...");
  // Current Working Directory is always root when executing
  // currentWorking/data/dummy-backend.json'
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    // Incremental Static Site Generation
    // Time in seconds that NextJS has to wait until it re-generate this page
    // when is requested. If <10 the newest cached page will be sent
    // This just work for productions, in dev is re regenerated on every request
    revalidate: 10,
    // Returns a 404 error if is true, is useful when the fetchs fails
    //notFound: false,
    //Redirect the user
    //redirect:
  };
}
