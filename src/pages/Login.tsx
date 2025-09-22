import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Video, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!username || !password) {
        toast({
          title: "Error",
          description: "Por favor completá todos los campos.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Query the plr-usuarios table using the database function
      const { data, error } = await supabase.rpc('authenticate_user', {
        user_name: username,
        user_password: password
      });

      if (error || !data || data.length === 0) {
        toast({
          title: "Error",
          description: "Usuario o contraseña incorrectos.",
          variant: "destructive",
        });
      } else {
        // Use auth context to store user data
        login(data[0]);
        toast({
          title: "¡Bienvenido!",
          description: `Hola ${data[0].nombre}, accediendo a tu video...`,
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al iniciar sesión.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 pt-20">
      <Card className="w-full max-w-md bg-card/95 backdrop-blur-sm shadow-card">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-recording rounded-full flex items-center justify-center mb-4">
            <Video className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Mirá tu repe</CardTitle>
          <CardDescription>
            Ingresá tu usuario y contraseña para ver tu video
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tu usuario"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contraseña"
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Ingresando..." : "Ver mi video"}
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
    </>
  );
};

export default Login;