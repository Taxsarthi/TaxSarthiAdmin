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

  type Props = {
    open: boolean;
    onClose: () => void;
  };
  

const NPSDialog = ({ open, onClose }: Props) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="w-auto max-w-[99%] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
                80CCD- National Pension Scheme (NPS)
            </DialogTitle>
            <DialogDescription className="pt-2">
              <Table className="border rounded-md">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black font-semibold">
                      Particulars
                    </TableHead>
                    <TableHead className="text-black font-semibold">
                      Contribution
                    </TableHead>
                    <TableHead className="text-black font-semibold">
                      Deduction
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Assessee's contribution</TableCell>
                    <TableCell>50000</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Deduction - u/s 80CCD(1)</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Deduction - u/s 80CCD(1B)</TableCell>
                    <TableCell></TableCell>
                    <TableCell>50000</TableCell>
                  </TableRow>
                    <TableRow>
                        <TableCell>Employer's contribution</TableCell>
                        <TableCell>100000</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Deduction - u/s 80CCD(2)</TableCell>
                        <TableCell></TableCell>
                        <TableCell>65000</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell>150000</TableCell>
                        <TableCell>115000</TableCell>
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

export default NPSDialog;
