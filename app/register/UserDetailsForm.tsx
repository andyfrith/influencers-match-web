"use client";

import { useFormContext } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/lib/schemas/RegisterSchema";

export default function UserDetailsForm() {
  const { register, getValues, getFieldState } =
    useFormContext<RegisterSchema>();

  return (
    <div className="flex-col gap-2 space-y-6">
      <Field data-invalid={getFieldState("name").invalid}>
        <FieldLabel htmlFor="input-name">Name</FieldLabel>
        <Input
          type="text"
          aria-invalid={getFieldState("name").invalid}
          defaultValue={getValues("name")}
          placeholder={"Register"}
          className="flex-1 rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring dark:border-[rgba(93,103,227,0.3)] dark:bg-[rgba(93,103,227,0.1)] dark:text-white dark:placeholder:text-indigo-300/50"
          {...register("name")}
        />
        {getFieldState("name").invalid && (
          <FieldError errors={[getFieldState("name").error]}></FieldError>
        )}
      </Field>
      <Field data-invalid={getFieldState("email").invalid}>
        <FieldLabel htmlFor="input-email">Email</FieldLabel>
        <Input
          id="input-email"
          type="email"
          aria-invalid={getFieldState("email").invalid}
          placeholder="Email"
          className="flex-1 rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring dark:border-[rgba(93,103,227,0.3)] dark:bg-[rgba(93,103,227,0.1)] dark:text-white dark:placeholder:text-indigo-300/50"
          {...register("email")}
        />
        {getFieldState("email").invalid && (
          <FieldError errors={[getFieldState("email").error]}></FieldError>
        )}
        <FieldDescription>Your email is not shared.</FieldDescription>
      </Field>
      <Field data-invalid={getFieldState("password").invalid}>
        <FieldLabel htmlFor="input-password">Password</FieldLabel>
        <Input
          aria-invalid={getFieldState("password").invalid}
          id="input-password"
          type="password"
          placeholder="Password"
          className="flex-1 rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring dark:border-[rgba(93,103,227,0.3)] dark:bg-[rgba(93,103,227,0.1)] dark:text-white dark:placeholder:text-indigo-300/50"
          {...register("password")}
        />
        {getFieldState("password").invalid && (
          <FieldError errors={[getFieldState("password").error]}></FieldError>
        )}
        <FieldDescription>
          Your password is encrypted and stored securely.
        </FieldDescription>
      </Field>
    </div>
  );
}
