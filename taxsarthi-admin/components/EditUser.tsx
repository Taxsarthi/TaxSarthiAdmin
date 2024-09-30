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
import { getFirestore, doc, getDoc } from "firebase/firestore";

type Props = {
  userData: any;
};

const EditUser = ({ userData }: Props) => {
  const db = getFirestore();
  const [formData, setFormData] = useState({
    name: userData.name || "",
    pan: userData.pan || "",
    mobile: userData.mobile || "",
    Fees: userData.Fees || "0",
    discount: userData.discount || "0",
    PaidFees: userData.PaidFees || "0",
    finalFees: userData.finalFees || "0",
    PendingFees: userData.PendingFees || "0",
    area: userData.area || "",
    email: userData.email || "",
    userType: userData.userType || "",
    remark: userData.remark || "",
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
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
    setSelectedServices(userData.services?.map((service: { name: string }) => service.name) || []);
  }, [userData]);

  // Calculate total fees based on selected services
  useEffect(() => {
    const selectedFees = selectedServices.reduce((total, serviceName) => {
      const service = servicesList.find(s => s.name === serviceName);
      return total + (service ? service.value : 0);
    }, 0);
    
    const discount = parseInt(formData.discount) || 0;
    const calculatedFinalFees = Math.max(selectedFees - discount, 0);
    const PaidFees = parseInt(formData.PaidFees) || 0;
    const calculatedPendingFees = Math.max(calculatedFinalFees - PaidFees, 0);

    setFormData((prev) => ({
      ...prev,
      Fees: selectedFees.toString(),
      finalFees: calculatedFinalFees.toString(),
      PendingFees: calculatedPendingFees.toString(),
    }));
  }, [selectedServices, formData.discount, formData.PaidFees, servicesList]);

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
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  disabled
                />
                <TextField
                  label="PAN"
                  name="pan"
                  value={formData.pan}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  disabled
                />
                <TextField
                  label="Mobile"
                  name="mobile"
                  disabled
                  value={formData.mobile}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                />
                <h1 className="text-black text-md">Services</h1>
                <div className="flex flex-col gap-2 mb-2">
                  {servicesList.map((service) => (
                    <div className="flex gap-2 items-center" key={service.name}>
                      <Checkbox
                        id={service.name}
                        checked={selectedServices.includes(service.name)}
                        onChange={() => handleServiceChange(service.name)}
                      />
                      <label
                        htmlFor={service.name}
                        className="text-sm font-medium leading-none"
                      >
                        {service.name} (Rs. {service.value})
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
                  disabled
                />
                <TextField
                  label="Discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  placeholder="Discount (in Rs.)"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  label="Final Fees"
                  name="finalFees"
                  value={formData.finalFees}
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
