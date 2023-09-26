import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!body) {
      return new NextResponse("Form-data is required", { status: 400 });
    }

    const {
      name,
      amenities, // Array of amenity objects
      checkIn,
      checkOut,
      description,
      latitude,
      longitude,
      featured,
      houseRules, // Array of house rule objects
      images,
      isNew,
      location,
      price,
    } = body;

    // Extract the IDs or identifiers from the amenity and house rule objects
    const amenityIds = amenities.map((amenity: any) => amenity.id);
    const houseRuleIds = houseRules.map((rule: any) => rule.id);

    // Fetch existing amenities and house rules based on the extracted IDs
    const existingAmenities = await prismadb.amenity.findMany({
      where: {
        id: { in: amenityIds },
      },
    });

    const existingHouseRules = await prismadb.houseRule.findMany({
      where: {
        id: { in: houseRuleIds },
      },
    });

    const cabin = await prismadb.cabin.create({
      data: {
        name,
        checkOut,
        checkIn,
        description,
        location,
        latitude,
        longitude,
        isFeatured: featured,
        isNew,
        price,
        amenities: {
          connect: existingAmenities.map((amenity) => ({ id: amenity.id })),
        },
        houseRules: {
          connect: existingHouseRules.map((rule) => ({ id: rule.id })),
        },
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => ({ url: image.url })),
            ],
          },
        },
      },
      include: {
        amenities: true, // This includes the amenities in the returned cabin object
      },
    });

    return NextResponse.json(cabin);
  } catch (error) {
    console.log("[CABINS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!body) {
      return new NextResponse("Form-data is required", { status: 400 });
    }

    const {
      id,
      name,
      amenities, // Array of amenity objects
      checkIn,
      checkOut,
      description,
      featured,
      latitude,
      longitude,
      houseRules, // Array of house rule objects
      images,
      isNew,
      location,
      price,
    } = body;

    const cabinId = id;

    if (!cabinId) {
      return new NextResponse("Cabin ID is missing", { status: 400 });
    }

    // Extract the IDs or identifiers from the amenity and house rule objects
    const amenityIds = amenities.map((amenity: any) => amenity.id);
    const houseRuleIds = houseRules.map((rule: any) => rule.id);

    // Fetch existing amenities and house rules based on the extracted IDs
    const existingAmenities = await prismadb.amenity.findMany({
      where: {
        id: { in: amenityIds },
      },
    });

    const existingHouseRules = await prismadb.houseRule.findMany({
      where: {
        id: { in: houseRuleIds },
      },
    });

    // Clear existing images associated with the cabin
    await prismadb.image.deleteMany({
      where: {
        cabinId,
      },
    });

    // Create new images based on the updated data
    const newImages = await prismadb.image.createMany({
      data: images.map((image: { url: string }) => ({
        url: image.url,
        cabinId,
      })),
    });

    // Update cabin data
    const updatedCabin = await prismadb.cabin.update({
      where: {
        id: cabinId,
      },
      data: {
        name,
        checkOut,
        checkIn,
        latitude,
        longitude,
        description,
        location,
        isFeatured: featured,
        isNew,
        price,
        amenities: {
          connect: existingAmenities.map((amenity) => ({ id: amenity.id })),
        },
        houseRules: {
          connect: existingHouseRules.map((rule) => ({ id: rule.id })),
        },
      },
      include: {
        amenities: true, // This includes the amenities in the returned cabin object
      },
    });

    return NextResponse.json(updatedCabin);
  } catch (error) {
    console.log("[CABINS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { id } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!body) {
      return new NextResponse("Amenity ID is required", { status: 400 });
    }

    const cabin = await prismadb.cabin.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(cabin);
  } catch (error) {
    console.log("[CABIN_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
