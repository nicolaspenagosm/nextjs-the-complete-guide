import classes from "./meals-grid.module.css";
import MealItem, { Meal } from "./meal-item";

const MealsGrid: React.FC<{ meals: Meal[] }> = ({ meals }) => {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id} >
          <MealItem meal={meal} />
        </li>
      ))}
    </ul>
  );
};

export default MealsGrid;