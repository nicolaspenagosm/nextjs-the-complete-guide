import { getMeal } from "@/lib/meals";
import classes from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";


// Metadata for dynamic pages

// This runs before the component
export async function generateMetadata(argsObj: {
  params: { mealSlug: string };
}) {
  const meal = getMeal(argsObj.params.mealSlug);
  if (!meal) notFound();
  return {
    title: meal.title,
    description: meal.summary,
  };
}

const MealDetailPage: React.FC<{ params: { mealSlug: string } }> = ({
  params,
}) => {
  const meal = getMeal(params.mealSlug);

  if (!meal) notFound(); // Stop component execution and shows the closet not found page

  meal.instructions = meal.instructions.replace(/\n/g, "<br/>");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image as string} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${"EMAIL"}`}>NAME</a>
          </p>
          <p className={classes.summary}>SUMMARY</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
};

export default MealDetailPage;
