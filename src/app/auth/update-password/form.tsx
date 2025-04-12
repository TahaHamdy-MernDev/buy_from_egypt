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
import { redirect } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .max(20, { message: "Password must be at most 20 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .max(20, { message: "Password must be at most 20 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });
type FormSchema = z.infer<typeof formSchema>;
function UpdatePasswordForm() {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const form = useForm<FormSchema>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  function onSubmit(data: FormSchema) {
    console.log(data);
    redirect("updated-successfully");
  }
  return (
    <div className="flex gap-4 items-center justify-center h-full">
      <div className="main-card max-w-md flex items-center flex-col space-y-6">
        <div className="text-center mb-10">
          <h3 className="text-2xl mb-4 font-semibold text-black">
            OTP Verification
          </h3>
          <p className="text-sm text-secondary">
            Enter 4 digits verification code we have send to your email
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="*************"
                      type={showPassword ? "text" : "password"}
                      main_icon={
                        <Image
                          src="/images/lock.png"
                          alt="lock"
                          height={26}
                          width={26}
                        />
                      }
                      second_icon={
                        <Image
                          src={
                            showPassword
                              ? "/images/eye.png"
                              : "/images/Eye Closed.png"
                          }
                          alt="eye"
                          className="cursor-pointer"
                          height={26}
                          width={26}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="*************"
                      type={showPassword ? "text" : "password"}
                      main_icon={
                        <Image
                          src="/images/lock.png"
                          alt="lock"
                          height={26}
                          width={26}
                        />
                      }
                      second_icon={
                        <Image
                          src={
                            showPassword
                              ? "/images/eye.png"
                              : "/images/Eye Closed.png"
                          }
                          alt="eye"
                          className="cursor-pointer"
                          height={26}
                          width={26}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="h-13 mt-3 rounded-full w-full">
              Confirm
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default UpdatePasswordForm;
