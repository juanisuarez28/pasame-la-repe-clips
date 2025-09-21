import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Video, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuItems = [{
    label: "Mira tu Repe",
    path: "/login",
    icon: Video
  }, {
    label: "Sacar turno",
    path: "/turno",
    icon: Calendar
  }];
  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };
  return <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => navigate('/')} className="text-xl font-bold text-foreground hover:opacity-80 transition-opacity ml-20 md:text-xl">
            Pasame la{' '}
            <span className="text-primary">Repe</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 \n\nmr-20">
            {menuItems.map(item => <button key={item.path} onClick={() => handleNavigation(item.path)} className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
                {item.label}
              </button>)}
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
                  {menuItems.map(item => {
                  const Icon = item.icon;
                  return <button key={item.path} onClick={() => handleNavigation(item.path)} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors text-left w-full">
                        <Icon className="w-5 h-5 text-primary" />
                        <span className="font-medium">{item.label}</span>
                      </button>;
                })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>;
};
export default Header;