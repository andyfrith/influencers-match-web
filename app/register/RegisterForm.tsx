"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { registerSchema, RegisterSchema } from "@/lib/schemas/RegisterSchema";
import UserDetailsForm from "@/app/register/UserDetailsForm";
import { registerUser } from "./actions";

export default function RegisterForm() {
  const registerFormMethods = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = registerFormMethods;

  const onSubmit = async () => {
    const result = await registerUser(getValues());
    console.log(result);
  };

  const onNext = async () => {
    await onSubmit();
  };

  return (
    <FormProvider {...registerFormMethods}>
      <form onSubmit={handleSubmit(onNext)}>
        <FieldGroup className="flex flex-col max-w-2xl gap-4">
          <UserDetailsForm />
          <div className="flex gap-2">
            <Button
              className="whitespace-nowrap rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-50 dark:bg-[linear-gradient(135deg,#5d67e3_0%,#8b5cf6_100%)] dark:text-white"
              variant="outline"
              aria-label="Submit"
            >
              Submit
            </Button>
          </div>
        </FieldGroup>
      </form>
    </FormProvider>
  );
}
