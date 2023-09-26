"use client";
import { addDays, format, isBefore, isWithinInterval } from "date-fns";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { DatePickerWithRange } from "./date-range-picker";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn, formatPrice } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Separator } from "./ui/separator";
import Image from "next/image";
import axios from "axios";

const formSchema = z.object({
  dateRange: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),

  type: z.enum(["1", "2"], {
    required_error: "You need to select one to continue",
  }),
});

interface CabinItemSidebarFormProps {
  cabin: {
    amenities: {
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
    houseRules: {
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
    bookings: {
      id: string;
      cabinId: string;
      checkInDate: Date;
      checkOutDate: Date;
      isPaid: Boolean;
    }[];
    images: {
      id: string;
      cabinId: string;
      url: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
    // Add other properties here as needed
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
  } | null;
}

const CabinItemSidebarForm = ({ cabin }: CabinItemSidebarFormProps) => {
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);

  useEffect(() => {
    // Create an array to hold all the disabled dates
    const allDisabledDates: Date[] = [];

    // Iterate through each booking
    cabin?.bookings.forEach((booking) => {
      const checkInDate = new Date(booking.checkInDate);
      const checkOutDate = new Date(booking.checkOutDate);

      // Iterate through dates between check-in and check-out, and add them to the disabled dates array
      let currentDate = new Date(checkInDate);
      while (currentDate <= checkOutDate) {
        allDisabledDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    setDisabledDates(allDisabledDates);
  }, [cabin?.bookings]);

  // Find the first available date range that has 2 consecutive available dates
  const findFirstAvailableDateRange = () => {
    const today = new Date();
    let startDate = new Date(today);
    let endDate = addDays(startDate, 1);

    while (endDate) {
      const isStartDateAvailable = !disabledDates.some((disabledDate) =>
        isWithinInterval(startDate, {
          start: disabledDate,
          end: disabledDate,
        })
      );

      const isEndDateAvailable = !disabledDates.some((disabledDate) =>
        isWithinInterval(endDate, {
          start: disabledDate,
          end: disabledDate,
        })
      );

      if (isStartDateAvailable && isEndDateAvailable) {
        return { from: startDate, to: endDate };
      }

      startDate = addDays(startDate, 1);
      endDate = addDays(endDate, 1);
    }

    // Return a default range with today's date and the next day
    return {
      from: today,
      to: addDays(today, 1),
    };
  };

  const [date, setDate] = useState<DateRange | undefined>(
    findFirstAvailableDateRange()
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "1",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await axios.post(`/cabins/${cabin?.id}/checkout`, {
      checkIn: date?.from,
      checkOut: date?.to,
      guests: values.type,
    });

    window.location = response.data.url;
  };

  const totalPrice = () => {
    if (date && cabin) {
      const dateFrom = date?.from;
      const dateTo = date?.to;
      const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
      const daysBetween = Math.round(
        ((dateTo?.getTime() || 0) - (dateFrom?.getTime() || 0)) / oneDay
      );
      const pricePerNight = parseFloat(cabin.price); // Assuming 'cabin.price' is a string
      const totalPrice = daysBetween * pricePerNight;
      return formatPrice(totalPrice.toFixed(2)); // Format the total price
    }
    return "0.00"; // Default value if date or cabin is not available
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-4">
                <FormLabel>Date Range</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        disabled={(date) => {
                          const today = new Date();
                          // Disable if it's in the past or one of the disabled dates
                          return (
                            isBefore(date, today) ||
                            disabledDates.some((disabledDate) =>
                              isWithinInterval(date, {
                                start: disabledDate,
                                end: disabledDate,
                              })
                            )
                          );
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 items-end">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of guests?</FormLabel>
                  <FormControl>
                    <RadioGroup defaultValue="1" onValueChange={field.onChange}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="1" />
                        <Label htmlFor="1">1 Person</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id="1" />
                        <Label htmlFor="1">2 Person</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Book your stay</Button>
          </div>
        </form>
      </Form>
      <Separator className="mb-4 mt-6" />
      <div className="flex justify-between">
        <Image
          src={"/logo.svg"}
          alt="ÖÖD Hotels Logo"
          className=" invert"
          width={100}
          height={100}
        />
        <div className="flex flex-col justify-end">
          <span className="text-xs mb-2 text-muted-foreground ml-auto">
            Price per night: {formatPrice(`${cabin?.price}`)} €
          </span>

          <span className="ml-auto">
            Total:{" "}
            <strong className="text-xl font-semibold">{totalPrice()} €</strong>
          </span>
          <span className="text-muted-foreground text-[9px] text-end">
            (fees included)
          </span>
        </div>
      </div>
    </>
  );
};

export default CabinItemSidebarForm;
