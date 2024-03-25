import { useRouter } from "next/router";

const BlogPostPage: React.FC = () => {
  const router = useRouter();
  // Catch all path
  console.log(router.query);
  return (
    <main>
      <h1>The Blog Post</h1>
    </main>
  );
};

export default BlogPostPage;
