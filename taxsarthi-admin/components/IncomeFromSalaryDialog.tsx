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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
};

const IncomeFromSalaryDialog = ({ open, onClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="w-auto max-w-[99%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Salaries, allowances, and perquisites</DialogTitle>
          <DialogDescription className="pt-2">
            <Table className="border rounded-md">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black font-semibold">Salary Income</TableHead>
                  <TableHead className="text-black font-semibold">Received</TableHead>
                  <TableHead className="text-black font-semibold">Exempt</TableHead>
                  <TableHead className="text-black font-semibold">Taxable</TableHead>
                  <TableHead className="text-black font-semibold">Exemption Section</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Basic Salary</TableCell>
                  <TableCell>1234567</TableCell>
                  <TableCell></TableCell>
                  <TableCell>1250</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Others</TableCell>
                  <TableCell>1234567</TableCell>
                  <TableCell></TableCell>
                  <TableCell>1250</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Allowances</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>House Rent Allowance</TableCell>
                  <TableCell>1234567</TableCell>
                  <TableCell>1234567</TableCell>
                  <TableCell>1234567</TableCell>
                  <TableCell>10(13A)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Conveyance Allowance</TableCell>
                  <TableCell>1234567</TableCell>
                  <TableCell>1234567</TableCell>
                  <TableCell></TableCell>
                  <TableCell>10(14)(i)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>HRA Exemption Calculation</TableCell>
                  <TableCell>1234567</TableCell>
                  <TableCell>1234567</TableCell>
                  <TableCell></TableCell>
                  <TableCell>10(14)(ii)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Rent Paid</TableCell>
                  <TableCell>1234567</TableCell>
                  <TableCell>1234567</TableCell>
                  <TableCell></TableCell>
                  <TableCell>10(14)(ii)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>40% of the salary</TableCell>
                  <TableCell>1234567</TableCell>
                  <TableCell>1234567</TableCell>
                  <TableCell></TableCell>
                  <TableCell>10(14)(ii)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Rent paid in excess of 10% of salary</TableCell>
                  <TableCell>1234567</TableCell>
                  <TableCell>1234567</TableCell>
                  <TableCell></TableCell>
                  <TableCell>10(14)(ii)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Summary of Salary</TableCell>
                  <TableCell>Gross</TableCell>
                  <TableCell>Exempt</TableCell>
                  <TableCell>Taxable</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Salary Income</TableCell>
                  <TableCell>1234567</TableCell>
                  <TableCell>1234567</TableCell>
                  <TableCell>1234567</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Allowances</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
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

export default IncomeFromSalaryDialog;