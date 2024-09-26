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

type UserData = {
  remark: string; 
};

type Props = {
  userData: UserData; 
};

const Remarks: React.FC<Props> = ({ userData }) => {
  const [remark, setRemark] = useState(userData.remark || "");

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
        body: JSON.stringify({ remark }), // Send only the remark
      });

      if (!response.ok) {
        throw new Error('Failed to add remark');
      }

      const data = await response.json();
      alert(data.message);
      setRemark(""); // Clear the remark input after submission
    } catch (error) {
      console.error("Error adding remark:", error);
      toast.error("Failed to add remark");
    }
  };

  // Optional: Effect to sync initial userData remark
  useEffect(() => {
    setRemark(userData.remark);
  }, [userData.remark]);

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <ActionButton
            icon={<FaRegComment />}
            label="Remark"
            color="text-yellow-600"
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
                    <Button variant="outline" type="button">
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
