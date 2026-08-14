import Navigation from "./components/Navigation/Navigation";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import Skills from "./components/Skills/Skills";
import DevSecOpsProject from "./components/DevSecOpsProject/DevSecOpsProject";
import TechStack from "./components/TechStack/TechStack";
import Education from "./components/Education/Education";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import CustomCursor from "./components/Cursor/CustomCursor";

function App() {
  return (
    <div className="bg-void min-h-screen">
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <DevSecOpsProject />
        <TechStack />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
