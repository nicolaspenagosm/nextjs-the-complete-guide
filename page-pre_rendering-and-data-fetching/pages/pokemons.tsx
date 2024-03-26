import { InferGetStaticPropsType } from "next";
import { useEffect, useState } from "react";
//useSWR(<request-url>, (url) => fetch(url).then(res => res.json()))
import useSWR from "swr";

type Pokemon = {
  name: string;
  url: string;
};

const url = "https://pokeapi.co/api/v2/pokemon?limit=6&offset=20";

export default function PokemonsPage({
  pokemons,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [clientPokemons, setClientPokemons] = useState<Pokemon[]>(pokemons);
  // const [loading, setLoading] = useState(false);

  // Alternative 1

  // useEffect(() => {
  //   setLoading(true);
  //   fetch("https://pokeapi.co/api/v2/pokemon?limit=6&offset=0")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPokemons(data.results);

  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // // This is returned as default page since the fetching is carried out on the client side
  // if (pokemons.length===0) {
  //   return <p>No pokemons yet.</p>;
  // }

  // Alernative 2

  const { data, error } = useSWR(url, (url) =>
    fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) setClientPokemons(data.results);
  }, [data]);

  if (error) return <p>Failed to load!</p>;

  if (!data && clientPokemons.length === 0) return <p>Loading...</p>;

  if (clientPokemons.length === 0) {
    return <p>No pokemons yet.</p>;
  }

  return (
    <ul>
      {clientPokemons.map((p) => (
        <li key={p.name}>{p.name}</li>
      ))}
    </ul>
  );
}

// Fetch is available in the server side thanks to NextJS
export async function getStaticProps() {
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=6&offset=0")
    .then((res) => res.json())
    .then((data) => {
      return { props: { pokemons: data.results }, revalidate: 10 };
    });
}
