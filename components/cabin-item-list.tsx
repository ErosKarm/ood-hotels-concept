import CabinPageItem from "./cabin-page-item";
import { ScrollArea } from "./ui/scroll-area";

interface CabinItemListProps {
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
        location: string;
        isFeatured: boolean;
        isNew: boolean;
        price: string;
        createdAt: Date;
        updatedAt: Date;
      }[];
}

const CabinItemList = ({ cabins }: CabinItemListProps) => {
  return (
    <div>
      <ScrollArea className="h-[800px] pr-8">
        {cabins.map((cabin) => (
          <CabinPageItem key={cabin.id} cabin={cabin} />
        ))}{" "}
      </ScrollArea>
    </div>
  );
};

export default CabinItemList;
