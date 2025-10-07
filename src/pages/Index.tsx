import Hero from "@/components/Hero";
import Header from "@/components/Header";
import { Instagram } from "lucide-react";
const Index = () => {
  return <>
      <Header />
      <Hero />
      <footer className="bg-darker-surface py-6 text-center">
        <a 
          href="https://www.instagram.com/pasame_larepe/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block mb-3 hover:opacity-80 transition-opacity"
        >
          <Instagram className="w-6 h-6 text-muted-foreground" />
        </a>
        <p className="text-muted-foreground text-sm">© 2025 Pasame la Repe. Todos los derechos reservados.</p>
      </footer>
    </>;
};
export default Index;