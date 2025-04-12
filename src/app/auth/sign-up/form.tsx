"use client";
import VerifyAccount from "@/components/dialogs/verify-account";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .max(20, { message: "Password must be at most 20 characters." }),
  type: z.enum(["importer", "exporter"], {
    required_error: "Please select a user type.",
  }),
});
type FormSchema = z.infer<typeof formSchema>;
export default function SignUpForm() {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const form = useForm<FormSchema>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "importer",
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: FormSchema) {
    setEmail(data.email);
    setOpen(true);
    // redirect("sign-in");
  }

  return (
    <div className="flex gap-4 items-center justify-center h-full">
      <div className="main-card flex items-center flex-col space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-black">
            Create an account
          </h3>
          <p className="text-sm text-secondary">Please enter your details </p>
        </div>
        <div className="my-4">
          <Tabs defaultValue="sign-up" className="w-[400px]">
            <TabsList className="w-full p-0.5 h-14 bg-main-bg rounded-full">
              <TabsTrigger
                value="sign-up"
                className="rounded-3xl data-[state=active]:bg-white data-[state=active]:drop-shadow-[0px 0px 40px 10px rgba(142, 142, 142, 0.25)]"
              >
                sign-up
              </TabsTrigger>
              <TabsTrigger
                disabled
                value="sign-in"
                className="rounded-3xl data-[state=active]:bg-white data-[state=active]:drop-shadow-[0px 0px 40px 10px rgba(142, 142, 142, 0.25)]"
              >
                sign-in
              </TabsTrigger>
            </TabsList>
            <TabsContent value="sign-up" className="space-y-4 mt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            main_icon={
                              <Image
                                src="/images/user.png"
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
                  <FormField
                    control={form.control}
                    name="password"
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
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex items-center justify-between gap-4"
                          >
                            <FormItem className="h-16 w-full   rounded-lg border-2 border-main-bg flex items-center justify-start  px-2 space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="importer" />
                              </FormControl>
                              <FormLabel className="text-lg font-normal">
                                Importer
                              </FormLabel>
                            </FormItem>
                            <FormItem className="h-16 w-full   rounded-lg border-2 border-main-bg flex items-center justify-start px-2 space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="exporter" />
                              </FormControl>
                              <FormLabel className="text-lg font-normal">
                                Exporter
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="h-13 mt-3 rounded-full w-full"
                  >
                    Sign In
                  </Button>
                </form>
              </Form>
              <div className="mt-6 text-center">
                <p className="text-secondary">
                  Already have an account?{" "}
                  <Link
                    href="sign-in"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Login Here
                  </Link>
                </p>
              </div>
            </TabsContent>
          </Tabs>
          {/* <AuthSocial /> */}
        </div>
      </div>
      <VerifyAccount email={email} is_open={open} onOpenChange={setOpen} />
    </div>
  );
}
