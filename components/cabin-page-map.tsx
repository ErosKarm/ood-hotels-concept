"use client";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L, { DivIcon } from "leaflet";

import "leaflet/dist/leaflet.css";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface CabinPageMapProps {
  cabins:
    | {
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
        latitude: string;
        longitude: string;
        location: string;
        isFeatured: boolean;
        isNew: boolean;
        price: string;
        createdAt: Date;
        updatedAt: Date;
      }[];
}

const CabinPageMap = ({ cabins }: CabinPageMapProps) => {
  const router = useRouter();

  const customIcon = new DivIcon({
    className: "custom-icon",
    html: `<div class="bg-white p-1 w-[40px] flex items-center justify-center text-[11px] font-semibold rounded-md"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="pe-none"><path d="M7.42111 5H6.25625V6.16486H7.42111V5Z" fill="#225A59"></path><path d="M11.6005 5H10.4357V6.16486H11.6005V5Z" fill="#225A59"></path><path d="M3 7.2928V19.2536H8.29392V7.2928H3ZM7.30697 18.2633H3.9903V8.2831H7.30697V18.2633Z" fill="#225A59"></path><path d="M5.03767 5H3.87281V6.16486H5.03767V5Z" fill="#225A59"></path><path d="M13.9873 5H12.8225V6.16486H13.9873V5Z" fill="#225A59"></path><path d="M16.1291 7.2928V19.2536L21 15.3159V9.01492L16.1291 7.2928ZM20.0097 14.8426L17.116 17.1925V8.68929L20.0097 9.71317V14.8426Z" fill="#225A59"></path><path d="M9.55949 19.2536H14.8568V7.2928H9.55949V19.2536ZM10.5666 8.2831H13.8833V18.2633H10.5666V8.2831Z" fill="#225A59"></path></svg></div>`,
  });

  return (
    <MapContainer
      center={[58.5974875, 25]}
      zoom={8}
      scrollWheelZoom={false}
      className="hidden lg:flex col-span-3 rounded bg-rose-500 mt-auto h-full w-full"
      style={{ width: "100%", height: "calc(90vh - 4rem)" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />

      {cabins.map((cabin) => (
        <Marker
          position={[Number(cabin.latitude), Number(cabin.longitude)]}
          icon={customIcon}
          key={cabin.id}
          eventHandlers={{
            click: () => router.push(`/cabins/${cabin.id}`),
          }}
        />
      ))}
    </MapContainer>
  );
};

export default CabinPageMap;
