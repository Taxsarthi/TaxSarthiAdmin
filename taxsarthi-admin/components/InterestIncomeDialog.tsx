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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";

type Props = {
  open: boolean;
  onClose: () => void;
};

const InterestIncomeDialog = ({ open, onClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="w-auto max-w-[99%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Interest Income (Other than NSC/KVP interest)
          </DialogTitle>
          <DialogDescription className="pt-2">
            <Table className="border rounded-md">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black font-semibold">
                    Name of the bank/institution
                  </TableHead>
                  <TableHead className="text-black font-semibold">
                    Interest
                  </TableHead>
                  <TableHead className="text-black font-semibold">
                    Account No. (for reference)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Interest on Time Deposits</TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>State Bank of India</TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Interest on Savings a/c (80TTA)</TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>State Bank of India</TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Other Interest</TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Select>
                      <SelectTrigger className="w-full m-0 border-0 bg-transparent">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Interest on PF Contribution-first proviso to section 10(11)">
                          Interest on PF Contribution- first proviso to section 10(11)
                        </SelectItem>
                        <SelectItem value="Interest on PF Contribution-  second proviso to section 10(11)">Interest on PF Contribution- second proviso to section 10(11)</SelectItem>
                        <SelectItem value="Interest on PF Contribution- first proviso to section 10(12)">Interest on PF Contribution- first proviso to section 10(12)</SelectItem>
                        <SelectItem value="Interest on PF Contribution- second proviso to section 10(12)">
                        Interest on PF Contribution- second proviso to section 10(12)
                        </SelectItem>
                        <SelectItem value="Interest on Income Tax Refund">
                        Interest on Income Tax Refund
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Other Expenses/deductions</TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                  <TableCell><Input type="number" min={0} placeholder="" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Taxable Interest</TableCell>
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

export default InterestIncomeDialog;
