import { Image as ImageModel } from "@prisma/client";
import Image from "next/image";

interface CabinItemImagesProps {
  images?: ImageModel[];
}

const CabinItemImages = ({ images }: CabinItemImagesProps) => {
  return (
    <div className=" grid grid-cols-3 h-[400px] gap-2">
      <div className="col-span-2 row-span-2 relative">
        <Image
          src={images ? images[0].url : ""}
          fill
          alt="Cabin Image"
          quality={100}
          className="object-cover rounded-md"
        />
      </div>

      <div className="relative">
        <Image
          src={images ? images[1].url : ""}
          fill
          alt="Cabin Image"
          className="object-cover rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-x-2">
        <div className="relative">
          <Image
            src={images ? images[2].url : ""}
            fill
            alt="Cabin Image"
            className="object-cover rounded-md"
          />
        </div>

        <div className="relative">
          <Image
            src={images ? images[3].url : ""}
            fill
            alt="Cabin Image"
            className="object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default CabinItemImages;
