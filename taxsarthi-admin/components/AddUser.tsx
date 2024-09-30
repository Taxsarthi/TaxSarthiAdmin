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
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";

type Props = {};

const AddUser = (props: Props) => {
  const router = useRouter();
  const db = getFirestore();

  const [formData, setFormData] = useState({
    name: "",
    pan: "",
    mobile: "",
    email: "",
    password: "",
    userType: "",
    itrType: "",
    services: [] as string[],
    city: "",
    area: "",
    Fees: "",
    discount: "",
    FinalFees: "",
    PaidFees: "",
    PendingFees: "",
  });

  const [loading, setLoading] = useState(false);
  const [isPanValid, setIsPanValid] = useState(true);
  const [errors, setErrors] = useState<{ pan: string }>({ pan: '' });
  const [servicesList, setServicesList] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const itrDocRef = doc(db, "services", "itr");
      const itrDoc = await getDoc(itrDocRef);

      if (itrDoc.exists()) {
        const servicesData = itrDoc.data();
        const servicesArray = Object.entries(servicesData).map(([name, value]) => ({
          name,
          value,
        }));
        setServicesList(servicesArray);
      } else {
        console.error("No such document!");
      }
    };

    fetchServices();
  }, [db]);

  useEffect(() => {
    const Fees = parseInt(formData.Fees) || 0;
    const discount = parseInt(formData.discount) || 0;
    const PaidFees = parseInt(formData.PaidFees) || 0;

    const calculatedFinalFees = Math.max(Fees - discount, 0);
    const calculatedFeesPending = Math.max(calculatedFinalFees - PaidFees, 0);

    setFormData((prev) => ({
      ...prev,
      FinalFees: calculatedFinalFees.toString(),
      PendingFees: calculatedFeesPending.toString(),
    }));
  }, [formData.Fees, formData.discount, formData.PaidFees]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'pan') {
      if (isValidPan(value)) {
        const exists = await checkPanExists(value);
        if (exists) {
          setErrors({ ...errors, pan: 'PAN already exists' });
          setIsPanValid(false);
        } else {
          setErrors({ ...errors, pan: '' });
          setIsPanValid(true);
        }
      } else {
        setErrors({ ...errors, pan: 'Invalid PAN format' });
        setIsPanValid(false);
      }
    }
  };

  const checkPanExists = async (pan: string) => {
    const panDocRef = doc(db, "users", pan);
    const panDoc = await getDoc(panDocRef);
    return panDoc.exists();
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (service: { name: string; value: number }) => {
    const isChecked = formData.services.includes(service.name);
    const updatedServices = isChecked
      ? formData.services.filter((s) => s !== service.name)
      : [...formData.services, service.name];

    const totalFees = updatedServices.reduce((total, serviceName) => {
      const serviceItem = servicesList.find(s => s.name === serviceName);
      return serviceItem ? total + serviceItem.value : total;
    }, 0);

    setFormData((prev) => ({
      ...prev,
      services: updatedServices,
      Fees: totalFees.toString(),
    }));
  };

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email) || email === "";
  };

  const isValidMobile = (mobile: string) => {
    return /^\d{10}$/.test(mobile) || mobile === "";
  };

  const isValidPan = (pan: string) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPanValid || !isValidEmail(formData.email) || !isValidMobile(formData.mobile)) {
      toast.error("Invalid email, mobile number, or PAN.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Make sure to send the discount here
      });

      if (response.status === 409) {
        const errorData = await response.json();
        toast.error("PAN already exists");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const result = await response.json();
      toast.success("User added successfully");
      setFormData({
        name: "",
        pan: "",
        mobile: "",
        email: "",
        password: "",
        userType: "",
        itrType: "",
        services: [],
        city: "",
        area: "",
        Fees: "",
        discount: "",
        FinalFees: "",
        PaidFees: "",
        PendingFees: "",
      });

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  const generatePassword = () => {
    const fullNameParts = formData.name.trim().split(" ");
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

  const isFormComplete = () => {
    return (
      formData.name &&
      formData.pan &&
      isPanValid &&
      isValidEmail(formData.email) &&
      isValidMobile(formData.mobile) &&
      formData.userType &&
      formData.itrType &&
      formData.area &&
      formData.Fees &&
      formData.PaidFees
    );
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="name"
            placeholder="Full Name"
            value={formData.name}
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
          {errors.pan && <span className="text-red-500 text-sm">{errors.pan}</span>}
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
        <div className="flex items-center space-x-2">
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
                <SelectItem value="Police">Police</SelectItem>
                <SelectItem value="Defence Personal">Defence Personal</SelectItem>
                <SelectItem value="Private Corporate Employee">Private Corporate Employee</SelectItem>
                <SelectItem value="Govt Employee">Government Employee</SelectItem>
                <SelectItem value="Other">Self Employed / Freelancer / Student</SelectItem>
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
                <SelectItem value="ITR-0">ITR-0 - NIL</SelectItem>
                <SelectItem value="ITR-1">ITR-1 - Salary</SelectItem>
                <SelectItem value="ITR-2">ITR-2 - Salary + Shares</SelectItem>
                <SelectItem value="ITR-3">ITR-3 - Business + Shares</SelectItem>
                <SelectItem value="ITR-4">ITR-4 - Business</SelectItem>
                <SelectItem value="ITR-5">ITR-5 - Partnership Firm/LLP</SelectItem>
                <SelectItem value="ITR-6">ITR-6 - Company</SelectItem>
                <SelectItem value="ITR-7">ITR-7 - Trust</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {servicesList.map((service) => (
            <div key={service.name} className="flex items-center space-x-2">
              <Checkbox
                id={service.name}
                checked={formData.services.includes(service.name)}
                onCheckedChange={() => handleCheckboxChange(service)}
              />
              <Label htmlFor={service.name}>
                {service.name} (₹{service.value})
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
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fees">Fees</Label>
          <Input
            id="fees"
            name="Fees"
            type="number"
            placeholder="0"
            min={0}
            value={formData.Fees}
            onChange={handleInputChange}
            required
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
            name="FinalFees"
            type="number"
            placeholder="0"
            min={0}
            value={formData.FinalFees}
            readOnly
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="feesPaid">Fees Paid</Label>
          <Input
            id="feesPaid"
            name="PaidFees"
            type="number"
            placeholder="0"
            min={200}
            value={formData.PaidFees}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="feesPending">Fees Pending</Label>
          <Input
            id="feesPending"
            name="PendingFees"
            type="number"
            placeholder="0"
            min={0}
            value={formData.PendingFees}
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
          disabled={!isFormComplete() || loading}
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
