import { Flame } from 'lucide-react';

export function Header() {
  return (
    <header className="py-6 px-4 md:px-6">
      <div className="container mx-auto flex items-center gap-3">
        <Flame className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Firebase Studio Showcase
        </h1>
      </div>
    </header>
  );
}
