type SectionTitleProps = {
  title: string;
  className?: string;
};

const SectionTitle = ({
  title,
  className = "p-2 text-xl font-semibold bg-gray-100 md:text-2xl",
}: SectionTitleProps) => {
  return <h2 className={className}>{title}</h2>;
};

export default SectionTitle;