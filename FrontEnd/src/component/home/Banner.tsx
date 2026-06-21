// Banner.tsx

type BannerProps = {
  image: string;
  alt?: string;
};

const Banner = ({ image, alt = "banner" }: BannerProps) => {
  return (
    <img
      src={image}
      alt={alt}
      loading="lazy"
      className="object-cover w-full rounded-lg"
    />
  );
};

export default Banner;