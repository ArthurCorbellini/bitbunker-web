import { cn } from "@/lib/utils";

type TypographyProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

export function H1({ as: Tag = "h1", className, children }: TypographyProps) {
  return (
    <Tag className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>
      {children}
    </Tag>
  );
}

export function H2({ as: Tag = "h2", className, children }: TypographyProps) {
  return (
    <Tag className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)}>
      {children}
    </Tag>
  );
}

export function H3({ as: Tag = "h3", className, children }: TypographyProps) {
  return (
    <Tag className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>
      {children}
    </Tag>
  );
}

export function H4({ as: Tag = "h4", className, children }: TypographyProps) {
  return (
    <Tag className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}>
      {children}
    </Tag>
  );
}

export function P({ as: Tag = "p", className, children }: TypographyProps) {
  return (
    <Tag className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </Tag>
  );
}

export function Lead({ as: Tag = "p", className, children }: TypographyProps) {
  return (
    <Tag className={cn("text-xl text-muted-foreground", className)}>
      {children}
    </Tag>
  );
}