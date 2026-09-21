import Navbar from "../../components/navbar/Navbar";
import Hero from "./sections/Hero";
import Showcase from "./sections/Showcase";

function Home() {
  return (
    <main className="home-page">
      <Navbar />
      <Hero />
      <Showcase />
    </main>
  );
}

export default Home;
