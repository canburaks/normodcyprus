import { useRef } from "react";
import { useTranslation } from "next-i18next/pages";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { AssetImage } from "@/components/media/asset-image";
import { Button } from "@/components/ui/button";
import { NativeDialog } from "@/components/ui/native-dialog";
import { useShowroomStore } from "@/providers/showroom-store-provider";
import type { ImageAsset } from "@/lib/content/models";

export function ProductGallery({ images, name }: { images: ImageAsset[]; name: string }) {
  const { t } = useTranslation("common");
  const index = useShowroomStore((state) => state.galleryIndex);
  const setIndex = useShowroomStore((state) => state.setGalleryIndex);
  const trackRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const currentIndex = Math.min(index, images.length - 1);
  function select(next: number) {
    const nextIndex = (next + images.length) % images.length;
    setIndex(nextIndex);
    const track = trackRef.current;
    track?.scrollTo({
      left: nextIndex * track.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <section aria-label={name}>
      <div
        className="gallery-track"
        ref={trackRef}
        tabIndex={0}
        aria-label={name}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            select(currentIndex + (event.key === "ArrowRight" ? 1 : -1));
          }
        }}
        onScrollEnd={(event) => {
          const track = event.currentTarget;
          setIndex(Math.round(track.scrollLeft / track.clientWidth));
        }}
      >
        {images.map((image, imageIndex) => (
          <div className="gallery-slide" key={image.id}>
            <AssetImage
              asset={image}
              sizes="(min-width: 1024px) 55vw, 90vw"
              isEager={imageIndex === 0}
            />
          </div>
        ))}
      </div>
      <div className="gallery-controls">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => select(currentIndex - 1)}
          aria-label={t("previous")}
        >
          <ChevronLeft aria-hidden="true" />
        </Button>
        <span aria-live="polite">
          {t("imageCount", { current: currentIndex + 1, total: images.length })}
        </span>
        <Button variant="ghost" onClick={() => dialogRef.current?.showModal()}>
          <Maximize2 aria-hidden="true" />
          {t("expand")}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => select(currentIndex + 1)}
          aria-label={t("next")}
        >
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
      <div className="gallery-thumbnails">
        {images.map((image, imageIndex) => (
          <Button
            variant="ghost"
            key={image.id}
            aria-label={t("imageSelect", { number: imageIndex + 1 })}
            aria-current={currentIndex === imageIndex}
            onClick={() => select(imageIndex)}
          >
            <AssetImage asset={image} sizes="80px" isDecorative />
          </Button>
        ))}
      </div>
      <NativeDialog
        ref={dialogRef}
        className="gallery-dialog"
        aria-label={name}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            select(currentIndex + (event.key === "ArrowRight" ? 1 : -1));
          }
        }}
      >
        <AssetImage asset={images[currentIndex]} sizes="90vw" />
        <div className="gallery-controls">
          <Button variant="ghost" onClick={() => select(currentIndex - 1)}>
            <ChevronLeft aria-hidden="true" />
            {t("previous")}
          </Button>
          <span aria-live="polite">
            {t("imageCount", { current: currentIndex + 1, total: images.length })}
          </span>
          <Button variant="ghost" onClick={() => select(currentIndex + 1)}>
            {t("next")}
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      </NativeDialog>
    </section>
  );
}
