import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };
  if (!user) {
    return null; // Loading or redirecting
  }
  const videoId = user.path ? getYouTubeVideoId(user.path) : null;
  return <>
      <Header />
      <div className="min-h-screen bg-gradient-hero pt-20 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary-foreground mb-2">
              ¡Hola {user?.username}!
            </h1>
            <p className="text-primary-foreground/80">Acá podés ver la repetición del partido</p>
          </div>

          <Card className="bg-card/95 backdrop-blur-sm shadow-card">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-recording rounded-full flex items-center justify-center mb-4">
                {user?.path ? <Video className="w-8 h-8 text-primary-foreground" /> : <Clock className="w-8 h-8 text-primary-foreground" />}
              </div>
              <CardTitle className="text-2xl">
                {user?.path ? "Tu repetición está lista" : "Video en procesamiento"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user?.path ? <div className="space-y-4">
                  {videoId ? <div className="relative w-full" style={{
                paddingBottom: '56.25%'
              }}>
                      <iframe className="absolute top-0 left-0 w-full h-full rounded-lg" src={`https://www.youtube.com/embed/${videoId}`} title="Repetición del partido" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div> : <div className="text-center p-8 bg-muted rounded-lg">
                      <p className="text-muted-foreground">
                        Link de video no válido. Contactá al administrador.
                      </p>
                    </div>}
                  <div className="flex gap-4 justify-center">
                    <Button onClick={() => window.open(user?.path, '_blank')} className="bg-gradient-recording text-primary-foreground hover:opacity-90">
                      Ver en YouTube
                    </Button>
                  </div>
                </div> : <div className="text-center p-8">
                  <div className="mb-4">
                    <div className="animate-pulse bg-muted rounded-lg h-48 w-full mb-4"></div>
                  </div>
                  <p className="text-muted-foreground text-lg mb-4">
                    El video se está procesando, te informaremos cuando esté subido.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Esto puede tomar unos minutos. Podés cerrar esta página y volver más tarde.
                  </p>
                  <Button onClick={() => window.location.reload()} variant="outline" className="mt-4">
                    Actualizar página
                  </Button>
                </div>}
            </CardContent>
          </Card>
        </div>
      </div>
    </>;
};
export default Dashboard;