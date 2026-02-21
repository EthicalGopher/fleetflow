import { cn } from "@/lib/utils";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-4 p-6 rounded-xl border bg-card text-card-foreground shadow-sm")}>
      <h1 className="text-2xl font-bold mb-2">Auth Switch Demo</h1>
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setCount((prev) => prev - 1)}
          className="p-2 rounded-full hover:bg-muted transition-colors border"
          aria-label="Decrease count"
        >
          <Minus className="w-4 h-4" />
        </button>
        <h2 className="text-4xl font-mono font-bold w-12 text-center">{count}</h2>
        <button 
          onClick={() => setCount((prev) => prev + 1)}
          className="p-2 rounded-full hover:bg-muted transition-colors border"
          aria-label="Increase count"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
