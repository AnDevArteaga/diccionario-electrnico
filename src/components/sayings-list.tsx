"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getImageUrl } from "@/utils/getImageUrl";
import { toggleExpand } from "@/utils/toggleExpand";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Saying {
  refran: string;
  formato: string;
  significado: string;
  imagen: string;
}

const SAYINGS_PER_PAGE = 10;

export default function SayingsList({ sayings }: { sayings: Saying[] }) {
  const [expandedId, setExpandedId] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrar refranes por búsqueda
  const filteredSayings = useMemo(() => {
    if (!searchTerm.trim()) return sayings;
    return sayings.filter(
      (saying) =>
        saying.refran.toLowerCase().includes(searchTerm.toLowerCase()) ||
        saying.significado.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sayings, searchTerm]);

  // Calcular refranes de la página actual
  const paginatedSayings = useMemo(() => {
    const startIndex = (currentPage - 1) * SAYINGS_PER_PAGE;
    const endIndex = startIndex + SAYINGS_PER_PAGE;
    return filteredSayings.slice(startIndex, endIndex);
  }, [filteredSayings, currentPage]);

  // Calcular total de páginas
  const totalPages = Math.ceil(filteredSayings.length / SAYINGS_PER_PAGE);

  // Resetear página cuando cambia búsqueda
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Navegación entre páginas
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Generar números de página
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Refranes {filteredSayings.length > 0 && `(${filteredSayings.length})`}
        </h2>
      </div>

      {/* Buscador */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Buscar refranes o significados..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-800 dark:text-white"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSearchChange("")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 h-6 w-6 p-0"
          >
            ×
          </Button>
        )}
      </div>

      {/* Resultados */}
      {filteredSayings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm
              ? `No se encontraron resultados para "${searchTerm}"`
              : "No hay refranes disponibles"}
          </p>
        </div>
      ) : (
        <>
          {/* Lista de refranes */}
          <div className="space-y-2 mb-6">
            {paginatedSayings.map((saying) => (
              <div
                key={saying.refran}
                className="border border-white dark:border-gray-700 rounded-lg bg-white dark:bg-[var(--card)] overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 transition-colors">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {saying.refran}
                    </h3>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => toggleExpand(saying.refran, setExpandedId)}
                    className="ml-4 bg-yellow-800 dark:bg-yellow-800 text-white hover:bg-yellow-900 hover:text-white border-yellow-800 hover:border-yellow-900 cursor-pointer"
                  >
                    {expandedId.includes(saying.refran)
                      ? "Ver menos"
                      : "Ver más"}
                  </Button>
                </div>

                {/* Contenido expandible */}
                <AnimatePresence initial={false}>
                  {expandedId.includes(saying.refran) && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-600">
                        <div className="pt-4">
                          <p className="text-gray-700 dark:text-gray-300 mb-4">
                            {saying.significado}
                          </p>
                          <div className="flex justify-center">
                            <Image
                              src={getImageUrl(saying.imagen, saying.formato)}
                              alt={saying.refran}
                              className="object-cover rounded-md"
                              width={250}
                              height={250}
                              unoptimized
                              style={{ userSelect: "none", pointerEvents: "none" }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>

              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) =>
                  page === "..." ? (
                    <span key={index} className="px-2 text-gray-500">
                      ...
                    </span>
                  ) : (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => goToPage(page as number)}
                      className={
                        currentPage === page
                          ? "bg-yellow-800 hover:bg-yellow-900"
                          : ""
                      }
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1"
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Info paginación */}
          <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
            Mostrando{" "}
            {(currentPage - 1) * SAYINGS_PER_PAGE + 1} -{" "}
            {Math.min(currentPage * SAYINGS_PER_PAGE, filteredSayings.length)} de{" "}
            {filteredSayings.length} refranes
          </div>
        </>
      )}
    </div>
  );
}
