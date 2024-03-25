import { GetStaticProps, InferGetStaticPropsType } from "next";

import fs from "fs/promises";
import path from "path";
import { Product } from "..";

export default function ProductDetailPage({
  loadedProduct,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // When we extract params in the component
  // we can use them only in client side.
  // NO PRE-RENDERING

  // Fallback
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  // no useouter()
  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());
  return data;
}

// NextJs does not auto pregenerates dinamic pages
export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const productId = params!.pid;

  const data = await getData();
  const product = data.products.find(
    (product: Product) => product.id === productId
  );

  if (!product) {
    return { notFound: true };
  }
  return {
    props: {
      loadedProduct: product,
    },
  };
};

// Pre-regenerate this pages
export const getStaticPaths = async () => {
  const data = await getData();
  const ids = data.products.map((p: Product) => p.id);
  const pathsWithParams = ids.map((id: string) => ({
    params: {
      pid: id,
    },
  }));

  return {
    // paths: [
    //   // Lets say p1 is a High frequency visisted page, but we dont wanna
    //   // pre generate the other two pages.
    //   {
    //     params: {
    //       pid: "p1",
    //     },
    //   },
    // ],
    paths: pathsWithParams,
    // Allows to generate when are visited
    //fallback: true,
    //No falback needed, blocks until loaded
    //fallback: "blocking",
    fallback: true,
  };
};
