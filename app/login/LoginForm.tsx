"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { loginSchema, LoginSchema } from "@/lib/schemas/LoginSchema";
import { login } from "@/app/login/actions";

export default function LoginForm() {
  const registerFormMethods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const { handleSubmit, getFieldState, getValues, register } =
    registerFormMethods;

  const router = useRouter();

  const onSubmit = async () => {
    const result = await login(getValues());
    if (result.status === "success") {
      router.push("/dashboard");
      toast.success("Logged In");
    } else {
      toast.error(result.error as string);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="flex flex-col max-w-2xl gap-4">
        <Field data-invalid={getFieldState("email").invalid}>
          <FieldLabel htmlFor="input-email">Email</FieldLabel>
          <Input
            type="text"
            aria-invalid={getFieldState("email").invalid}
            defaultValue={getValues("email")}
            placeholder={"Email"}
            className="flex-1 rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring dark:border-[rgba(93,103,227,0.3)] dark:bg-[rgba(93,103,227,0.1)] dark:text-white dark:placeholder:text-indigo-300/50"
            {...register("email")}
          />
          {getFieldState("email").invalid && (
            <FieldError errors={[getFieldState("email").error]}></FieldError>
          )}
        </Field>
        <Field data-invalid={getFieldState("password").invalid}>
          <FieldLabel htmlFor="input-name">Password</FieldLabel>
          <Input
            type="password"
            aria-invalid={getFieldState("password").invalid}
            defaultValue={getValues("password")}
            placeholder={"Password"}
            className="flex-1 rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring dark:border-[rgba(93,103,227,0.3)] dark:bg-[rgba(93,103,227,0.1)] dark:text-white dark:placeholder:text-indigo-300/50"
            {...register("password")}
          />
          {getFieldState("password").invalid && (
            <FieldError errors={[getFieldState("password").error]}></FieldError>
          )}
        </Field>
        <Button
          className="whitespace-nowrap rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-50 dark:bg-[linear-gradient(135deg,#5d67e3_0%,#8b5cf6_100%)] dark:text-white"
          variant="outline"
          aria-label="Login"
        >
          Login
        </Button>
      </FieldGroup>
    </form>
  );
}
