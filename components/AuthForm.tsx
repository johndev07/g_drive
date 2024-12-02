"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const formSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().min(2),
});

type props = {
  type: "sign-in" | "sign-up";
};

const authFormSchema = (type: "sign-in" | "sign-up") => {
  return z.object({
    email: z.string({ required_error: "please enter your email" }).email(),
    fullName:
      type == "sign-in" ? z.string().min(2).max(50) : z.string().optional(),
  });
};

const AuthForm = ({ type }: props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type == "sign-in" ? "Sign In" : "Sign up"}
          </h1>
          {type == "sign-in" && (
            <>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <div className="shad-form-item">
                      <FormLabel>Full Name</FormLabel>
                    </div>
                    <FormControl>
                      <Input placeholder="full name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Email" {...field} />
                  </FormControl>
                </div>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            {type == "sign-in" ? "Sign In" : "Sign Up"}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>
          {errorMessage && <p className="error-message"> {errorMessage}</p>}
          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type == "sign-in"
                ? "Don't have an account"
                : "Already have an account"}
            </p>
            <Link
              href={type == "sign-in" ? "/sign-up" : "sign-in"}
              className="ml-1 font-medium text-brand"
            >
              {type == "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AuthForm;
