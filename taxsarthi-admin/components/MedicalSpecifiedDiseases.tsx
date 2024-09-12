import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Props = {
  open: boolean;
  onClose: () => void;
};

const MedicalSpecifiedDiseases = ({ open, onClose }: Props) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="w-auto max-w-[99%] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              80DDB- Medical treatment of specified diseases
            </DialogTitle>
            <DialogDescription className="pt-2">
              <Table className="border rounded-md">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black font-semibold">
                      In respect of
                    </TableHead>
                    <TableHead className="text-black font-semibold">
                      Expenditure
                    </TableHead>
                    <TableHead className="text-black font-semibold">
                      Claim received
                    </TableHead>
                    <TableHead className="text-black font-semibold">
                      Deduction
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Senior Citizens (Resident):</TableCell>
                    <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                    <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                    <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Others:</TableCell>
                    <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                    <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                    <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                    <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                    <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MedicalSpecifiedDiseases;
