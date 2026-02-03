interface PageHeroProps {
  emoji?: string;
  title: string;
  subtitle: string;
}

export function PageHero({ emoji, title, subtitle }: PageHeroProps) {
  return (
    <div className="page-hero">
      <h1 className="text-3xl font-bold text-foreground mb-3">
        {emoji && <span className="mr-2">{emoji}</span>}
        {title}
      </h1>
      <p className="impact-phrase text-lg text-muted-foreground font-medium leading-relaxed max-w-3xl">
        {subtitle}
      </p>
    </div>
  );
}
