import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Queries from "./Queries";
import dynamic from "next/dynamic";

type Props = {};

const QueriesPopup = (props: Props) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Queries />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Queries</DialogTitle>
            <DialogDescription>
              <div>
                
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default dynamic(() => Promise.resolve(QueriesPopup), {ssr: false});
