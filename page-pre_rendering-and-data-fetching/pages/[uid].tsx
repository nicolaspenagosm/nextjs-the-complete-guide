import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function UserIdPage({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // When we extract params in the component
  // we can use them only in client side.
  // NO PRE-RENDERING

  // Fallback
  if (!id) {
    return <p>Loading...</p>;
  }

  // no useouter()
  return (
    <>
      <h1>{id}</h1>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const userId = params!.uid;
  return {
    props: {
      id: "userId-" + userId,
    },
  };
};
