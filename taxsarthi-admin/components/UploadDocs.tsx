import React, { useState } from "react";
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

const Upload: React.FC<Props> = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);

  // Function to handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles(selectedFiles);
      setFileNames(Array.from(selectedFiles).map(file => file.name));
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <UploadCloudIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription className="gap-3 pt-4 flex flex-col">
            <Input
              id="picture"
              type="file"
              multiple
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            <div className="flex flex-col gap-2 mt-4">
              {fileNames.length > 0 ? (
                <ul className="list-disc pl-5">
                  {fileNames.map((fileName, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {fileName}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No files selected</p>
              )}
            </div>
            <div className="flex gap-4 mt-4">
              <Button
                onClick={() => {
                  if (files) {
                    console.log("Uploading files:", files);
                    // Implement file upload logic here
                  }
                }}
              >
                Upload
              </Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Upload;
