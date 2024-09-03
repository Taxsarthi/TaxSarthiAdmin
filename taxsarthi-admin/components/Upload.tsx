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
import { UploadCloudIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {};

const Upload = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <UploadCloudIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription className="gap-3 pt-4 flex flex-col">
            <Input id="picture" type="file"/>
            <div className="flex gap-4">
            <Button>Upload</Button>
            <Button variant="outline">Cancel</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Upload;
