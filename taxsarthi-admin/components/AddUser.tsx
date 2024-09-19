"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import toast from "react-hot-toast";

type Props = {};

const AddUser = (props: Props) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    pan: "",
    mobile: "",
    email: "",
    password: "",
    userType: "",
    itrType: "",
    services: [] as string[],
    city: "",
    area: "",
    fees: "",
    discount: "",
    finalFees: "",
    feesPaid: "",
    feesPending: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("User added successfully");
    router.push("/dashboard");
    console.log(formData);
    // Handle form submission here
  };

  const handleRedirect = () => {
    router.push("/dashboard");
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pan">PAN</Label>
          <Input
            id="pan"
            name="pan"
            value={formData.pan}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile</Label>
          <Input
            id="mobile"
            name="mobile"
            type="tel"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="flex gap-4">
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Button variant="default" >
                Generate
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>User Type</Label>
          <Select
            onValueChange={handleSelectChange("userType")}
            value={formData.userType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select User Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>User Type</SelectLabel>
                <SelectItem value="police">Police</SelectItem>
                <SelectItem value="defencepersonal">
                  Defence Personal
                </SelectItem>
                <SelectItem value="pvtemployee">
                  Private Corporate Employee
                </SelectItem>
                <SelectItem value="govtemployee">
                  Government Employee
                </SelectItem>
                <SelectItem value="other">
                  Self Employed / Freelancer / Student
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>ITR Type</Label>
          <Select
            onValueChange={handleSelectChange("itrType")}
            value={formData.itrType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select ITR Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>ITR Type</SelectLabel>
                <SelectItem value="itr0">ITR-0 - NIL</SelectItem>
                <SelectItem value="itr1">ITR-1 - Salary</SelectItem>
                <SelectItem value="itr2">ITR-2 - Salary + Shares</SelectItem>
                <SelectItem value="itr3">ITR-3 - Business + Shares</SelectItem>
                <SelectItem value="itr4">ITR-4 - Business</SelectItem>
                <SelectItem value="itr5">
                  ITR-5 - Partnership Firm/LLP
                </SelectItem>
                <SelectItem value="itr6">ITR-6 - Company</SelectItem>
                <SelectItem value="itr7">ITR-7 - Trust</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "TaxSarthiPortal",
            "Nil",
            "ITR Salary",
            "ITR Business",
            "Shares Below 5L",
            "Shares Below 10L",
            "Shares Below 20L",
          ].map((service) => (
            <div key={service} className="flex items-center space-x-2">
              <Checkbox
                id={service.toLowerCase().replace(/\s+/g, "-")}
                checked={formData.services.includes(service)}
                onCheckedChange={() => handleCheckboxChange(service)}
              />
              <Label htmlFor={service.toLowerCase().replace(/\s+/g, "-")}>
                {service}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="area">Area</Label>
          <Input
            id="area"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fees">Fees</Label>
          <Input
            id="fees"
            name="fees"
            type="number"
            value={formData.fees}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="discount">Discount (in Rs.)</Label>
          <Input
            id="discount"
            name="discount"
            type="number"
            value={formData.discount}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="finalFees">Final Fees</Label>
          <Input
            id="finalFees"
            name="finalFees"
            type="number"
            value={formData.finalFees}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="feesPaid">Fees Paid</Label>
          <Input
            id="feesPaid"
            name="feesPaid"
            type="number"
            value={formData.feesPaid}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="feesPending">Fees Pending</Label>
          <Input
            id="feesPending"
            name="feesPending"
            type="number"
            value={formData.feesPending}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" type="button" onClick={handleRedirect}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default AddUser;
