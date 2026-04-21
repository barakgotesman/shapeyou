import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <div dir="ltr" className="py-1">
    <SliderPrimitive.Root
      ref={ref}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      {...props}
    >
      <SliderPrimitive.Track
        className="relative h-2 w-full grow rounded-full"
        style={{ backgroundColor: "#EDE9FE" }}
      >
        <SliderPrimitive.Range
          className="absolute h-full rounded-full"
          style={{ backgroundColor: "#6C63FF" }}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block h-5 w-5 rounded-full bg-white shadow-md cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        style={{ borderWidth: 2, borderStyle: "solid", borderColor: "#6C63FF", boxShadow: "0 1px 6px #6C63FF40" }}
      />
    </SliderPrimitive.Root>
  </div>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
