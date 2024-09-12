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
                      <TableCell>
                        <Input type="number" min={0} placeholder="" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" min={0} placeholder="" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" min={0} placeholder="" />
                      </TableCell>
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
                        <Input type="number" min={0} placeholder="" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" min={0} placeholder="" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" min={0} placeholder="" />
                      </TableCell>
                    </TableRow>

                    {/* Salary from Employer Row */}
                    <TableRow>
                      <TableCell className="text-red-800">
                        Salary from Employer {employerId + 1}
                      </TableCell>
                      <TableCell>
                        <Input type="number" min={0} placeholder="" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" min={0} placeholder="" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" min={0} placeholder="" />
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
              <TableRow>
                <TableCell>Total Salary</TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Standard Deduction u/a 16(ia)</TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Less: Tax on employment u/s 16(iii)</TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-lg">
                  Income from House Property
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="font-bold">Rs. 1234</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-red-800">
                  Self occupied properties
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-red-800">Property 1</TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Interest on borrowed capital</TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Intrest deduction limit u/s 24(b)</TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-red-800">
                  Letout properties
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-red-800">Property 1</TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gross annual value</TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Less: Municipal taxes</TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Net annual amount</TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Less: Standard deduction(30%)</TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Income from borrowed capital u/s 24(b)</TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-lg">
                  Profits and Gains of Business or Profession
                </TableCell>
                <TableCell>
                  <Input type="text" placeholder="Turnover/Receipts" disabled />
                </TableCell>
                <TableCell>
                  <Input type="text" placeholder="Profit" disabled />
                </TableCell>
                <TableCell className="font-bold">Rs. 1234</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Business: Presumptive profits u/s 44AD</TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Profession: u/s 44ADA - Presumptive profits
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Special Business: Income from Firm, speculation, without
                  books, 44AE...
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Less: Depreciation as per IT Act</TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-lg">
                  Capital Gains
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell className="font-bold">Rs. 1234</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Short Term Capital Gains</TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Long Term Capital Gains</TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-lg">
                  Income from Other Sources
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="font-bold">Rs. 1234</TableCell>
              </TableRow>
              <TableRow>
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
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-lg">
                  Gross Total Income
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="font-bold">Rs. 1234</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-lg text-red-800">
                  Deductions under Chapter VI-A
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
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
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-lg text-red-800">
                  Investment u/s 80C, 80CCC, 80CCD
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
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
                        Section 80CCD - National Pension Scheme (NPS)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <NPSDialog
                    open={dialogOpen["80CCD"]}
                    onClose={() => handleCloseDialog("80CCD")}
                  />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-lg">
                  Total Income
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="font-bold">Rs. 1234</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-red-800">
                  Tax on Total Income
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Education Cess 4%</TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Tax Payable</TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-red-800 font-bold">
                  Less: Relief u/s 89
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Tax Payable</TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-red-800">
                  Less: TDS/TCS
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
                <TableCell>
                  <Input type="number" min={0} placeholder="" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-lg">
                  Balance Tax Payable/Refund
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="font-bold">Rs. 0</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ViewITR;
