import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { id } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!body) {
      return new NextResponse("Booking ID is required", { status: 400 });
    }

    const booking = await prismadb.booking.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.log("[BOOKING_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const amenities = await prismadb.amenity.findMany();
    return NextResponse.json(amenities);
  } catch (error) {
    console.log("[AMENITIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
