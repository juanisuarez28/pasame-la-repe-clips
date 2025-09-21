import Hero from "@/components/Hero";
import Header from "@/components/Header";
const Index = () => {
  return <>
      <Header />
      <Hero />
      <footer className="bg-darker-surface py-4 text-center">
        <p className="text-muted-foreground text-sm">© 2025 Pasame la Repe. Todos los derechos reservados.</p>
      </footer>
    </>;
};
export default Index;