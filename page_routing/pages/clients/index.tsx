import Link from "next/link";

const ClientsPage: React.FC = () => {
  const clients = [
    { id: "max", name: "Maximilian" },
    { id: "manu", name: "Manuel" },
  ];
  return (
    <main>
      <h1>Clients</h1>
      <ul>
        {clients.map((el) => (
          <li key={el.id}>
            {/* <Link href={`/clients/${el.id}`}>{el.name}</Link> */}
            <Link
              href={{
                pathname: "/clients/[id]",
                query: { id: el.id },
              }}
            >
              {el.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ClientsPage;
