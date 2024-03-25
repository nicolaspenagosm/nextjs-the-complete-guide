"use client";

import { useFormStatus } from "react-dom";

const MealsFormSubmit: React.FC = () => {
  // Hook to get status of the form. It should be inside of the
  // <form></form>
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? "Submitting..." : "Share Meal"}
    </button>
  );
};

export default MealsFormSubmit;
