import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaEdit, FaRegComment } from "react-icons/fa";
import ActionButton from "./ui/actionbutton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";

type Props = {};

const Remarks = (props: Props) => {
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
              <form className="flex flex-col w-[100%] gap-4">
                <Textarea placeholder="Add Remark" />
                <div className="flex justify-end gap-4 mt-4">
                  <DialogClose>
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </DialogClose>{" "}
                  <Button variant="outline" type="submit">
                    Edit
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
