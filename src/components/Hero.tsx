import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import footballHeroBg from "@/assets/football-hero-bg.jpg";
const Hero = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16" style={{
    backgroundImage: `url(${footballHeroBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-darker-surface/80" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-8xl font-bold text-foreground mb-6">
            Pasame la 
            <span className="text-transparent bg-gradient-recording bg-clip-text font-bold"> repe</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto">Grabamos tu partido y te generamos los highlights con IA para que revivas los mejores momentos</p>
        </div>

        {/* Desktop Cards */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Ver tu repe */}
          <Card className="bg-gradient-card backdrop-blur-sm border-border/50 p-8 hover:shadow-card transition-all duration-300 hover:scale-105">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-gradient-recording rounded-full flex items-center justify-center">
                <Video className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Mirá tu repe</h2>
              <p className="text-muted-foreground">Accedé a tu video usando usuario y contraseña</p>
              <Button variant="hero" size="lg" className="w-full" onClick={() => navigate('/login')}>
                Ver mi video
              </Button>
            </div>
          </Card>

          {/* Sacar turno */}
          <Card className="bg-gradient-card backdrop-blur-sm border-border/50 p-8 hover:shadow-card transition-all duration-300 hover:scale-105">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-gradient-recording rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Sacar turno</h2>
              <p className="text-muted-foreground">Reservá fecha y horario para grabar tu partido</p>
              <Button variant="hero-outline" size="lg" className="w-full" onClick={() => navigate('/turno')}>
                Reservar grabación
              </Button>
            </div>
          </Card>
        </div>

        {/* Mobile Buttons */}
        <div className="md:hidden flex flex-col gap-4 max-w-sm mx-auto">
          <Button 
            variant="hero" 
            size="lg" 
            className="w-full h-14 text-base" 
            onClick={() => navigate('/login')}
          >
            <Video className="w-5 h-5 mr-2" />
            Mira tu Repe
          </Button>
          <Button 
            variant="hero-outline" 
            size="lg" 
            className="w-full h-14 text-base" 
            onClick={() => navigate('/turno')}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Sacar turno
          </Button>
        </div>
      </div>
    </div>;
};
export default Hero;