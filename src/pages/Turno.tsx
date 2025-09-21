import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, ArrowLeft, Phone, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Turno = () => {
  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    lugar: "",
    telefono: "",
    equipo: "",
    comentarios: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      if (formData.fecha && formData.hora && formData.lugar && formData.telefono) {
        toast({
          title: "¡Turno solicitado!",
          description: "Para enviar automáticamente por WhatsApp, conectá tu proyecto a Supabase.",
        });
        // Here would be the WhatsApp integration once Supabase is connected
        console.log("Datos del turno:", formData);
      } else {
        toast({
          title: "Error",
          description: "Por favor completá todos los campos obligatorios.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4">
      <div className="container mx-auto max-w-2xl py-8">
        <Card className="bg-card/95 backdrop-blur-sm shadow-card">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-recording rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl">Sacar turno</CardTitle>
            <CardDescription>
              Reservá tu fecha y horario para grabar tu partido
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fecha">Fecha del partido *</Label>
                  <Input
                    id="fecha"
                    name="fecha"
                    type="date"
                    value={formData.fecha}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hora">Horario *</Label>
                  <Input
                    id="hora"
                    name="hora"
                    type="time"
                    value={formData.hora}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lugar" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Lugar del partido *
                </Label>
                <Input
                  id="lugar"
                  name="lugar"
                  type="text"
                  value={formData.lugar}
                  onChange={handleInputChange}
                  placeholder="Ej: Cancha Municipal, Parque Norte, etc."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Número de teléfono *
                </Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="Ej: +54 9 11 1234-5678"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="equipo" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Nombre del equipo (opcional)
                </Label>
                <Input
                  id="equipo"
                  name="equipo"
                  type="text"
                  value={formData.equipo}
                  onChange={handleInputChange}
                  placeholder="Ej: Los Tiburones FC"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comentarios">Comentarios adicionales</Label>
                <Textarea
                  id="comentarios"
                  name="comentarios"
                  value={formData.comentarios}
                  onChange={handleInputChange}
                  placeholder="Cualquier información adicional que consideres importante..."
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Solicitar turno"}
              </Button>
            </form>

            <Button
              variant="ghost"
              className="w-full mt-4"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Turno;