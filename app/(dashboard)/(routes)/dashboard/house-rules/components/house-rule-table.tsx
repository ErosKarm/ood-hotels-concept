"use client";

import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HouseRule } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
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

interface HouseRuleTableProps {
  houseRules: HouseRule[];
}

const HouseRuleTable = ({ houseRules }: HouseRuleTableProps) => {
  const router = useRouter();

  const onDelete = async (data: HouseRule) => {
    try {
      await axios.delete("/api/house-rule", {
        data,
      });
      router.refresh();
    } catch (error) {
      console.log("error deleting amenity");
    }
  };

  return (
    <Table className="border rounded-lg p-4 mt-4">
      <TableHeader>
        <TableRow>
          <TableHead>Created At</TableHead>
          <TableHead>Rule</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {houseRules.map((rule) => (
          <TableRow key={rule.id}>
            <TableCell>{format(rule.createdAt, "dd/MM/yyyy")}</TableCell>
            <TableCell>&quot;{rule.name}&quot;</TableCell>
            <TableCell>{rule.id}</TableCell>
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
                      house rule from the cabin first before deleting.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(rule)}>
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
  );
};

export default HouseRuleTable;
