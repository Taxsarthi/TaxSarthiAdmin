import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaEdit } from "react-icons/fa";
import ActionButton from "./ui/actionbutton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

type Props = {};

const EditUser = (props: Props) => {
  const [formData, setFormData] = useState({
    fullname: "",
    pan: "",
    mobile: "",
    fees: "",
    discount: "",
    feesPaid: "",
    finalFees: "",
    feesPending: "",
  });

  useEffect(() => {
    const fees = parseInt(formData.fees) || 0;
    const discount = parseInt(formData.discount) || 0;
    const feesPaid = parseInt(formData.feesPaid) || 0;

    const calculatedFinalFees = Math.max(fees - discount, 0);
    const calculatedFeesPending = Math.max(calculatedFinalFees - feesPaid, 0);

    setFormData((prev) => ({
      ...prev,
      finalFees: calculatedFinalFees.toString(),
      feesPending: calculatedFeesPending.toString(),
    }));
  }, [formData.fees, formData.discount, formData.feesPaid]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <ActionButton icon={<FaEdit />} label="Edit" color="text-green-600" />
        </DialogTrigger>
        <DialogContent className="max-w-[60vw] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="mb-4 text-xl font-semibold">
              Edit User Details
            </DialogTitle>
            <DialogDescription>
              <form className="flex flex-col w-full gap-4">
                <Input
                  name="fullname"
                  value={formData.fullname}
                  placeholder="Fullname"
                  readOnly
                />
                <Input
                  name="pan"
                  value={formData.pan}
                  placeholder="PAN"
                  readOnly
                />
                <Input
                  name="mobile"
                  value={formData.mobile}
                  placeholder="Mobile"
                  readOnly
                />
                <h1 className="text-black text-lg">Services</h1>
                <div className="flex flex-col gap-2">
                  {["Taxsarthi Portal", "Nil", "Itr Salary", "Itr Business", "Shares below 5L", "Shares below 10L", "Shares below 20L"].map((service) => (
                    <div className="flex gap-2 items-center" key={service}>
                      <Checkbox id={service} />
                      <label htmlFor={service} className="text-sm font-medium leading-none">
                        {service.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </label>
                    </div>
                  ))}
                </div>
                <Input
                  name="fees"
                  value={formData.fees}
                  onChange={handleInputChange}
                  placeholder="Fees"
                />
                <Input
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  placeholder="Discount (in Rs.)"
                />
                <Input
                  name="finalFees"
                  value={formData.finalFees}
                  placeholder="Final Fees"
                  readOnly
                />
                <Input
                  name="feesPaid"
                  value={formData.feesPaid}
                  onChange={handleInputChange}
                  placeholder="Fees Paid"
                />
                <Input
                  name="feesPending"
                  value={formData.feesPending}
                  placeholder="Fees Pending"
                  readOnly
                />
                <div className="flex justify-end gap-4 mt-4">
                  <DialogClose>
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button variant="outline" type="submit">
                    Edit
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditUser;
