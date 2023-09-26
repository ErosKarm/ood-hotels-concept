import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { Amenity } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { id, name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const amenity = await prismadb.amenity.update({
      where: {
        id,
      },

      data: {
        name,
      },
    });

    return NextResponse.json(amenity);
  } catch (error) {
    console.log("[AMENITIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const amenity = await prismadb.amenity.create({
      data: {
        name,
      },
    });

    return NextResponse.json(amenity);
  } catch (error) {
    console.log("[AMENITIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();

    const body = await req.json();

    console.log(body);

    const { id } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!body) {
      return new NextResponse("Amenity ID is required", { status: 400 });
    }

    const amenity = await prismadb.amenity.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(amenity);
  } catch (error) {
    console.log("[AMENITIES_DELETE]", error);
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
