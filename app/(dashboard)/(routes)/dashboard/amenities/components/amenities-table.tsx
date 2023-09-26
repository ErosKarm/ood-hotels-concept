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

import { Button } from "@/components/ui/button";
import { Amenity } from "@prisma/client";
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

interface AmenitiesTableProps {
  amenities: Amenity[];
}

const AmenitiesTable = ({ amenities }: AmenitiesTableProps) => {
  const router = useRouter();

  const onDelete = async (data: Amenity) => {
    try {
      await axios.delete("/api/amenities", {
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
            <TableHead>Name</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {amenities.map((amenity) => (
            <TableRow key={amenity.id}>
              <TableCell>{format(amenity.createdAt, "dd/MM/yyyy")}</TableCell>
              <TableCell>{amenity.name}</TableCell>
              <TableCell>{amenity.id}</TableCell>
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
                          onDelete(amenity);
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

export default AmenitiesTable;
