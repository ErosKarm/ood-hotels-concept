import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("m-8 mx-18 md:m-12 md:mx-24", className)}>
      {children}
    </div>
  );
};

export default Container;
