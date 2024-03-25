import Link from "next/link";
import Image from "next/image";

import classes from "./meal-item.module.css";
export interface Meal {
  id?: string;
  title: string;
  image: File | string;
  creator: string;
  creator_email: string;
  summary: string;
  slug?: string;
  instructions: string;
}

const MealItem: React.FC<{ meal: Meal }> = ({ meal }) => {

  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={meal.image as string} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{meal.title}</h2>
          <p>by {meal.creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{meal.summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${meal.slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
};

export default MealItem;
