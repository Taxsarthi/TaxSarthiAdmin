"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler, FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Copy } from "lucide-react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

type FormData = {
  name: string;
  pan: string;
  mobile: string;
  email: string;
  password: string;
  userType: string;
  itrType: string;
  services: string[];
  city: string;
  area: string;
  Fees: number;
  discount: number;
  FinalFees: number;
  PaidFees: number;
  PendingFees: number;
  entryMonth: string;
};

const AddUser: React.FC = () => {
  const router = useRouter();
  const db = getFirestore();
  const [loading, setLoading] = useState(false);
  const [servicesList, setServicesList] = useState<{ name: string; value: number }[]>([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
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
      Fees: 0,
      discount: 0,
      FinalFees: 0,
      PaidFees: 0,
      PendingFees: 0,
    },
  });

  const watchedFees = watch("Fees");
  const watchedDiscount = watch("discount");
  const watchedPaidFees = watch("PaidFees");
  const watchedServices = watch("services");

  // Fetch services on mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const itrDocRef = doc(db, "services", "itr");
        const itrDoc = await getDoc(itrDocRef);

        if (itrDoc.exists()) {
          const servicesData = itrDoc.data();
          const servicesArray = Object.entries(servicesData).map(([name, value]) => ({
            name,
            value: Number(value),
          }));
          setServicesList(servicesArray);
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [db]);

  // Calculate FinalFees and PendingFees whenever Fees, discount, or PaidFees change
  useEffect(() => {
    const finalFees = Math.max(watchedFees - watchedDiscount, 0);
    const pendingFees = Math.max(finalFees - watchedPaidFees, 0);

    setValue("FinalFees", finalFees);
    setValue("PendingFees", pendingFees);
  }, [watchedFees, watchedDiscount, watchedPaidFees, setValue]);

  // Calculate Fees based on selected services
  useEffect(() => {
    const totalFees = servicesList
      .filter((service) => watchedServices.includes(service.name))
      .reduce((total, service) => total + service.value, 0);
    setValue("Fees", totalFees);
  }, [watchedServices, servicesList, setValue]);

  // PAN uniqueness validation
  const validatePan = async (pan: string) => {
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
      return "Invalid PAN format";
    }
    try {
      const panDocRef = doc(db, "usersTable", pan);
      const panDoc = await getDoc(panDocRef);
      if (panDoc.exists()) {
        return "PAN already exists";
      }
    } catch (error) {
      console.error("Error validating PAN:", error);
      return "Failed to validate PAN";
    }
    return true;
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("/api/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 409) {
        toast.error("PAN already exists");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      toast.success("User added successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  const generatePassword = () => {
    const fullName = getValues("name").trim();
    const firstName = fullName.split(" ")[0] || "User";
    const generatedPassword = `${firstName}@123`;
    setValue("password", generatedPassword);
    toast.success("Password generated successfully!");
  };

  const copyToClipboard = () => {
    const password = getValues("password");
    navigator.clipboard
      .writeText(password)
      .then(() => {
        toast.success("Password copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy password.");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6">
      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            {...register("name", { required: "Full Name is required" })}
            placeholder="Full Name"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        {/* PAN */}
        <div className="space-y-2">
          <Label htmlFor="pan">PAN</Label>
          <Input
            id="pan"
            {...register("pan", {
              required: "PAN is required",
              validate: validatePan,
            })}
            placeholder="PAN"
            className={errors.pan ? "border-red-500" : ""}
          />
          {errors.pan && <span className="text-red-500 text-sm">{errors.pan.message}</span>}
        </div>

        {/* Mobile */}
        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile</Label>
          <Input
            id="mobile"
            type="tel"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Invalid mobile number",
              },
            })}
            placeholder="Mobile"
            className={errors.mobile ? "border-red-500" : ""}
          />
          {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile.message}</span>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
            placeholder="Email"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
            className={errors.password ? "border-red-500" : ""}
          />
          <Button type="button" onClick={copyToClipboard} variant="secondary">
            <Copy size={20} />
          </Button>
          <Button type="button" onClick={generatePassword}>
            Generate
          </Button>
        </div>
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
      </div>

      {/* User Type and ITR Type */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Entry Month */}
        <div className="space-y-2">
          <Label>Entry Month</Label>
          <Controller
            control={control}
            name="entryMonth"
            rules={{ required: "Entry Month is required" }}
            render={({ field }) => (
              <Select
                {...field}
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
              >
                <SelectTrigger className={errors.entryMonth ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select Entry Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Entry Month</SelectLabel>
                    <SelectItem value="April">April</SelectItem>
                    <SelectItem value="May">May</SelectItem>
                    <SelectItem value="June">June</SelectItem>
                    <SelectItem value="July">July</SelectItem>
                    <SelectItem value="August">August</SelectItem>
                    <SelectItem value="September">September</SelectItem>
                    <SelectItem value="October">October</SelectItem>
                    <SelectItem value="November">November</SelectItem>
                    <SelectItem value="December">December</SelectItem>
                    <SelectItem value="January">January</SelectItem>
                    <SelectItem value="February">February</SelectItem>
                    <SelectItem value="March">March</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.entryMonth && <span className="text-red-500 text-sm">{errors.entryMonth.message}</span>}
        </div>
        
        {/* User Type */}
        <div className="space-y-2">
          <Label>User Type</Label>
          <Controller
            control={control}
            name="userType"
            rules={{ required: "User Type is required" }}
            render={({ field }) => (
              <Select
                {...field}
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
              >
                <SelectTrigger className={errors.userType ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select User Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>User Type</SelectLabel>
                    <SelectItem value="Police">Police</SelectItem>
                    <SelectItem value="Defence Personnel">Defence Personnel</SelectItem>
                    <SelectItem value="Private Corporate Employee">Private Corporate Employee</SelectItem>
                    <SelectItem value="Govt Employee">Government Employee</SelectItem>
                    <SelectItem value="Other">Self Employed / Freelancer / Student</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.userType && <span className="text-red-500 text-sm">{errors.userType.message}</span>}
        </div>


        {/* ITR Type */}
        <div className="space-y-2">
          <Label>ITR Type</Label>
          <Controller
            control={control}
            name="itrType"
            rules={{ required: "ITR Type is required" }}
            render={({ field }) => (
              <Select
                {...field}
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
              >
                <SelectTrigger className={errors.itrType ? "border-red-500" : ""}>
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
            )}
          />
          {errors.itrType && <span className="text-red-500 text-sm">{errors.itrType.message}</span>}
        </div>
      </div>

      {/* Services */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Services</h2>
        <Controller
          control={control}
          name="services"
          render={({ field }) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {servicesList.map((service) => (
                <div key={service.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={service.name}
                    checked={field.value.includes(service.name)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        field.onChange([...field.value, service.name]);
                      } else {
                        field.onChange(field.value.filter((s) => s !== service.name));
                      }
                    }}
                  />
                  <Label htmlFor={service.name}>
                    {service.name} (₹{service.value})
                  </Label>
                </div>
              ))}
            </div>
          )}
        />
      </div>

      {/* Address and Fees */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            {...register("city", { required: "City is required" })}
            placeholder="City"
            className={errors.area ? "border-red-500" : ""}
          />
          {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
        </div>

        {/* Area */}
        <div className="space-y-2">
          <Label htmlFor="area">Area</Label>
          <Input
            id="area"
            {...register("area", { required: "Area is required" })}
            placeholder="Area"
            className={errors.area ? "border-red-500" : ""}
          />
          {errors.area && <span className="text-red-500 text-sm">{errors.area.message}</span>}
        </div>

        {/* Fees */}
        <div className="space-y-2">
          <Label htmlFor="Fees">Fees</Label>
          <Input
            id="Fees"
            type="number"
            {...register("Fees", { valueAsNumber: true, min: 0 })}
            placeholder="0"
            min={0}
            readOnly
          />
        </div>

        {/* Discount */}
        <div className="space-y-2">
          <Label htmlFor="discount">Discount (in Rs.)</Label>
          <Input
            id="discount"
            type="number"
            {...register("discount", { valueAsNumber: true, min: 0 })}
            placeholder="0"
            min={0}
          />
        </div>

        {/* Final Fees */}
        <div className="space-y-2">
          <Label htmlFor="FinalFees">Final Fees</Label>
          <Input
            id="FinalFees"
            type="number"
            {...register("FinalFees", { valueAsNumber: true })}
            placeholder="0"
            min={0}
            readOnly
          />
        </div>

        {/* Fees Paid */}
        <div className="space-y-2">
          <Label htmlFor="PaidFees">Fees Paid</Label>
          <Input
            id="PaidFees"
            type="number"
            {...register("PaidFees", {
              required: "Fees Paid is required",
              valueAsNumber: true,
              min: 0,
            })}
            placeholder="0"
            min={0}
            className={errors.PaidFees ? "border-red-500" : ""}
          />
          {errors.PaidFees && <span className="text-red-500 text-sm">{errors.PaidFees.message}</span>}
        </div>

        {/* Fees Pending */}
        <div className="space-y-2">
          <Label htmlFor="PendingFees">Fees Pending</Label>
          <Input
            id="PendingFees"
            type="number"
            {...register("PendingFees", { valueAsNumber: true })}
            placeholder="0"
            min={0}
            readOnly
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" type="button" onClick={() => router.push("/dashboard")}>
          Cancel
        </Button>
        <Button
          type="submit"
          // disabled={!isValid || loading}
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
