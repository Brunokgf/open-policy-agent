export const HeroBanners = () => {
  return (
    <div className="space-y-4">
      {/* Banner Topo */}
      <div className="w-full overflow-hidden rounded-lg">
        <img
          src="/images/banner-topo.webp"
          alt="Banner promocional Sephora"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Banner Categoria */}
      <div className="w-full overflow-hidden rounded-lg">
        <img
          src="/images/banner-categoria.avif"
          alt="Banner categoria skincare"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};
