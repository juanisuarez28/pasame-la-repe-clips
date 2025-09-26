import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Video, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import logoImage from "@/assets/logo-new.png";
interface Video {
  id: number;
  titulo: string;
  path: string;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user?.id) {
      fetchUserVideos();
    }
  }, [user?.id]);

  const fetchUserVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('plr-videos')
        .select('*')
        .eq('id_usuario', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching videos:', error);
        return;
      }

      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  if (!user) {
    return null; // Loading or redirecting
  }
  return <>
      <Header />
      <div className="min-h-screen bg-gradient-hero pt-20 md:pt-20 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 mt-8 md:mt-0 flex items-center justify-center">
            <img src={logoImage} alt="Logo" className="w-12 h-12 mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-primary-foreground mb-2 font-bebas">
                ¡Hola {user?.nombre}!
              </h1>
              <p className="text-primary-foreground/80">
                Acá podés ver {videos.length > 1 ? 'las' : 'la'} <span className="text-repe-color font-bold font-bebas">REPE{videos.length > 1 ? 'S' : ''}</span> {videos.length > 1 ? 'de los partidos' : 'del partido'}
              </p>
            </div>
          </div>

          <Card className="bg-card/95 backdrop-blur-sm shadow-card">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-recording rounded-full flex items-center justify-center mb-4">
                {videos.length > 0 ? <Video className="w-8 h-8 text-primary-foreground" /> : <Clock className="w-8 h-8 text-primary-foreground" />}
              </div>
              <CardTitle className="text-2xl">
                {loading ? "Cargando videos..." : videos.length > 0 ? (
                  <>Tus <span className="text-repe-color font-bold font-bebas">REPE{videos.length > 1 ? 'S' : ''}</span> {videos.length > 1 ? 'están listas' : 'está lista'}</>
                ) : "No hay videos disponibles"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center p-8">
                  <div className="mb-4">
                    <div className="animate-pulse bg-muted rounded-lg h-48 w-full mb-4"></div>
                  </div>
                  <p className="text-muted-foreground">Cargando tus videos...</p>
                </div>
              ) : videos.length > 0 ? (
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {videos.map((video) => {
                    const videoId = getYouTubeVideoId(video.path);
                    return (
                      <AccordionItem key={video.id} value={`video-${video.id}`} className="border border-border rounded-lg">
                        <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 rounded-t-lg">
                          <div className="flex items-center gap-3">
                            <Video className="w-5 h-5 text-recording-red" />
                            <span className="font-medium">{video.titulo || `Video ${video.id}`}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          {videoId ? (
                            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                              <iframe 
                                className="absolute top-0 left-0 w-full h-full rounded-lg" 
                                src={`https://www.youtube.com/embed/${videoId}`} 
                                title={video.titulo || "REPE del partido"} 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen 
                              />
                            </div>
                          ) : (
                            <div className="text-center p-8 bg-muted rounded-lg">
                              <p className="text-muted-foreground">
                                Link de video no válido. Contactá al administrador.
                              </p>
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              ) : (
                <div className="text-center p-8">
                  <div className="mb-4">
                    <div className="animate-pulse bg-muted rounded-lg h-48 w-full mb-4"></div>
                  </div>
                  <p className="text-muted-foreground text-lg mb-4">
                    Aún no tenés videos asignados.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Cuando se procesen tus videos, aparecerán acá automáticamente.
                  </p>
                  <Button onClick={() => window.location.reload()} variant="outline" className="mt-4">
                    Actualizar página
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>;
};
export default Dashboard;