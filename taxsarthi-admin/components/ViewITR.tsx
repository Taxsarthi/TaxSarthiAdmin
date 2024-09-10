"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import IncomeFromSalaryDialog from "./IncomeFromSalaryDialog";

type Props = {
  open: any;
  onClose: any;
};

const noOfEmployers = [0, 1];

const ViewITR = (props: Props) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleValueChange = (value: any) => {
    setSelectedValue(value);
    if (value === "Salaries, allowances, and perquisites") {
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  return (
    <>
      <div className="rounded-lg border h-full flex bg-gray-200 flex-col p-4 m-4">
        <h1 className="border-b border-gray-400 mb-2 w-full text-lg">ITR</h1>
        <div>
          <Table>
            <TableCaption>Income Tax Return</TableCaption>
            <TableBody>
              <TableRow>
                <TableCell className="font-bold text-lg">
                  Income from Salary
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="font-bold">Rs. 1234</TableCell>
              </TableRow>
              {noOfEmployers.map((employerId) => {
                return (
                  <React.Fragment key={employerId}>
                    {/* Dialog for Employer Details */}
                    <TableRow>
                      <TableCell className="text-red-800">
                        <Dialog>
                          <DialogTrigger>
                            Employer {employerId + 1}
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Employer {employerId + 1} Details
                              </DialogTitle>
                              <DialogDescription>
                                <form className="flex flex-col gap-4 p-4">
                                  <Input
                                    type="text"
                                    placeholder="Employer Name"
                                  />
                                  <Input
                                    type="text"
                                    placeholder="Employer Address"
                                  />
                                  <Input
                                    type="text"
                                    placeholder="Employer TAN"
                                  />
                                  <Input type="text" placeholder="City" />
                                  <Input type="text" placeholder="State" />
                                  <Input type="text" placeholder="Pincode" />
                                  <Select>
                                    <SelectTrigger className="w-auto">
                                      <SelectValue placeholder="Nature of Employment" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Central Govt">
                                        Central Govt
                                      </SelectItem>
                                      <SelectItem value="Others">
                                        Others
                                      </SelectItem>
                                      <SelectItem value="Pensioner">
                                        Pensioner
                                      </SelectItem>
                                      <SelectItem value="State Govt">
                                        State Govt
                                      </SelectItem>
                                      <SelectItem value="PSU">PSU</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Button>Submit</Button>
                                </form>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>

                    {/* Salary Details Row */}
                    <TableRow>
                      <TableCell>
                        <Select onValueChange={handleValueChange}>
                          <SelectTrigger className="w-full bg-transparent">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pension">Pension</SelectItem>
                            <SelectItem value="Salaries, allowances, and perquisites">
                              Salaries, allowances, and perquisites
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <IncomeFromSalaryDialog
                          open={dialogOpen}
                          onClose={handleCloseDialog}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          className="bg-transparent"
                          placeholder="1234"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          className="bg-transparent"
                          placeholder=""
                          disabled
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          className="bg-transparent"
                          placeholder=""
                          disabled
                        />
                      </TableCell>
                    </TableRow>

                    {/* Salary from Employer Row */}
                    <TableRow>
                      <TableCell className="text-red-800">
                        Salary from Employer {employerId + 1}
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          className="bg-transparent"
                          placeholder="1234"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          className="bg-transparent"
                          placeholder=""
                          disabled
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          className="bg-transparent"
                          placeholder=""
                          disabled
                        />
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
              <TableRow>
                <TableCell>Total Salary</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder="1453981"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Standard Deduction u/a 16(ia)</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder="50000"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Less:Tax on employment u/s 16(iii)</TableCell>
                <TableCell>2500</TableCell>
                <TableCell>52500</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-lg">
                  Income from House Property
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="font-bold">Rs. -44460</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-red-800">
                  Self occupied properties
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-red-800">Property 1</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Intrest on borrowed capital</TableCell>
                <TableCell>44460</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Intrest deduction limit u/s 24(b)</TableCell>
                <TableCell>200000</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-red-800">
                  Letout properties
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-red-800">Property 1</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gross annual value</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Less: Municipal taxes</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Net annual amount</TableCell>
                <TableCell>44460</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Less: Standard deduction(30%)</TableCell>
                <TableCell>200000</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Income from borrowed capital u/s 24(b)</TableCell>
                <TableCell>200000</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-lg">
                  Capital Gains
                </TableCell>
                <TableCell>Turnover/Receipts</TableCell>
                <TableCell>Profit</TableCell>
                <TableCell className="font-bold">Rs. 1234</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Short Term Capital Gains</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Long Term Capital Gains</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-lg">
                  Income from Other Sources
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="font-bold">Rs. 7000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Select onValueChange={handleValueChange}>
                    <SelectTrigger className="w-full bg-transparent">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bank Interest">Bank Interest</SelectItem>
                      <SelectItem value="Dividends">Dividends</SelectItem>
                      <SelectItem value="Winnings: Lottery, Games, Bettings">Winnings: Lottery, Games, Bettings</SelectItem>
                      <SelectItem value="Interest Income">Interest Income</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                      <SelectItem value="Gifts taxable u/s 56(2)(x)">Gifts taxable u/s 56(2)(x)</SelectItem>
                      <SelectItem value="DTAA Income">DTAA Income</SelectItem>
                      <SelectItem value="Other person's income">Other person's income</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-lg">
                  Gross Total Income
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="font-bold">Rs. 1364021</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-lg text-red-800">
                  Deductions under Chapter VI-A
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>80DD: Medical treatment of Handicapped</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>80TTA: Interest on Saving a/c</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>5000</TableCell>
                <TableCell>5000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-lg text-red-800">
                  Investment u/s 80C, 80CCC, 80CCD
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>80C</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>5000</TableCell>
                <TableCell>5000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>80CCC</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>5000</TableCell>
                <TableCell>5000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>80CCD</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>5000</TableCell>
                <TableCell>5000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-lg">
                  Total Income
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>1359021</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Agricultural Income</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total income rounded off u/s 288A</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>1364021</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-lg">Tax Rate</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-red-800">
                  Tax on Total Income
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>220206</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Add: Cess</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>8808</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax with cess</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>229014</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-red-800">
                  Relief u/s 89 to 91
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Net Tax</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>229014</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">TDS/TCS</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>17845</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Advance Tax</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>1364021</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Total Prepaid taxes</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>17845</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Balance Tax</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
                <TableCell>211169</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ViewITR;
