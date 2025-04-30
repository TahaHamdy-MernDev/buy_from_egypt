"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CompanyDetails from "../company-details";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
interface Props {
  is_open: boolean;
  onOpenChange: (open: boolean) => void;
}
const FormSchema = z.object({
  bio: z.string(),
});
type FormValues = z.infer<typeof FormSchema>;
function CreatePost({ is_open, onOpenChange }: Readonly<Props>) {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bio: "",
    },
  });
  function onSubmit(data: FormValues) {
    console.log(data);
  }
  return (
    <Dialog open={is_open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white  p-0">
        <DialogHeader className="text-start space-y-3 bg-main-bg rounded-t-lg p-4">
          <DialogTitle className="text-start font-normal">
            Create Post
          </DialogTitle>
        </DialogHeader>
        <div className="px-4 pt-0 flex items-center justify-between">
          <CompanyDetails />
          <div className="cursor-pointer px-3 py-1 flex items-center justify-between gap-4 rounded-full border border-primary">
            Public
            <ChevronDown />
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 px-4 py-4"
          >
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Launching a new product? Closing a big deal? Let everyone know!"
                      className="resize-none min-h-32 text-secondary border-0 ring-0 focus-visible:ring-0 w-full shadow-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between gap-2 p-4 border border-main-bg rounded-md">
              <div>Add to your post</div>

              <div className="flex items-center justify-start gap-4 ">
                <div className="flex items-center gap-4 justify-start">
                  <Image
                    src="/images/gallery.png"
                    alt="logo"
                    width={24}
                    className="size-6 cursor-pointer"
                    height={24}
                  />
                </div>
                <div className="flex items-center gap-4 justify-start">
                  <Image
                    src="/images/video.png"
                    alt="logo"
                    width={24}
                    className="size-6 cursor-pointer"
                    height={24}
                  />
                </div>
                <div className="flex items-center gap-4 justify-start">
                  <Image
                    src="/images/link.png"
                    alt="logo"
                    width={24}
                    className="size-6  cursor-pointer"
                    height={24}
                  />
                </div>
                <div className="flex items-center gap-4 justify-start">
                  <Image
                    src="/images/event.png"
                    alt="logo"
                    width={24}
                    className="size-6  cursor-pointer"
                    height={24}
                  />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              variant={"default"}
              className="w-full h-10 rounded-full"
            >
              Post
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePost;
