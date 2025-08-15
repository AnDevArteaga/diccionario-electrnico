"use client";

import { usePathname, useRouter } from "next/navigation";
import { Book, Home, LogOut, Menu, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export default function MainNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    const session = localStorage.getItem("session");
    setIsAuthenticated(!!session);
  }, [pathname]); // Re-verificar cuando cambia la ruta

  const isAdminRoute = pathname?.startsWith("/admin") || pathname === "/login";

  const handleSettings = () => {
    if (isAuthenticated) {
      router.push("/admin");
    } else {
      router.push("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("session");
    setIsAuthenticated(false);
    router.push("/");
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Book className="h-6 w-6 text-yellow-900 dark:text-yellow-500" />
          <span className="text-xl font-bold text-yellow-900 dark:text-yellow-500">
            {isAdminRoute ? "Administrador" : "CórdobaDict"}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full cursor-pointer"
              >
                <User className="h-5 w-5 text-yellow-900 dark:text-yellow-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isAuthenticated && (
                <>
                  <div className="px-2 py-1.5 text-sm font-medium">
                  Administrador
                  </div>
                  <DropdownMenuSeparator />
                </>
              )}

              <DropdownMenuItem onClick={handleHome} className="cursor-pointer">
                <Home className="mr-2 h-4 w-4 dark:text-yellow-500" />
                <span>Inicio</span>
              </DropdownMenuItem>

              {!pathname?.startsWith("/admin") && (
              <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4 dark:text-yellow-500" />
                <span>Configuración</span>
              </DropdownMenuItem>
              )}

              {isAuthenticated && isAdminRoute && (
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4 dark:text-yellow-500" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
