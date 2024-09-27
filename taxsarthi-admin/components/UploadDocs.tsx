import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadCloudIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { storage } from "../lib/firebase"; // Ensure this is the correct import
import { ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";

type Props = {
  userData: { name: string; email: string; mobile: string; pan: string; srNo: number };
};

const UploadDocs: React.FC<Props> = ({ userData }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false); // State for dialog visibility

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles(selectedFiles);
      setFileNames(Array.from(selectedFiles).map(file => file.name));
    }
  };

  const handleUpload = async () => {
    if (files) {
      const baseFolder = "ITRAcknowledgement"; // Base folder
      const currentAY = "AY-2024-25"; // Current academic year
      const folderPath = `${baseFolder}/${currentAY}/`; // Complete path

      let uploadSuccessful = true; // Track if uploads were successful

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Check if the file type is PDF
        if (file.type !== "application/pdf") {
          toast.error(`Only PDF files are allowed: ${file.name}`);
          uploadSuccessful = false; // Mark as unsuccessful
          continue; // Skip this file
        }

        const fileName = `${userData.pan}_ITRAcknowledgement${file.name.substring(file.name.lastIndexOf('.'))}`; // Create the file name
        const storageRef = ref(storage, `${folderPath}${fileName}`); // Create the storage reference
        
        try {
          await uploadBytes(storageRef, file);
          // console.log("Uploaded file:", fileName);
          toast.success(`File uploaded: ${fileName}`);
        } catch (error) {
          console.error("Upload failed:", error);
          toast.error(`Failed to upload file: ${fileName}`);
          uploadSuccessful = false; // Mark as unsuccessful
        }
      }

      if (uploadSuccessful) {
        setIsOpen(false); // Close the dialog if all uploads were successful
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <UploadCloudIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Document for {userData.name}</DialogTitle>
          <DialogDescription className="gap-3 pt-4 flex flex-col">
            <Input
              id="picture"
              type="file"
              onChange={handleFileChange}
              className="cursor-pointer"
              accept=".pdf" // Accept only PDF files
            />
            <div className="flex flex-col gap-2 mt-4">
              {fileNames.length > 0 ? (
                <div className="list-disc pl-5">
                  {fileNames.map((fileName, index) => (
                    <p key={index} className="text-sm text-gray-700">
                      {fileName}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No files selected</p>
              )}
            </div>
            <div className="flex gap-4 mt-4">
              <Button onClick={handleUpload}>Upload</Button>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDocs;
