"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {};

const ViewITR = (props: Props) => {
  return (
    <>
      <div className="rounded-lg border h-full flex bg-gray-200 flex-col p-4 m-4">
        <h1 className="border-b border-gray-400 mb-2 w-full text-lg">ITR</h1>
        <div>
          <Table>
            <TableCaption>Income Tax Return</TableCaption>
            <TableBody>
            <TableRow >
                <TableCell className="font-bold">Income from Salary</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="text-red-800">Employer 1</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell >
                  Salaries, allowances and perquisites
                </TableCell>
                <TableCell>1059125</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="text-red-800">
                  Salary from Employer 1
                </TableCell>
                <TableCell>1059125</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="text-red-800">Employer 2</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell >Pension</TableCell>
                <TableCell>394856</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="text-red-800">
                  Salary from Employer 2
                </TableCell>
                <TableCell>394856</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell >Total Salary</TableCell>
                <TableCell></TableCell>
                <TableCell>1453981</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell >Standard Deduction u/a 16(ia)</TableCell>
                <TableCell>50000</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell >Less:Tax on employment u/s 16(iii)</TableCell>
                <TableCell>2500</TableCell>
                <TableCell>52500</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="font-bold text-red-800">Income from House Property</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>-44460</TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="text-red-800">Self occupied properties</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="text-red-800">Property 1</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell>Intrest on borrowed capital</TableCell>
                <TableCell>44460</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell>Intrest deduction limit u/s 24(b)</TableCell>
                <TableCell>200000</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell>Pass through income u/s 115UA or 115UB</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="font-bold text-red-800">Profits and gains of Business or Profession</TableCell>
                <TableCell>Turnover/Receipts</TableCell>
                <TableCell>Profit</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell>Business: Presumptive profits u/s 44AD</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell>Profession: u/s 44ADA-Presumptive profits</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="text-red-800">Special Business: Income from Firm, speculation, without books, 44AE....</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell>Less: Depreciation as per IT Act</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="font-bold text-red-800">Income from Other Sources</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>7000</TableCell>
              </TableRow>
              <TableRow >
                <TableCell >Interest income</TableCell>
                <TableCell></TableCell>
                <TableCell>7000</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell >Income after inter-head set off</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>1364021</TableCell>
              </TableRow>
              <TableRow >
                <TableCell>Unabsorbed Losses - C/F</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell>Brought forward losses set off</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="font-bold text-red-800">Gross Total Income</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>1364021</TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="text-red-800">Dedusctions under Chapter VI-A</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell>80DD: Medical treatment of Handicapped</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell >80TTA: Interest on Saving a/c</TableCell>
                <TableCell></TableCell>
                <TableCell>5000</TableCell>
                <TableCell>5000</TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="text-red-800">Investment u/s 80C, CCC, CCD</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="font-bold text-red-800">Total Income</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>1359021</TableCell>
              </TableRow>
              <TableRow >
                <TableCell>Agricultural Income</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell>Total income rounded off u/s 288A</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>1364021</TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="font-bold">Tax Rate</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="font-bold text-red-800">Tax on Total Income</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>220206</TableCell>
              </TableRow>
              <TableRow >
                <TableCell>Add: Cess</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>8808</TableCell>
              </TableRow>
              <TableRow >
                <TableCell>Tax with cess</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>229014</TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="text-red-800">Relief u/s 89 to 91</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="font-bold">Net Tax</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>229014</TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="font-bold">TDS/TCS</TableCell>
                <TableCell></TableCell>
                <TableCell>17845</TableCell>
                <TableCell></TableCell>
              </TableRow>
              {/* <TableRow >
                <TableCell className="font-bold">Advance Tax</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>1364021</TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="font-bold">Total Prepaid taxes</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>17845</TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="font-bold">Balance Tax</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>211169</TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ViewITR;
