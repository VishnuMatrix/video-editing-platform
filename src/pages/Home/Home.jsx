import Navbar from "../../components/navbar/Navbar";
import Hero from "./sections/Hero";
import Showcase from "./sections/Showcase";
import Footer from "../../components/footer/Footer";

function Home() {
  return (
    <main className="home-page">
      <Navbar />
      <Hero />
      <Showcase />
      <Footer />
    </main>
  );
}

export default Home;
