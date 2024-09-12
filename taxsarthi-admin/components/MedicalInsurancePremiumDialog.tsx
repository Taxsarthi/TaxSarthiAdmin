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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

type Props = {
  open: boolean;
  onClose: () => void;
};

const MedicalInsurancePremiumDialog = ({ open, onClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="w-auto max-w-[99%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            80D- Medical Insurance Premium/Contribution, Medical expenses, etc.
          </DialogTitle>
          <DialogDescription className="pt-2">
            <Table className="border rounded-md">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black font-semibold"></TableHead>
                  <TableHead className="text-black font-semibold">
                    Insurance Premium
                  </TableHead>
                  <TableHead className="text-black font-semibold">
                    Medical Expenses
                  </TableHead>
                  <TableHead className="text-black font-semibold">
                    Health Check-up
                  </TableHead>
                  <TableHead className="text-black font-semibold">
                    Deductible
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>In respect of Parents</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Senior Citizen (Resident): </TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Others: </TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>In respect of Self, Spouse, and Children</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Senior Citizen (Resident): </TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Others: </TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                    <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                    <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                    <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Break-up of deductible amount</TableCell>
                    <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
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
  );
};

export default MedicalInsurancePremiumDialog;
