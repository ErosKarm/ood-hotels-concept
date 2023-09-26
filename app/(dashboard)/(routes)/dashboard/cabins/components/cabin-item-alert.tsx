import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Amenity,
  Booking,
  Cabin,
  HouseRule,
  Image as ImageModel,
} from "@prisma/client";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

interface CabinItemAlertProps {
  cabin: {
    amenities: Amenity[];
    houseRules: HouseRule[];
    images: ImageModel[];
    bookings: Booking[];
    id: string;
    name: string;
    checkOut: string;
    checkIn: string;
    description: string;
    location: string;
    isFeatured: boolean;
    isNew: boolean;
    price: string;
    createdAt: Date;
    updatedAt: Date;
  };
  onDelete: (id: string) => void;
}

const CabinItemAlert = ({ cabin, onDelete }: CabinItemAlertProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-slate-900 p-3 rounded-md">
        <Trash className="h-4 w-4 text-red-500" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to delete: {cabin.name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently cabin from the
            database, and cannot be re-done.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete(cabin.id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CabinItemAlert;
