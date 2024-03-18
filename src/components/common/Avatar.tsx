import React from "react";
import Image from "next/image";

interface Props {
  name: string;
  image?: string;
}

const Avatar = ({ name, image }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <span className="font-semibold text-slate-600">{name}</span>
      {image ? (
        <Image
          src={image}
          className="relative inline-block h-12 w-12 cursor-pointer rounded-full object-cover object-center"
          alt="profile-image"
          width={50}
          height={50}
        />
      ) : (
        <div data-testid="default-avatar" className="h-12 w-12 rounded-full bg-gray-200"></div>
      )}
    </div>
  );
};

export default Avatar;
