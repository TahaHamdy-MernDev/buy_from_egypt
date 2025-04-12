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
interface Props {
  is_open: boolean;
  onOpenChange: (open: boolean) => void;
}
function CreatePost({ is_open, onOpenChange }: Readonly<Props>) {
  return (
    <Dialog open={is_open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white  p-0">
        <DialogHeader className="text-start space-y-3 bg-main-bg rounded-t-lg p-4">
          <DialogTitle className="text-start font-normal">
            Create Post
          </DialogTitle>
        </DialogHeader>
        <div className="px-4 pt-0">
          <CompanyDetails />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePost;
