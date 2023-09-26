import { cn } from "@/lib/utils";

interface VideoAutoplayProps {
  className?: string;
}

export const VideoAutoplay = ({ className }: VideoAutoplayProps) => {
  return (
    <video
      muted
      width="100%"
      autoPlay
      loop
      className={cn(
        "w-full h-full object-cover absolute top-0 left-0",
        className
      )}
    >
      <source src="/videos/homepage-video.mp4" />
    </video>
  );
};
