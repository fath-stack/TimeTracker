import { cn } from "@/lib/utils";

export function Card({ title, description, className }: { title: string; description: string; className?: string }) {
  return (
    <div className={cn("rounded-2xl p-6 border shadow-sm bg-white dark:bg-gray-900 dark:border-gray-700", className)}>
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
