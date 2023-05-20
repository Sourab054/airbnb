"use client";

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import { MdOutlinePeopleAlt, MdOutlineShower } from "react-icons/md";
import { IoBedOutline } from "react-icons/io5";
import Heading from "../Heading";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;
  const locationPlace = getByValue(locationValue);

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            justify-between
            gap-2
          "
        >
          <div>
            <div>Hosted by {user?.name}</div>
          </div>
          <div>
            <Avatar src={user?.image} />
          </div>
        </div>
        <div
          className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div className="px-5 flex items-center justify-center py-2.5 font-semibold border border-neutral-300 text-gray-900 rounded-md">
            <MdOutlinePeopleAlt size={28} className="mr-2" />
            {guestCount} guests
          </div>
          <div className="px-5 flex items-center justify-center py-2.5 font-semibold border border-neutral-300 text-gray-900 rounded-md">
            <IoBedOutline size={30} className="mr-2" />
            {roomCount} rooms
          </div>
          <div className="px-5 flex items-center justify-center py-2.5 font-semibold border border-neutral-300 text-gray-900 rounded-md">
            <MdOutlineShower size={30} className="mr-2" />
            {bathroomCount} bathrooms
          </div>
        </div>
      </div>
      <hr />
      {/* {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )} */}
      {/* <hr /> */}

      <Heading title="About this place" />
      <div
        className="
      text-base font-light text-neutral-500 -mt-6"
      >
        {description}
      </div>
      <hr />
      <Heading
        title="Where you’ll be"
        subtitle={`${locationPlace?.region}, ${locationPlace?.label}`}
      />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
