type PosterCardProps = {
  poster?: string;
  alt?: string;
  className?: string;
};

const PosterCard = ({
  poster,
  alt = "poster",
  className = "w-48 sm:w-60 md:w-52",
}: PosterCardProps) => {
  
  if (!poster) return null;

  return (
    <div className="justify-center hidden md:flex">
      <img src={poster} alt={alt} className={className} loading="lazy" />
    </div>
  );
};

export default PosterCard;