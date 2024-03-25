import { useRouter } from "next/router";

const ClientsProjectsPage: React.FC = () => {
  const router = useRouter();
  function loadProjectHandler() {
    //router.push('/clients/max/projecta');
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: {
        id: "max",
        clientprojectid: "projecta",
      },
    });
  }

  return (
    <main>
      <h1>The projects of a given client are</h1>
      <p>{router.query.id}</p>
      <button onClick={loadProjectHandler}>Load Porject A</button>
    </main>
  );
};

export default ClientsProjectsPage;
