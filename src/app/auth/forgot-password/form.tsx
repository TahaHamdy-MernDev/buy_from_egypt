"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});
type FormSchema = z.infer<typeof formSchema>;
function ForgotPasswordForm() {
  const form = useForm<FormSchema>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  function onSubmit(data: FormSchema) {
    redirect("otp-verification");
    console.log(data);
  }
  return (
    <div className="flex gap-4 items-center justify-center h-full">
      <div className="main-card max-w-md flex items-center flex-col space-y-6">
        <div className="text-center mb-10">
          <h3 className="text-2xl mb-4 font-semibold text-black">
            Forget Password
          </h3>
          <p className="text-sm text-secondary">
            No stress! Just tell us where to send your reset link, and you’ll be
            back in no time.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@example.com"
                      type="email"
                      main_icon={
                        <Image
                          src="/images/letter.png"
                          alt="email"
                          height={26}
                          width={26}
                        />
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="h-12 mt-6 rounded-full w-full">
              SendOTP
            </Button>
          </form>
        </Form>
        <p className="text-sm text-secondary">
          Remembered it?{" "}
          <Link href="sign-in" className="text-black  hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
