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
import { TextField } from "@mui/material";
import { Checkbox } from "./ui/checkbox";
import toast from "react-hot-toast";

type Props = {
  userData: any;
};

const EditUser = ({ userData }: Props) => {
  const [formData, setFormData] = useState({
    name: userData.name,
    pan: userData.pan,
    mobile: userData.mobile,
    Fees: userData.Fees,
    discount: "",
    PaidFees: userData.PaidFees,
    finalFees: "",
    PendingFees: userData.PendingFees,
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    const Fees = parseInt(formData.Fees) || 0;
    const discount = parseInt(formData.discount) || 0;
    const PaidFees = parseInt(formData.PaidFees) || 0;

    const calculatedFinalFees = Math.max(Fees - discount, 0);
    const calculatedPendingFees = Math.max(calculatedFinalFees - PaidFees, 0);

    setFormData((prev) => ({
      ...prev,
      finalFees: calculatedFinalFees.toString(),
      PendingFees: calculatedPendingFees.toString(),
    }));
  }, [formData.Fees, formData.discount, formData.PaidFees]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceChange = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/add-user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, selectedServices }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // console.log("User updated successfully:", data);
      toast.success("User updated successfully");

    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
    }
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
              <form
                className="flex flex-col w-full gap-4"
                onSubmit={handleSubmit}
              >
                <TextField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  placeholder="Full Name"
                  variant="outlined"
                  size="small"
                  disabled
                />
                <TextField
                  label="PAN"
                  name="pan"
                  value={formData.pan}
                  placeholder="PAN"
                  variant="outlined"
                  size="small"
                  disabled
                />
                <TextField
                  label="Mobile"
                  name="mobile"
                  value={formData.mobile}
                  placeholder="Mobile"
                  variant="outlined"
                  size="small"
                  disabled
                />
                <h1 className="text-black text-md">Services</h1>
                <div className="flex flex-col gap-2 mb-2">
                  {[
                    "Taxsarthi Portal",
                    "Nil",
                    "Itr Salary",
                    "Itr Business",
                    "Shares below 5L",
                    "Shares below 10L",
                    "Shares below 20L",
                  ].map((service) => (
                    <div className="flex gap-2 items-center" key={service}>
                      <Checkbox
                        id={service}
                        checked={selectedServices.includes(service)}
                        onChange={() => handleServiceChange(service)}
                      />
                      <label
                        htmlFor={service}
                        className="text-sm font-medium leading-none"
                      >
                        {service
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </label>
                    </div>
                  ))}
                </div>
                <TextField
                  label="Fees"
                  name="Fees"
                  value={formData.Fees}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                />
                <TextField
                  label="Discount"
                  name="discount"
                  value={formData.discount || 0}
                  onChange={handleInputChange}
                  placeholder="Discount (in Rs.)"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  label="Final Fees"
                  name="finalFees"
                  value={formData.finalFees}
                  placeholder="Final Fees"
                  variant="outlined"
                  size="small"
                  disabled
                />
                <TextField
                  label="Fees Paid"
                  name="PaidFees"
                  value={formData.PaidFees}
                  onChange={handleInputChange}
                  placeholder="Fees Paid"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  label="Fees Pending"
                  name="PendingFees"
                  value={formData.PendingFees}
                  placeholder="Fees Pending"
                  variant="outlined"
                  size="small"
                  disabled
                />
                <div className="flex justify-end gap-4 mt-4">
                  <DialogClose>
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">
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
