"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: Props) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-5">
      {/* Main Image */}
      <div className="overflow-hidden rounded-[30px] bg-[#ECECE8]">
        <div className="relative aspect-[4/5]">
          <Image
            src={selectedImage}
            alt={name}
            fill
            priority
            className="object-cover transition duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((image) => (
            <button
              key={image}
              onClick={() => setSelectedImage(image)}
              className={`overflow-hidden rounded-2xl border-2 transition ${
                selectedImage === image
                  ? "border-[#7AC943]"
                  : "border-transparent"
              }`}
            >
              <div className="relative h-24 w-24">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}