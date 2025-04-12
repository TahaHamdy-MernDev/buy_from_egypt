"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { redirect } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  otp: z
    .string()
    .min(4, { message: "OTP must be at least 4 characters." })
    .max(4, { message: "OTP must be at most 4 characters." }),
});
type FormSchema = z.infer<typeof formSchema>;
function OtpVerificationForm() {
  const form = useForm<FormSchema>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });
  function onSubmit(data: FormSchema) {
    redirect("update-password");
    console.log(data);
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className=" flex items-center justify-center space-y-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        maxLength={4}
                        pattern={REGEXP_ONLY_DIGITS}
                        {...field}
                      >
                        <InputOTPGroup className="gap-2">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              variant={"default"}
              className="h-12 mt-6 rounded-full w-full"
            >
              Verify
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default OtpVerificationForm;
