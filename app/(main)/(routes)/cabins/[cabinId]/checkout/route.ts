import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { cabinId: string } }
) {
  const { checkIn, checkOut, guests } = await req.json();

  if (!checkIn || !checkOut || !guests) {
    return new NextResponse("Values are missing", { status: 400 });
  }

  const cabin = await prismadb.cabin.findFirst({
    where: {
      id: params.cabinId,
    },
  });

  if (!cabin) {
    return new NextResponse("Cabin is missing", { status: 400 });
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      quantity: 1,
      price_data: {
        currency: "EUR",
        product_data: {
          name: cabin?.name,
        },
        unit_amount: Number(cabin.price) * 100,
      },
    },
  ];

  const booking = await prismadb.booking.create({
    data: {
      cabinId: params.cabinId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalPrice: cabin.price,
      persons: guests,
      isPaid: false,
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    phone_number_collection: {
      enabled: true,
    },

    success_url: `${process.env.FRONTEND_STORE_URL}/cabins/${cabin.id}?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cabins/${cabin.id}?canceled=1`,

    metadata: {
      bookingId: booking.id,
    },
  });

  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
    }
  );
}
