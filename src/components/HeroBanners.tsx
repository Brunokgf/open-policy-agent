export const HeroBanners = () => {
  return (
    <div className="space-y-4">
      {/* Banner Topo */}
      <div className="w-full overflow-hidden rounded-lg">
        <img
          src="/images/banner-topo.gif"
          alt="Banner promocional Sephora"
          className="w-full h-auto object-cover"
          onError={(e) => {
            // Fallback se a imagem não carregar
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Banner Categoria */}
      <div className="w-full overflow-hidden rounded-lg">
        <img
          src="/images/banner-categoria.jpg"
          alt="Banner categoria skincare"
          className="w-full h-auto object-cover"
          onError={(e) => {
            // Fallback se a imagem não carregar
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
    </div>
  );
};
