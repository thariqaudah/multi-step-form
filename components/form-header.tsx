export default function FormHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <p className="text-2xl font-bold text-primary mb-1 lg:text-3xl lg:mb-1.5">
        {title}
      </p>
      <p className="text-base text-foreground mb-4 lg:mb-8">{description}</p>
    </>
  );
}
