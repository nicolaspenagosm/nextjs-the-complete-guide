import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";
import { Metadata } from "next";

// Metadata for static pages
export const metadata: Metadata = {
  title: "All meals",
  description: "Browse the delicius meas shared by our vibrant community.",
};

const Meals: React.FC = async () => {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
};

const MealsPage: React.FC = async () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meal, created by{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;
