import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function UserProfilePage({
  username,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <h1>{username}</h1>
    </>
  );
}

// Por definition run after every request, no need for revalidate
// executes on the server after development
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Enable you to manage cookie data
  const { params, req, res } = context;
  console.log(req);
  console.log(res);
  return {
    props: {
      username: "Max",
    },
  };
};
