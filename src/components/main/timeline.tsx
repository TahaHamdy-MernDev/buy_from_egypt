"use client";
import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Button } from "../ui/button";
import {
  ArrowRight,
  ArrowUpDown,
  ArrowUpRight,
  Bookmark,
  ChevronDown,
  MessageSquareDot,
  Star,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Toggle } from "../ui/toggle";
import CreatePost from "../dialogs/create-post";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import CompanyDetails from "../company-details";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { StarRating } from "../ui/star-rating";
import Link from "next/link";

function Timeline() {
  return (
    <div className="flex flex-col gap-4">
      <NewTimelineItem />
      <TimelineItem />
      <TimelineItem />
      <TimelineItem />
    </div>
  );
}

export default Timeline;

const NewItemFormSchema = z.object({
  title: z.string(),
});
type NewItemFormSchema = z.infer<typeof NewItemFormSchema>;
function NewTimelineItem() {
  const [open, setOpen] = React.useState<boolean>(false);
  const form = useForm<NewItemFormSchema>({
    resolver: zodResolver(NewItemFormSchema),
    defaultValues: {
      title: "",
    },
  });
  function onSubmit(data: NewItemFormSchema) {
    console.log(data);
  }
  return (
    <div className="main-card">
      <div className="flex items-start justify-center gap-4">
        <Image
          src="/images/user-placeholder.png"
          alt="logo"
          width={24}
          className="size-10 rounded-full object-contain"
          height={24}
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex items-center justify-start gap-1"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="What are you selling ?"
                      className="flex-1 border-0 shadow-none bg-main-bg h-10 rounded-full"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="flex-0 rounded-full size-10">
              <ArrowRight className="size-5" />
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex items-center gap-4 justify-between mt-6">
        <div className="flex items-center justify-start gap-4">
          <div className="flex items-center gap-4 justify-start">
            <Image
              src="/images/gallery.png"
              alt="logo"
              width={24}
              className="size-6"
              height={24}
            />
            <p className="text-sm">Image</p>
          </div>
          <div className="flex items-center gap-4 justify-start">
            <Image
              src="/images/video.png"
              alt="logo"
              width={24}
              className="size-6"
              height={24}
            />
            <p className="text-sm">Video</p>
          </div>
          <div className="flex items-center gap-4 justify-start">
            <Image
              src="/images/link.png"
              alt="logo"
              width={24}
              className="size-6  "
              height={24}
            />
            <p className="text-sm">Attachment</p>
          </div>
          <div className="flex items-center gap-4 justify-start">
            <Image
              src="/images/event.png"
              alt="logo"
              width={24}
              className="size-6  "
              height={24}
            />
            <p className="text-sm">Event</p>
          </div>
        </div>
        <div>
          <Select defaultValue="private">
            <SelectTrigger className="w-[100px] cursor-pointer border-0 shadow-none bg-transparent">
              <SelectValue placeholder="private" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="public">public</SelectItem>
              <SelectItem value="private">private</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <CreatePost is_open={open} onOpenChange={setOpen} />
    </div>
  );
}
function TimelineItem() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [rateOpen, setRateOpen] = React.useState<boolean>(false);
  const [isListOpen, setIsListOpen] = React.useState<boolean>(false);
  return (
    <article className="main-card py-6 mb-4">
      <div className=" flex items-center justify-between">
        <div className="flex items-center gap-2 justify-start">
          <Image
            src={"/images/user-placeholder.png"}
            alt="logo"
            width={24}
            className="size-14 rounded-full object-contain"
            height={24}
          />
          <div className="flex items-start justify-start flex-col gap-0.5">
            <h4 className="capitalize text-xl font-semibold ">Company Name</h4>
            <p className="text-base">2 days ago</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Toggle variant={"save"}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="size-6 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Linear / School / Bookmark">
                <path
                  id="Vector"
                  d="M21 16.0909V11.0975C21 6.80891 21 4.6646 19.682 3.3323C18.364 2 16.2426 2 12 2C7.75736 2 5.63604 2 4.31802 3.3323C3 4.6646 3 6.80891 3 11.0975V16.0909C3 19.1875 3 20.7358 3.73411 21.4123C4.08421 21.735 4.52615 21.9377 4.99692 21.9915C5.98402 22.1045 7.13673 21.0849 9.44216 19.0458C10.4612 18.1445 10.9708 17.6938 11.5603 17.5751C11.8506 17.5166 12.1494 17.5166 12.4397 17.5751C13.0292 17.6938 13.5388 18.1445 14.5578 19.0458C16.8633 21.0849 18.016 22.1045 19.0031 21.9915C19.4739 21.9377 19.9158 21.735 20.2659 21.4123C21 20.7358 21 19.1875 21 16.0909Z"
                  // stroke="#3B3C36"
                  strokeWidth="1.5"
                />
                <path
                  id="Vector_2"
                  d="M15 6H9"
                  // stroke="#3B3C36"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </Toggle>
          <Button
            onClick={() => setIsListOpen(true)}
            className="size-12 bg-transparent shadow-none flex-center hover:bg-transparent p-0"
          >
            <Image
              src="/images/menu-dots.png"
              alt="menu-dots"
              width={24}
              className="size-6 object-contain"
              height={24}
            />
          </Button>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, magnam
          quos. Quae, magnam quos. Quae, magnam quos. Quae, magnam quos. Quae,
          magnam quos. Quae, magnam quos. Quae, magnam quos. Quae, magnam quos.
        </p>
        <Image
          src={"/images/card-image.png"}
          alt="card-image"
          width={1000}
          className="h-96 w-full mt-3 rounded-2xl object-cover"
          height={800}
        />
      </div>
      <div className="flex items-center justify-start gap-2 mt-3">
        <p>5 comments</p>
        <span className="w-2 h-2 bg-primary rounded-full"></span>
        <p>300/500 Rate</p>
      </div>
      <div className="mt-4 flex items-center justify-evenly gap-4">
        <Button
          className="flex-center gap-2 cursor-pointer bg-transparent shadow-none border-0 hover:bg-gray-50"
          onClick={() => setRateOpen(true)}
        >
          <Image
            src="/star.png"
            alt="rate"
            width={24}
            className="size-6"
            height={24}
          />
          <p className="text-base text-secondary">Rate</p>
        </Button>
        <div className="flex-center gap-2">
          <Image
            src="/chat-unread.png"
            alt="comment"
            width={24}
            className="size-6"
            height={24}
          />
          <p className="text-base text-secondary">Comment</p>
        </div>
        <Button
          onClick={() => setOpen(true)}
          className="h-11 rounded-full px-5 py-3"
        >
          Show More <ArrowUpRight />
        </Button>
      </div>
      <PostDetails is_open={open} onOpenChange={setOpen} />
      <RatePost open={rateOpen} setOpen={setRateOpen} rate={"0"} />
      <PostList isListOpen={isListOpen} setIsListOpen={setIsListOpen} />
    </article>
  );
}

