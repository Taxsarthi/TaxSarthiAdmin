"use client";
import React, { useState, useEffect } from "react";
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
import { Copy } from "lucide-react";

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

  const [loading, setLoading] = useState(false);

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

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isValidMobile = (mobile: string) => /^\d{10}$/.test(mobile);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(formData.email) || !isValidMobile(formData.mobile)) {
      toast.error("Invalid email or mobile number.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 409) {
        const errorData = await response.json();
        toast.error(errorData.error);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const result = await response.json();
      toast.success("User added successfully");
      setFormData({
        fullName: "",
        pan: "",
        mobile: "",
        email: "",
        password: "",
        userType: "",
        itrType: "",
        services: [],
        city: "",
        area: "",
        fees: "",
        discount: "",
        finalFees: "",
        feesPaid: "",
        feesPending: "",
      });
      console.log(result);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  const generatePassword = () => {
    const fullNameParts = formData.fullName.trim().split(" ");
    const firstName = fullNameParts[0];
    const generatedPassword = `${firstName}@123`;
    setFormData((prev) => ({ ...prev, password: generatedPassword }));
    toast.success("Password generated successfully!");
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(formData.password)
      .then(() => {
        toast.success("Password copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy password.");
      });
  };

  const handleRedirect = () => {
    router.push("/dashboard");
  };

  const servicesList = [
    "TaxSarthiPortal",
    "Nil",
    "ITR Salary",
    "ITR Business",
    "Shares Below 5L",
    "Shares Below 10L",
    "Shares Below 20L",
  ];

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="Full Name"
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
            placeholder="PAN"
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
            placeholder="Mobile"
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
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="flex gap-4">
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Button type="button" onClick={copyToClipboard} variant="secondary">
            <Copy size={24} />
          </Button>
          <Button type="button" onClick={generatePassword}>
            Generate
          </Button>
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
          {servicesList.map((service) => (
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
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="area">Area</Label>
          <Input
            id="area"
            name="area"
            placeholder="Area"
            value={formData.area}
            onChange={handleInputChange}
          />
        </div>
        {/* Fees and Discount Inputs */}
        <div className="space-y-2">
          <Label htmlFor="fees">Fees</Label>
          <Input
            id="fees"
            name="fees"
            type="number"
            placeholder="0"
            min={0}
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
            placeholder="0"
            min={0}
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
            placeholder="0"
            min={0}
            value={formData.finalFees}
            readOnly
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="feesPaid">Fees Paid</Label>
          <Input
            id="feesPaid"
            name="feesPaid"
            type="number"
            placeholder="0"
            min={0}
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
            placeholder="0"
            min={0}
            value={formData.feesPending}
            readOnly
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" type="button" onClick={handleRedirect}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading || !formData.email || !formData.password || !formData.userType || !formData.itrType || !formData.services.length || !formData.city || !formData.area || !formData.fees || !formData.discount || !formData.feesPaid}
          className="flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin h-5 w-5 border-4 border-t-4 border-white rounded-full mr-2"></div>
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddUser;
