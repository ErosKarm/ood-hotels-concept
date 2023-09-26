import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={cn(
        "mx-auto p-12 sm:max-w-[500px] md:max-w-[700px] lg:max-w-[1800px]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
