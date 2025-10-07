import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Video, Calendar, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import logoHeader from "@/assets/logo-header.png";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {
    isAuthenticated,
    logout
  } = useAuth();
  const {
    toast
  } = useToast();
  const handleVideoNavigation = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
    setIsOpen(false);
  };
  const handleLogout = () => {
    logout();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente."
    });
    navigate('/');
    setIsOpen(false);
  };
  const menuItems = [{
    label: "Mira tu Repe",
    action: handleVideoNavigation,
    icon: Video
  }, {
    label: "Sacar turno",
    path: "/turno",
    icon: Calendar
  }];
  const handleNavigation = (path?: string, action?: () => void) => {
    if (action) {
      action();
    } else if (path) {
      navigate(path);
      setIsOpen(false);
    }
  };
  return <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => navigate('/')} className="hover:opacity-80 transition-opacity ml-2 md:ml-20">
            <img src={logoHeader} alt="Pasame la Repe" className="h-6 md:h-10 w-auto" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 mr-20">
            {menuItems.map((item, index) => <button key={item.path || index} onClick={() => handleNavigation(item.path, item.action)} className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
                {item.label}
              </button>)}
            {isAuthenticated && <button onClick={handleLogout} className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
                Cerrar sesión
              </button>}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return <button key={item.path || index} onClick={() => handleNavigation(item.path, item.action)} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors text-left w-full">
                        <Icon className="w-5 h-5 text-primary" />
                        <span className="font-medium">{item.label}</span>
                      </button>;
                })}
                  {isAuthenticated && <button onClick={handleLogout} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors text-left w-full">
                      <LogOut className="w-5 h-5 text-primary" />
                      <span className="font-medium">Cerrar sesión</span>
                    </button>}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>;
};
export default Header;