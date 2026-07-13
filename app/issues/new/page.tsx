"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";

interface CreateIssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<CreateIssueForm>();
  const router = useRouter();
  const [errors, setErrors] = useState("");
  return (
    <div className="max-w-xl">
      {errors && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <FaInfoCircle />
          </Callout.Icon>
          <Callout.Text>{errors}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            const response = await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            console.log(error);
            setErrors(
              "Error has errored",
              // error.title._errors.toString()
            );
          }
        })}
      >
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        <Controller
          name={"description"}
          control={control}
          render={({ field }) => (
            <SimpleMDE value={field.value} onChange={field.onChange} />
          )}
        />

        <Button> Submit new issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
