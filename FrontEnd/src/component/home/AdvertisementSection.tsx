type AdvertisementSectionProps = {
  ads: string[];
};

const AdvertisementSection = ({ ads }: AdvertisementSectionProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 my-6 sm:grid-cols-2 md:grid-cols-3">
      {ads.map((ad, idx) => (
        <div
          key={idx}
          className="relative overflow-hidden transition-shadow duration-300 rounded-lg shadow-md cursor-pointer group hover:shadow-lg"
        >
          <img
            src={ad}
            alt={`advertisement ${idx + 1}`}
            className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default AdvertisementSection;
