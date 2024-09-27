import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaRegComment } from "react-icons/fa";
import ActionButton from "./ui/actionbutton";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import toast from "react-hot-toast";

type Props = {
  userData: any; 
};

const Remarks: React.FC<Props> = ({ userData }) => {
  const [remark, setRemark] = useState(userData.remark || "");
  const [isOpen, setIsOpen] = useState(false); // State for dialog open/close

  // Handle form submission to update the remark
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!remark.trim()) {
      toast.error("Remark cannot be empty");
      return;
    }

    try {
      const response = await fetch('/api/add-user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...userData, remark }), // Include userData and new remark
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Failed to update remark');
      }

      const data = await response.json();
      toast.success("Remark updated successfully!");
      setRemark(data.updatedRemark || remark); // Update the remark state with the response
      
      // Close the dialog on success
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating remark:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update remark");
    }
  };

  useEffect(() => {
    setRemark(userData.remark || "");
  }, [userData.remark]);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <ActionButton
            icon={<FaRegComment />}
            label="Remark"
            color="text-yellow-600"
            onClick={() => setIsOpen(true)} // Open the dialog
          />
        </DialogTrigger>
        <DialogContent className="max-w-[60vw] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="mb-4 text-xl font-semibold">
              Add Remark
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit} className="flex flex-col w-[100%] gap-4">
                <Textarea 
                  name="remark" 
                  value={remark} 
                  onChange={(e) => setRemark(e.target.value)} 
                  placeholder="Add Remark" 
                />
                <div className="flex justify-end gap-4 mt-4">
                  <DialogClose>
                    <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">
                    Save
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Remarks;
