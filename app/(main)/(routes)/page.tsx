import { ArrowRight, CornerUpRight, Dot, Triangle, Users2 } from "lucide-react";

import { VideoAutoplay } from "@/components/video-autoplay";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import HotelsList from "@/components/hotels-list";

export default function Home() {
  return (
    <Container>
      <div>
        <div className="grid grid-cols-8 gap-x-12 items-center justify-center mb-24">
          <div className="col-span-6">
            <div className="flex items-center space-x-6 justify-center mr-7 ">
              <Triangle />
              <Badge variant="outline" className="tracking-wide">
                <Dot />
                Estonia — 2023
              </Badge>
              <Badge variant="outline" className="tracking-wide">
                <Dot />
                Wonders
              </Badge>
            </div>
            <h1 className="font-bold text-3xl tracking-wider xl:text-9xl lg:text-7xl text-slate-800 col-span-3">
              ÖÖD Hotels
            </h1>
          </div>

          <div className="mt-8 col-span-2">
            <p className="text-md w-auto mb-4">
              Like all great inventions, ÖÖD was born out of a necessity — when
              brothers Jaak and Andreas wanted to go on a weekend hike.
            </p>
            <Link
              href="/cabins"
              className="flex items-center justify-center text-sm font-[500] w-full text-center bg-slate-900 text-white rounded-full h-10"
            >
              Read about the concept
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-x-12">
          <div className="flex flex-col cols-span-1 h-full  pr-10 col-span-2">
            <h2 className="text-4xl font-semibold mb-4">
              Disconnect to Connect.
            </h2>
            <p className="text-sm font-medium mt-3 italic">
              &quot;It&apos;s not just an overnight stay - it&apos;s an
              experience&quot;
            </p>

            <div className="text-xs flex items-center mt-auto">
              <Users2 className="w-6 h-6 text-emerald-600 mr-2" />
              <span className="text-black/80">
                10k users have visited ÖÖD Hotels
              </span>
            </div>

            <span className="mb-4 mt-auto">Our tour to ÖÖD Hotels include</span>
            <div className="flex gap-2 flex-wrap  ">
              <Badge
                variant="outline"
                className="px-4 py-1 text-xs font-semibold"
              >
                Transfter
              </Badge>
              <Badge
                variant="outline"
                className="px-4 py-1 text-xs font-semibold"
              >
                Outfit
              </Badge>
              <Badge
                variant="outline"
                className="px-4 py-1 text-xs font-semibold"
              >
                Food & Water
              </Badge>
              <Badge
                variant="outline"
                className="px-4 py-1 text-xs font-semibold"
              >
                Guide
              </Badge>
              <Badge
                variant="outline"
                className="px-4 py-1 text-xs font-semibold"
              >
                Tour
              </Badge>
              <Badge
                variant="outline"
                className="px-4 py-1 text-xs font-semibold"
              >
                Photographer
              </Badge>
              <Badge
                variant="outline"
                className="px-4 py-1 text-xs font-semibold"
              >
                Photographer
              </Badge>
              <Badge
                variant="outline"
                className="px-4 py-1 text-xs font-semibold"
              >
                Photographer
              </Badge>
            </div>
          </div>
          <div className="flex items-center justify-center  relative h-full w-full col-span-4">
            <VideoAutoplay className="rounded" />
            <Link
              href={"/cabins"}
              className="flex items-center justify-center text-center text-2xl z-10 text-white h-[170px]  w-[170px] rounded-full bg-emerald-500/70 hover:bg-emerald-500/90 transition"
            >
              Check <br /> availability
            </Link>
          </div>
          <div className="col-span-2">
            <Image
              src="/cabin-image.webp"
              alt="image"
              width={700}
              height={0}
              className="w-full h-72 object-cover rounded-md mt-auto mb-[100px]"
            />
            <div className="grid grid-cols-2 items-center">
              <h2 className="text-5xl font-semibold">Shop</h2>
              <p className="">
                Unlock the mysteries of Iceland&apos;s spellbinding landscapes
              </p>
            </div>

            <Separator className="my-5" />
            <div className="grid grid-cols-2  items-center ">
              <Link className="" href={"/"}>
                <Button className="rounded-full text-xs" size="sm">
                  <CornerUpRight className="w-4 h-4 mr-2" /> Shop for our gift
                  cards
                </Button>
              </Link>
              <div className="flex gap-x-1 mt-3 justify-items-center">
                <span className="text-[9px] text-muted-foreground ml-2 text-center flex items-center">
                  Available payment methods*
                </span>
                <Image
                  src="/mastercard.svg"
                  alt="mastercard logo"
                  width={50}
                  height={50}
                  className="h-5 w-auto"
                />
                <Image
                  src="/american-express.webp"
                  alt="mastercard logo"
                  width={50}
                  height={50}
                  className="h-5 w-auto"
                />
                <Image
                  src="/VISA-logo.png"
                  alt="mastercard logo"
                  width={50}
                  height={50}
                  className="h-5 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[150px]">
        <div className="flex justify-between items-end">
          <h1 className="text-3xl font-semibold">Featured ÖÖD Hotels</h1>
          <Link
            href={"/cabins"}
            className="hover:underline transition-all flex items-center text-sm"
          >
            See all <ArrowRight className="w-4 h-4 ml-1 text-slate-700" />
          </Link>
        </div>
        <Separator />

        <HotelsList />
      </div>

      <div className="grid items-center  grid-cols-2 mt-[100px] bg-slate-900 h-96 rounded-md shadow-md">
        <div className="text-white pl-12">
          <h1 className="text-7xl font-bold">
            Fill your life with experiences. Not things.
          </h1>
          <Separator className="bg-slate-100" />

          <Button variant="outline" className="text-black mt-4">
            Shop for Gift Cards
          </Button>
        </div>

        <div className="relative h-full w-full">
          <Image
            fill
            src="/credit-cards.webp"
            alt="Concept image"
            className="z-10 object-contain"
          />
        </div>
      </div>

      <div className="mt-[100px]">
        <h1 className="text-3xl font-semibold">Concept</h1>
        <Separator />

        <div className="grid grid-cols-2 gap-x-24 h-[400px] w-full p-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-1 row-span-2">
              <Image
                fill
                src="/concept-image.webp"
                alt="Concept image"
                className="z-10 object-cover rounded-[20px]"
              />
            </div>

            <div className="relative">
              <Image
                fill
                src="/concept-image-2.webp"
                alt="Concept image"
                className="z-10 object-cover rounded-[20px]"
              />
            </div>
            <div className=" grid grid-cols-2 gap-4">
              <div className="relative h-full w-full">
                <Image
                  fill
                  src="/concept-image-3.webp"
                  alt="Concept image"
                  className="z-10 object-cover rounded-[20px]"
                />
              </div>
              <div className="relative h-full w-full">
                <Image
                  fill
                  src="/concept-image-4.webp"
                  alt="Concept image"
                  className="z-10 object-cover rounded-[20px]"
                />
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-semibold">Founders story</h1>
            <Separator />
            <p className="text-slate-800 mt-4 text-md w-[75%]">
              Like all great inventions, ÖÖD was born out of a necessity — when
              brothers Jaak and Andreas wanted to go on a weekend hike. They
              didn’t want a traditional one-size-fits-all hotel experience —
              that was boring..
            </p>

            <Link
              href="/concept"
              className="flex items-center hover:underline text-sm mt-4 text-muted-foreground"
            >
              Read more about this
              <ArrowRight className="w-4 h-4 ml-1 text-slate-700" />
            </Link>

            <h1 className="text-xl font-semibold mt-5">The Team</h1>
            <Separator />

            <div className="flex h-[70px] w-full gap-4 mt-4">
              <div className="flex flex-col">
                <span className="font-semibold text-sms">Daniel Fanselow</span>
                <span className="text-xs text-muted-foreground">
                  Head of Hotel Development
                </span>
                <span className="text-[11px] text-emerald-700 mt-2">
                  daniel@oodhouse.com
                </span>
              </div>
              <Separator orientation="vertical" />
              <div className="flex flex-col">
                <span className="font-semibold text-sm">Brigita Valdmaa</span>
                <span className="text-xs text-muted-foreground">
                  Head of Operations
                </span>
                <span className="text-[11px] text-emerald-700 mt-2">
                  brigita@oodhouse.com
                </span>
              </div>
              <Separator orientation="vertical" />
              <div className="flex flex-col text-sm">
                <span className="font-semibold">Natalja Morozova</span>
                <span className="text-xs text-muted-foreground">
                  Project Manager
                </span>
                <span className="text-[11px] text-emerald-700 mt-2">
                  natalja@oodhouse.com
                </span>
              </div>
              <Separator orientation="vertical" />
              <div className="flex flex-col">
                <span className="font-semibold text-sm">Anne Kiilaspää</span>
                <span className="text-xs text-muted-foreground">
                  Customer Support
                </span>
                <span className="text-[11px] text-emerald-700 mt-2">
                  info@oodhotels.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
