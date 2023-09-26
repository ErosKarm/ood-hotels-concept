"use client";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Amenity, Booking } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface BookingsTableProps {
  bookings: Booking[];
}

const BookingsTable = ({ bookings }: BookingsTableProps) => {
  const router = useRouter();

  console.log(bookings);

  const onDelete = async (data: Booking) => {
    try {
      await axios.delete("/api/bookings", {
        data,
      });
      router.refresh();
    } catch (error) {
      console.log("error deleting amenity");
    }
  };

  return (
    <ScrollArea className="h-[600px] pr-4">
      <Table className="border rounded-lg p-4 mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Created At</TableHead>
            <TableHead>Is paid</TableHead>
            <TableHead>Booking Guests</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Cabin ID</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{format(booking.createdAt, "dd/MM/yyyy")}</TableCell>
              <TableCell>
                {booking.isPaid === true ? (
                  <Badge className="bg-emerald-500">TRUE</Badge>
                ) : (
                  <Badge className="bg-rose-500">FALSE</Badge>
                )}
              </TableCell>
              <TableCell>{booking.persons} people</TableCell>
              <TableCell>{formatPrice(booking.totalPrice)}€</TableCell>
              <TableCell>{booking.cabinId}</TableCell>
              <TableCell className="flex gap-x-2">
                <AlertDialog>
                  <AlertDialogTrigger className="bg-black text-white p-2 rounded-md font-semibold">
                    Delete
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. Make sure you remove the
                        amenity from the cabin first before deleting.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          onDelete(booking);
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default BookingsTable;
