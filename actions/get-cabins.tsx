import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

const getCabins = async () => {
  const cabin = await prismadb.cabin.findMany();

  return NextResponse.json(cabin);
};

export default getCabins;
