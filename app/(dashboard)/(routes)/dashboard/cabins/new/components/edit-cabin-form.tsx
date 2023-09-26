"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import { Switch } from "@/components/ui/switch";
import ImageUpload from "@/components/ui/image-upload";
import { MultiSelect } from "@/components/ui/multi-select";

import { Amenity, Booking, HouseRule } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import prismadb from "@/lib/prismadb";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  amenities: z
    .object({
      id: z.string(),
      name: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
    .array(),
  houseRules: z
    .object({
      id: z.string(),
      name: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
    .array(),
  images: z.object({ url: z.string() }).array(),
  checkIn: z.string().min(1),
  latitude: z.string(),
  longitude: z.string(),
  checkOut: z.string().min(1),
  featured: z.boolean().default(false),
  description: z.string().min(1),
  location: z.string().min(1),
  isNew: z.boolean().default(false),
  price: z.string().min(1),
});

interface AmenitiesFormProps {
  amenities: Amenity[];
  houseRules: HouseRule[];

  cabin: any;
}

const EditCabinForm = ({
  amenities,
  houseRules,
  cabin,
}: AmenitiesFormProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: cabin
      ? cabin
      : {
          id: cabin.id,
          name: "",
          amenities: [],
          houseRules: [],
          images: [],
          checkIn: "",
          checkOut: "",
          latitude: "",
          longitude: "",
          featured: false,
          description: "",
          location: "",
          isNew: false,
          price: "",
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      console.log(values);

      const response = await axios.patch("/api/cabins", values);

      form.reset();

      window.location.href = "/dashboard/cabins";
    } catch (error) {
      console.log("Something went wrong, this RAN");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollArea className="flex flex-1 h-full">
      <h1 className="p-4 font-semibold text-xl mt-2 mx-10">Cabin Data</h1>
      <Separator className="mx-10" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6 p-4 mt-8 mx-10"
        >
          <div className="grid grid-cols-3 gap-x-6">
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cabin name</FormLabel>
                    <FormControl>
                      <Input placeholder="Cabin name" {...field} />
                    </FormControl>
                    <FormDescription>
                      NB! Cabin name will be displayed on the frontend.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cabin ID</FormLabel>
                    <FormControl>
                      <Input disabled placeholder="Cabin name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="amenities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amenities</FormLabel>
                  <FormControl>
                    <MultiSelect
                      selectedValues={cabin.amenities}
                      onChange={(val) => {
                        field.onChange([...field.value, { ...val }]);
                      }}
                      values={amenities}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="houseRules"
              render={({ field }) => {
                return (
                  <FormItem className="z-90">
                    <FormLabel>House rules</FormLabel>
                    <FormControl>
                      <MultiSelect
                        selectedValues={cabin.houseRules}
                        values={houseRules}
                        onChange={(val) => {
                          console.log(val);

                          field.onChange([...field.value, { ...val }]);
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cabin Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="checkIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Check-in Time</FormLabel>
                  <FormControl>
                    <Input placeholder="14:00" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="checkOut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Check-out Time</FormLabel>
                  <FormControl>
                    <Input placeholder="12:00" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input placeholder="58.5974875" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input placeholder="24.9872555" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Cabin name" {...field} />
                </FormControl>
                <FormDescription>
                  This description will be displayed on the Cabin Page.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Rõuge, Otepää, Estonia" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price for one night</FormLabel>
                    <FormControl>
                      <Input placeholder="139€" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-2">
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is Featured?</FormLabel>
                    <div className="flex items-center space-x-4">
                      <FormDescription className="text-xs text-rose-500">
                        Cabin will appear on the frontpage.
                      </FormDescription>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isNew"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is New?</FormLabel>
                    <div className="flex items-center space-x-4">
                      <FormDescription className="text-xs">
                        <span className="bg-emerald-500 text-white px-2 py-1 font-semibold text-center rounded-md items-center mr-1">
                          New
                        </span>{" "}
                        tag will appear on the cabin
                      </FormDescription>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <h1 className="p-4 font-semibold text-xl mt-8 mx-10 ">
        Bookings for {cabin.name}
      </h1>

      <div className="mx-10 mb-10">
        {cabin.bookings.map((booking: Booking) => (
          <Table key={booking.id}>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Booking ID</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Check-In</TableHead>
                <TableHead>Check-Out</TableHead>
                <TableHead>Total Guests</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="">
                <TableCell className="font-medium">{booking.id}</TableCell>
                <TableCell>
                  {booking.isPaid === true ? (
                    <Badge className="bg-emerald-600">Paid</Badge>
                  ) : (
                    <Badge className="bg-rose-600">False</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {booking.checkInDate.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  {booking.checkOutDate.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>{booking.persons}</TableCell>

                <TableCell className="text-right">
                  {formatPrice(booking.totalPrice)}€
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ))}
      </div>
    </ScrollArea>
  );
};

export default EditCabinForm;
