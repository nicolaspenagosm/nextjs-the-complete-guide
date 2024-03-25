import { useRouter } from "next/router";

const SelectedClientProject: React.FC = () => {
  const router = useRouter();
  return (
    <main>
      <h1>The project page for a specific client project</h1>
      <p>{router.query.clientprojectid}</p>
    </main>
  );
};

export default SelectedClientProject;
