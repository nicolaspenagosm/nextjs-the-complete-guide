"use server";

import { Meal } from "@/components/meals/meal-item";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

function isInvalidText(text: string) {
  return !text || text.trim() === "";
}

export type MealValidationMsg = {
  message: string | null;
};
export async function shareMeal(
  prevState: MealValidationMsg,
  formData: FormData
): Promise<MealValidationMsg> {
  const meal: Meal = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    image: formData.get("image") as File,
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    (meal.image as File).size === 0
  ) {
    return {
      message: "Invalid input.",
    };
  }
  await saveMeal(meal);
  // Tells NextJs to revalidate the cache that belongs to a certain
  // route path (only that path, no nested paths unless you use 'layout'
  // to revalidate nested pages)
  //  revalidatePath("/meals", "layout");
  revalidatePath("/meals");

  redirect("/meals");
}
