"use client";
import React, { useState } from "react";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
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
import InterestIncomeDialog from "./InterestIncomeDialog";
import MedicalInsurancePremiumDialog from "./MedicalInsurancePremiumDialog";
import MedicalSpecifiedDiseases from "./MedicalSpecifiedDiseases";
import NPSDialog from "./NPSDialog";

type Props = {
  open: any;
  onClose: any;
};

const noOfEmployers = [0, 1];

const ViewITR = (props: Props) => {
  const [dialogOpen, setDialogOpen] = useState<{ [key: string]: boolean }>({
    salary: false,
    interest: false,
  });
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    if (
      value === "Salaries, allowances, and perquisites" ||
      value === "Interest Income" ||
      value === "Medical Insurance Premium (Section 80D)" ||
      value === "Medical Treatment of Specified Diseases (Section 80DDB)" ||
      value === "80CCD"
    ) {
      setDialogOpen((prev: { [key: string]: boolean }) => ({
        ...prev,
        [value]: true,
      }));
    }
  };

  const handleCloseDialog = (dialogType: string) => {
    setDialogOpen((prev: { [key: string]: boolean }) => ({
      ...prev,
      [dialogType]: false,
    }));
  };

  return (
    <>
      <div className="rounded-lg border h-full flex bg-gray-200 flex-col p-4 m-4">
        <h1 className="border-b border-gray-400 mb-2 w-full text-lg">ITR</h1>
        <div>
          <Table className="my-4">
            <TableCaption>Income Tax Return</TableCaption>
            <TableBody>
              <TableRow className="border border-gray-400">
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
                    <TableRow className="border border-gray-400">
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
                    <TableRow className="border border-gray-400">
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
                          open={
                            dialogOpen["Salaries, allowances, and perquisites"]
                          }
                          onClose={() =>
                            handleCloseDialog(
                              "Salaries, allowances, and perquisites"
                            )
                          }
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
                    <TableRow className="border border-gray-400">
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
              <TableRow className="border border-gray-400">
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
              <TableRow className="border border-gray-400">
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
              <TableRow className="border border-gray-400">
                <TableCell>Less: Tax on employment u/s 16(iii)</TableCell>
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
              <TableRow className="border border-gray-400">
                <TableCell className="font-bold text-lg">
                  Income from House Property
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="font-bold">Rs. -44460</TableCell>
              </TableRow>
              <TableRow className="border border-gray-400">
                <TableCell className="text-red-800">
                  Self occupied properties
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow className="border border-gray-400">
                <TableCell className="text-red-800">Property 1</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow className="border border-gray-400">
                <TableCell>Interest on borrowed capital</TableCell>
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
              <TableRow className="border border-gray-400">
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
              <TableRow className="border border-gray-400">
                <TableCell className="text-red-800">
                  Letout properties
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow className="border border-gray-400">
                <TableCell className="text-red-800">Property 1</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow className="border border-gray-400">
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
              <TableRow className="border border-gray-400">
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
              <TableRow className="border border-gray-400">
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
              <TableRow className="border border-gray-400">
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
              <TableRow className="border border-gray-400">
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
              <TableRow className="border border-gray-400">
                <TableCell className="font-bold text-lg">
                  Capital Gains
                </TableCell>
                <TableCell>Turnover/Receipts</TableCell>
                <TableCell>Profit</TableCell>
                <TableCell className="font-bold">Rs. 1234</TableCell>
              </TableRow>
              <TableRow className="border border-gray-400">
                <TableCell>Short Term Capital Gains</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow className="border border-gray-400">
                <TableCell>Long Term Capital Gains</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow className="border border-gray-400">
                <TableCell className="font-bold text-lg">
                  Income from Other Sources
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="font-bold">Rs. 7000</TableCell>
              </TableRow>
              <TableRow className="border border-gray-400">
                <TableCell>
                  <Select onValueChange={handleValueChange}>
                    <SelectTrigger className="w-full bg-transparent">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bank Interest">
                        Bank Interest
                      </SelectItem>
                      <SelectItem value="Dividends">Dividends</SelectItem>
                      <SelectItem value="DTAA Income">DTAA Income</SelectItem>
                      <SelectItem value="Family Pension">
                        Family Pension
                      </SelectItem>
                      <SelectItem value="Gifts taxable u/s 56(2)(x)">
                        Gifts taxable u/s 56(2)(x)
                      </SelectItem>
                      <SelectItem value="Income taxable at special rates">
                        Interest on securities
                      </SelectItem>
                      <SelectItem value="Interest Income">
                        Interest Income
                      </SelectItem>
                      <SelectItem value="KVP Interest">KVP Interest</SelectItem>
                      <SelectGroup>
                        <SelectLabel>Minor child's income: </SelectLabel>
                        <SelectItem value="NSC Interest">
                          NSC Interest
                        </SelectItem>
                        <SelectItem value="Other person's income">
                          Other person's income
                        </SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Other:</SelectLabel>
                        <SelectItem value="Rental Income: from plant and machinery etc">
                          Rental Income: from plant and machinery etc
                        </SelectItem>
                        <SelectItem value="Section 89A- Income from retirement benifit a/c">
                          Section 89A- Income from retirement benifit a/c
                        </SelectItem>
                        <SelectItem value="Taxable income u/s 58, 59 & 56(2)(ix),(xii),(xiii)">
                          Taxable income u/s 58, 59 & 56(2)(ix),(xii),(xiii)
                        </SelectItem>
                        <SelectItem value="Winnings: Lottery, Games, Bettings">
                          Winnings: Lottery, Games, Bettings
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <InterestIncomeDialog
                    open={dialogOpen["Interest Income"]}
                    onClose={() => handleCloseDialog("Interest Income")}
                  />
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow className="border border-gray-400">
                <TableCell className="font-bold text-lg">
                  Gross Total Income
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="font-bold">Rs. 1364021</TableCell>
              </TableRow>
              <TableRow className="border border-gray-400">
                <TableCell className="font-bold text-lg text-red-800">
                  Deductions under Chapter VI-A
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow className="border border-gray-400">
                <TableCell>
                  <Select onValueChange={handleValueChange}>
                    <SelectTrigger className="w-full bg-transparent">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Medical Insurance Premium (Section 80D)">
                        Medical Insurance Premium (Section 80D)
                      </SelectItem>
                      <SelectItem value="Medical Treatment of Specified Diseases (Section 80DDB)">
                        Medical Treatment of Specified Diseases (Section 80DDB)
                      </SelectItem>
                      <SelectItem value="Interest on Savings Accounts (Section 80TTA)">
                        Interest on Savings Accounts (Section 80TTA)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <MedicalInsurancePremiumDialog
                    open={dialogOpen["Medical Insurance Premium (Section 80D)"]}
                    onClose={() =>
                      handleCloseDialog(
                        "Medical Insurance Premium (Section 80D)"
                      )
                    }
                  />
                  <MedicalSpecifiedDiseases
                    open={
                      dialogOpen[
                        "Medical Treatment of Specified Diseases (Section 80DDB)"
                      ]
                    }
                    onClose={() =>
                      handleCloseDialog(
                        "Medical Treatment of Specified Diseases (Section 80DDB)"
                      )
                    }
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
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
              </TableRow>
              <TableRow className="border border-gray-400">
                <TableCell className="font-bold text-lg text-red-800">
                  Investment u/s 80C, 80CCC, 80CCD
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow className="border border-gray-400">
                <TableCell>
                  <Select onValueChange={handleValueChange}>
                    <SelectTrigger className="w-full bg-transparent">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="80C">
                        Section 80C - Investments
                      </SelectItem>
                      <SelectItem value="80CCC">
                        Section 80CCC - Pension Funds
                      </SelectItem>
                      <SelectItem value="80CCD">
                        Section 80CCD - National Pension System (NPS)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <NPSDialog
                    open={dialogOpen["80CCD"]}
                    onClose={() =>
                      handleCloseDialog("80CCD")
                    }
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
                <TableCell>5000</TableCell>
                <TableCell>5000</TableCell>
              </TableRow>
              <TableRow className="border border-gray-400">
                <TableCell className="font-bold text-lg">
                  Total Income
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>1359021</TableCell>
              </TableRow>
              <TableRow className="border border-gray-400">
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
              <TableRow className="border border-gray-400">
                <TableCell className="font-bold">Education Cess 4%</TableCell>
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
              <TableRow className="border border-gray-400">
                <TableCell className="font-bold">Tax Payable</TableCell>
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
              <TableRow className="border border-gray-400">
                <TableCell className="text-red-800 font-bold">
                  Less: Relief u/s 89
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
              <TableRow className="border border-gray-400">
                <TableCell className="font-bold">Tax Payable</TableCell>
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
              <TableRow className="border border-gray-400">
                <TableCell className="font-bold text-red-800">
                  Less: TDS/TCS
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
                <TableCell>
                  <Input
                    type="number"
                    className="bg-transparent"
                    placeholder=""
                    disabled
                  />
                </TableCell>
              </TableRow>
              <TableRow className="border border-gray-400">
                <TableCell className="font-bold">
                  Balance Tax Payable/Refund
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
                <TableCell>1364021</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ViewITR;
