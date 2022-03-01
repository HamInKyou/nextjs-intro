/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
  // async redirects() {
  //   return [
  //     {
  //       source: "/contact", //이걸 요청하면
  //       destination: "/form", //이걸로 답해줌
  //       permanent: false, //브라우저나 검색엔진이 이 정보를 기억하고 있는지 (영속 )여부
  //     },
  //   ];
  // },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/image/:image_path",
        destination: `https://image.tmdb.org/t/p/w500/:image_path`,
      },
    ];
  },
};

module.exports = nextConfig;