const PostList = ({
  isListOpen,
  setIsListOpen,
}: {
  isListOpen: boolean;
  setIsListOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog open={isListOpen} onOpenChange={setIsListOpen}>
      <DialogContent className="bg-white w-md">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex items-start flex-col gap-4 mt-0">
          <Link
            href="/edit-post"
            className="flex items-center justify-start w-full rounded-full px-4 gap-4 h-10 hover:bg-main-bg"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="size-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="edit">
                <path
                  id="Vector"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C12.4142 1.25 12.75 1.58579 12.75 2C12.75 2.41421 12.4142 2.75 12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 11.5858 21.5858 11.25 22 11.25C22.4142 11.25 22.75 11.5858 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM16.7705 2.27591C18.1384 0.908028 20.3562 0.908028 21.7241 2.27591C23.092 3.6438 23.092 5.86158 21.7241 7.22947L15.076 13.8776C14.7047 14.2489 14.4721 14.4815 14.2126 14.684C13.9069 14.9224 13.5761 15.1268 13.2261 15.2936C12.929 15.4352 12.6169 15.5392 12.1188 15.7052L9.21426 16.6734C8.67801 16.8521 8.0868 16.7126 7.68711 16.3129C7.28742 15.9132 7.14785 15.322 7.3266 14.7857L8.29477 11.8812C8.46079 11.3831 8.56479 11.071 8.7064 10.7739C8.87319 10.4239 9.07761 10.0931 9.31605 9.78742C9.51849 9.52787 9.7511 9.29529 10.1224 8.924L16.7705 2.27591ZM20.6634 3.33657C19.8813 2.55448 18.6133 2.55448 17.8312 3.33657L17.4546 3.7132C17.4773 3.80906 17.509 3.92327 17.5532 4.05066C17.6965 4.46372 17.9677 5.00771 18.48 5.51999C18.9923 6.03227 19.5363 6.30346 19.9493 6.44677C20.0767 6.49097 20.1909 6.52273 20.2868 6.54543L20.6634 6.16881C21.4455 5.38671 21.4455 4.11867 20.6634 3.33657ZM19.1051 7.72709C18.5892 7.50519 17.9882 7.14946 17.4193 6.58065C16.8505 6.01185 16.4948 5.41082 16.2729 4.89486L11.2175 9.95026C10.801 10.3668 10.6376 10.532 10.4988 10.7099C10.3274 10.9297 10.1804 11.1676 10.0605 11.4192C9.96337 11.623 9.88868 11.8429 9.7024 12.4017L9.27051 13.6974L10.3026 14.7295L11.5983 14.2976C12.1571 14.1113 12.377 14.0366 12.5808 13.9395C12.8324 13.8196 13.0703 13.6726 13.2901 13.5012C13.468 13.3624 13.6332 13.199 14.0497 12.7825L19.1051 7.72709Z"
                  fill="#3B3C36"
                />
              </g>
            </svg>
            <p className="text-base font-semibold">Edit post</p>
          </Link>
          <Link
            href="/"
            className="flex items-center justify-start w-full rounded-full px-4 gap-4 h-10 hover:bg-main-bg"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="link">
                <path
                  id="Vector"
                  d="M7.9175 17.8068L15.8084 10.2535C16.7558 9.34668 16.7558 7.87637 15.8084 6.96951C14.861 6.06265 13.325 6.06265 12.3776 6.96951L4.54387 14.4681C2.74382 16.1911 2.74382 18.9847 4.54387 20.7077C6.34391 22.4308 9.26237 22.4308 11.0624 20.7077L19.0105 13.0997C21.6632 10.5605 21.6632 6.44362 19.0105 3.90441C16.3578 1.3652 12.0569 1.3652 9.40419 3.90441L3 10.0346"
                  stroke="#3B3C36"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
            </svg>
            <p className="text-base font-semibold">Copy link</p>
          </Link>
          <Link
            href="/"
            className="flex items-center justify-start w-full rounded-full px-4 gap-4 h-10 hover:bg-main-bg"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="pin">
                <path
                  id="Vector"
                  d="M15.9894 4.9502L16.52 4.42014V4.42014L15.9894 4.9502ZM19.0716 8.03562L18.541 8.56568L19.0716 8.03562ZM8.73837 19.429L8.20777 19.9591L8.73837 19.429ZM4.62169 15.3081L5.15229 14.7781L4.62169 15.3081ZM17.5669 14.9943L17.3032 14.2922L17.5669 14.9943ZM15.6498 15.7146L15.9136 16.4167H15.9136L15.6498 15.7146ZM8.3322 8.38177L7.62798 8.12375L8.3322 8.38177ZM9.02665 6.48636L9.73087 6.74438V6.74438L9.02665 6.48636ZM5.84504 10.6735L6.04438 11.3965L5.84504 10.6735ZM7.30167 10.1351L6.86346 9.52646L6.86346 9.52646L7.30167 10.1351ZM7.67582 9.79038L8.24665 10.2768H8.24665L7.67582 9.79038ZM14.251 16.3805L14.742 16.9475L14.742 16.9475L14.251 16.3805ZM13.3806 18.2012L12.6574 18.0022V18.0022L13.3806 18.2012ZM13.9169 16.7466L13.3075 16.3094L13.3075 16.3094L13.9169 16.7466ZM2.71846 12.7552L1.96848 12.76L1.96848 12.76L2.71846 12.7552ZM2.93045 11.9521L2.28053 11.5778H2.28053L2.93045 11.9521ZM11.3052 21.3431L11.3064 20.5931H11.3064L11.3052 21.3431ZM12.0933 21.1347L11.7215 20.4833L11.7215 20.4833L12.0933 21.1347ZM11.6973 2.03606L11.8588 2.76845L11.6973 2.03606ZM1.4694 21.4699C1.17666 21.763 1.1769 22.2379 1.46994 22.5306C1.76298 22.8233 2.23786 22.8231 2.5306 22.5301L1.4694 21.4699ZM7.18383 17.8721C7.47657 17.5791 7.47633 17.1042 7.18329 16.8114C6.89024 16.5187 6.41537 16.5189 6.12263 16.812L7.18383 17.8721ZM15.4588 5.48026L18.541 8.56568L19.6022 7.50556L16.52 4.42014L15.4588 5.48026ZM9.26897 18.8989L5.15229 14.7781L4.09109 15.8382L8.20777 19.9591L9.26897 18.8989ZM17.3032 14.2922L15.386 15.0125L15.9136 16.4167L17.8307 15.6964L17.3032 14.2922ZM9.03642 8.63979L9.73087 6.74438L8.32243 6.22834L7.62798 8.12375L9.03642 8.63979ZM6.04438 11.3965C6.75583 11.2003 7.29719 11.0625 7.73987 10.7438L6.86346 9.52646C6.69053 9.65097 6.46601 9.72428 5.6457 9.95044L6.04438 11.3965ZM7.62798 8.12375C7.33502 8.92332 7.24338 9.14153 7.10499 9.30391L8.24665 10.2768C8.60041 9.86175 8.7823 9.33337 9.03642 8.63979L7.62798 8.12375ZM7.73987 10.7438C7.92696 10.6091 8.09712 10.4523 8.24665 10.2768L7.10499 9.30391C7.0337 9.38757 6.9526 9.46229 6.86346 9.52646L7.73987 10.7438ZM15.386 15.0125C14.697 15.2714 14.1716 15.4571 13.76 15.8135L14.742 16.9475C14.9028 16.8082 15.1192 16.7152 15.9136 16.4167L15.386 15.0125ZM14.1037 18.4001C14.329 17.5813 14.4021 17.3569 14.5263 17.1838L13.3075 16.3094C12.9902 16.7517 12.8529 17.2919 12.6574 18.0022L14.1037 18.4001ZM13.76 15.8135C13.5903 15.9605 13.4384 16.1269 13.3075 16.3094L14.5263 17.1838C14.5887 17.0968 14.6611 17.0175 14.742 16.9475L13.76 15.8135ZM5.15229 14.7781C4.50615 14.1313 4.06799 13.691 3.78366 13.3338C3.49835 12.9753 3.46889 12.8201 3.46845 12.7505L1.96848 12.76C1.97215 13.3422 2.26127 13.8297 2.61002 14.2679C2.95976 14.7073 3.47115 15.2176 4.09109 15.8382L5.15229 14.7781ZM5.6457 9.95044C4.80048 10.1835 4.10396 10.3743 3.58296 10.5835C3.06341 10.792 2.57116 11.0732 2.28053 11.5778L3.58038 12.3264C3.615 12.2663 3.71693 12.146 4.1418 11.9755C4.56523 11.8055 5.16337 11.6394 6.04438 11.3965L5.6457 9.95044ZM3.46845 12.7505C3.46751 12.6016 3.50616 12.4553 3.58038 12.3264L2.28053 11.5778C2.07354 11.9372 1.96586 12.3452 1.96848 12.76L3.46845 12.7505ZM8.20777 19.9591C8.83164 20.5836 9.34464 21.0987 9.78647 21.4506C10.227 21.8015 10.7179 22.0922 11.3041 22.0931L11.3064 20.5931C11.2369 20.593 11.0814 20.5644 10.721 20.2773C10.3618 19.9912 9.91923 19.5499 9.26897 18.8989L8.20777 19.9591ZM12.6574 18.0022C12.4133 18.8897 12.2462 19.4924 12.0751 19.9188C11.9033 20.3467 11.7821 20.4487 11.7215 20.4833L12.465 21.7861C12.974 21.4956 13.2573 21.0004 13.4671 20.4775C13.6776 19.9532 13.8694 19.2516 14.1037 18.4001L12.6574 18.0022ZM11.3041 22.0931C11.7112 22.0937 12.1114 21.9879 12.465 21.7861L11.7215 20.4833C11.595 20.5555 11.4519 20.5933 11.3064 20.5931L11.3041 22.0931ZM18.541 8.56568C19.6045 9.63022 20.3403 10.3695 20.7917 10.9788C21.2353 11.5774 21.2863 11.8959 21.2321 12.1464L22.6982 12.4634C22.8881 11.5854 22.5382 10.8162 21.9969 10.0857C21.4635 9.36592 20.6305 8.53486 19.6022 7.50556L18.541 8.56568ZM17.8307 15.6964C19.1921 15.1849 20.294 14.773 21.0771 14.3384C21.8718 13.8973 22.5083 13.3416 22.6982 12.4634L21.2321 12.1464C21.178 12.3968 21.0001 12.6655 20.3491 13.0268C19.6865 13.3946 18.7112 13.7632 17.3032 14.2922L17.8307 15.6964ZM16.52 4.42014C15.4841 3.3832 14.6481 2.54353 13.9246 2.00638C13.1908 1.46165 12.4175 1.10912 11.5357 1.30367L11.8588 2.76845C12.1086 2.71335 12.4277 2.7633 13.0304 3.21075C13.6433 3.66579 14.3876 4.40801 15.4588 5.48026L16.52 4.42014ZM9.73087 6.74438C10.2525 5.32075 10.6161 4.33403 10.9812 3.66315C11.3402 3.00338 11.609 2.82357 11.8588 2.76845L11.5357 1.30367C10.654 1.49819 10.1005 2.14332 9.66362 2.94618C9.23278 3.73793 8.82688 4.85154 8.32243 6.22834L9.73087 6.74438ZM2.5306 22.5301L7.18383 17.8721L6.12263 16.812L1.4694 21.4699L2.5306 22.5301Z"
                  fill="#3B3C36"
                />
              </g>
            </svg>
            <p className="text-base font-semibold">Pin post</p>
          </Link>
          <Link
            href="/"
            className="flex items-center justify-start w-full rounded-full px-4 gap-4 h-10 hover:bg-main-bg"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="delete">
                <path
                  id="Vector"
                  d="M20.5001 6H3.5"
                  stroke="#3B3C36"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  id="Vector_2"
                  d="M18.8337 8.5L18.3737 15.3991C18.1967 18.054 18.1082 19.3815 17.2432 20.1907C16.3782 21 15.0478 21 12.387 21H11.6136C8.95284 21 7.62244 21 6.75743 20.1907C5.89242 19.3815 5.80393 18.054 5.62693 15.3991L5.16699 8.5"
                  stroke="#3B3C36"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  id="Vector_3"
                  d="M9.5 11L10 16"
                  stroke="#3B3C36"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  id="Vector_4"
                  d="M14.5 11L14 16"
                  stroke="#3B3C36"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  id="Vector_5"
                  d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
                  stroke="#3B3C36"
                  strokeWidth="1.5"
                />
              </g>
            </svg>
            <p className="text-base font-semibold">Delete Post</p>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};
const PostDetailsFormSchema = z.object({
  comment: z.string(),
});
type PostDetailsFormType = z.infer<typeof PostDetailsFormSchema>;
const PostDetails = ({
  is_open,
  onOpenChange,
}: Readonly<{ is_open: boolean; onOpenChange: (open: boolean) => void }>) => {
  const form = useForm<PostDetailsFormType>({
    resolver: zodResolver(PostDetailsFormSchema),
    defaultValues: {
      comment: "",
    },
  });
  function onSubmit(data: PostDetailsFormType) {
    console.log(data);
  }
  return (
    <Dialog open={is_open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white  p-0 !w-2xl">
        <ScrollArea className="w-full h-[800px] relative">
          <DialogHeader className="text-start space-y-3 bg-main-bg rounded-t-lg p-4">
            <DialogTitle className="text-start font-normal">
              Post Details
            </DialogTitle>
          </DialogHeader>
          <div className="px-4 my-4">
            <div className=" pt-0 flex items-center justify-between">
              <CompanyDetails type="time" time="2 days ago" />
              <div className="flex items-center justify-end gap-2">
                <Toggle variant={"circle"}>
                  <Image
                    src="/images/saves.png"
                    alt="saves"
                    width={24}
                    className="size-6"
                    height={24}
                  />
                </Toggle>
                <div className="size-12 bg-main-bg rounded-full flex-center">
                  <Image
                    src="/images/menu-dots.png"
                    alt="menu-dots"
                    width={24}
                    className="size-6"
                    height={24}
                  />
                </div>
              </div>
            </div>
            <div className="mt-3 ">
              <p className="text-base">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </p>
              <Image
                src={"/images/card-image.png"}
                alt="card-image"
                width={1000}
                className="h-96 w-full mt-3 rounded-2xl object-cover"
                height={800}
              />
            </div>
            <div className="flex items-center justify-start gap-2 mt-3">
              <p>5 comments</p>
              <span className="w-2 h-2 bg-primary rounded-full" />
              <p>300/500 Rate</p>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                Comments
                <Badge className="bg-primary text-white">50</Badge>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpDown size={16} />
                Most recent
                <ChevronDown size={16} />
              </div>
            </div>
            <div className="flex items-start mt-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2 ml-2">
                <div className="flex items-center gap-2">
                  Mohamed Talaat
                  <span className="text-xs text-neutral-400 font-bold">
                    5 hours ago
                  </span>
                </div>
                <div className="flex items-center justify-start gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <Star className="w-4 h-4 fill-neutral-700" />
                </div>
              </div>
            </div>
            <div className="mt-4 mb-36">
              <p className="text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
            <div className="mt-4 bg-zinc-100 rounded-xl py-2 px-2 absolute bottom-2 left-0 right-0  mx-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full flex flex-col items-center justify-start gap-1"
                >
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Textarea
                            placeholder="Add a comment..."
                            className="resize-none w-full border-0 shadow-none bg-transparent outline-none focus-visible:ring-0"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="w-full flex items-center justify-between gap-4">
                    <div className="flex items-center justify-start gap-4">
                      <div className="flex items-center gap-4 justify-start">
                        <Image
                          src="/images/gallery.png"
                          alt="logo"
                          width={24}
                          className="size-6"
                          height={24}
                        />
                      </div>
                      <div className="flex items-center gap-4 justify-start">
                        <Image
                          src="/images/video.png"
                          alt="logo"
                          width={24}
                          className="size-6"
                          height={24}
                        />
                      </div>
                      <div className="flex items-center gap-4 justify-start">
                        <Image
                          src="/images/link.png"
                          alt="logo"
                          width={24}
                          className="size-6  "
                          height={24}
                        />
                      </div>
                      <div className="flex items-center gap-4 justify-start">
                        <Image
                          src="/images/event.png"
                          alt="logo"
                          width={24}
                          className="size-6  "
                          height={24}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-32 rounded-full">
                      Send
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const RatePostSchema = z.object({
  rate: z.string().min(0).max(5),
});

type RatePostType = z.infer<typeof RatePostSchema>;
const RatePost = ({
  open,
  setOpen,
  rate,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  rate: string;
}) => {
  const form = useForm<RatePostType>({
    resolver: zodResolver(RatePostSchema),
    defaultValues: {
      rate: rate,
    },
  });
  const onSubmit = (data: RatePostType) => {
    console.log(data);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white  p-0">
        <DialogHeader className="text-start space-y-3 bg-main-bg rounded-t-lg p-4">
          <DialogTitle className="text-start font-normal">Rate</DialogTitle>
        </DialogHeader>
        <div className="px-4 pt-4 flex flex-col items-start justify-between">
          <h3 className="text-xl font-medium">
            Your Opinion Matters! Rate This Post
          </h3>
          <p className="text-lg text-secondary">
            Help others by rating this post—your feedback counts!
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 px-4 py-4"
          >
            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <StarRating
                      size="lg"
                      className="w-full flex items-center justify-center"
                      defaultValue={0}
                      onRate={(rating) => field.onChange(String(rating))}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full rounded-full">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
