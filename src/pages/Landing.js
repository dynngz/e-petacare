import HeroSection from "../components/landingCp/HeroSection"
import FeaturedSection from "../components/landingCp/FeaturedSection"
import AboutUs from "../components/landingCp/AboutUsSection"
import StoresSection from "../components/landingCp/StoresSection"
import BlogSection from "../components/landingCp/BlogSection"

export default function Landing({images}) {
  return (
    <>
      <HeroSection />
      <FeaturedSection images={images} />
      <AboutUs />
      <StoresSection />
      <BlogSection /> 
    </>
  )
}
