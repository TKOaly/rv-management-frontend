"use client";

import { SubmitButton } from "@/components/ui/submit-button";
import { useToast } from "@/components/ui/use-toast";
import { createCategoryAction } from "@/server/actions/category";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export const CreateCategoryRow = () => {
  const [value, setValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const [state, createCategory] = useFormState<
    ReturnType<typeof createCategoryAction>,
    FormData
  >(createCategoryAction, { success: false });

  const { toast } = useToast();
  useEffect(() => {
    if (state.success && state.createdCategory) {
      setValue("");
      toast({
        title: "Category Created",
        description: `Category "${state.createdCategory.description}" has been created`,
        duration: 6000,
      });
    }
  }, [state.success, state.createdCategory]);

  useEffect(() => {
    if (state.error) {
      toast({
        title: "Failed to create category",
        description: "Please try again",
        duration: 6000,
      });
    }
  }, [state.error]);

  return (
    <div className="group sticky bottom-0 flex items-center justify-start border-t border-gray-200 bg-white p-4">
      <form className="ml-24 flex flex-grow items-center gap-x-2 text-lg">
        <input
          type="text"
          data-next="createCategory"
          className="w-full rounded-md border border-gray-200 p-2"
          placeholder="New Category"
          name="description"
          value={value}
          onChange={onChange}
        />
        <SubmitButton
          type="submit"
          id="createCategory"
          formAction={createCategory}
          variant="green"
          disabled={value.length === 0}
        >
          Create
        </SubmitButton>
      </form>
    </div>
  );
};
