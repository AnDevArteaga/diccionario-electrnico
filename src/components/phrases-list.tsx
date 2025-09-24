"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { getImageUrl } from "@/utils/getImageUrl";
import { toggleExpand } from "@/utils/toggleExpand";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Phrase {
  frase: string;
  formato: string;
  imagen: string;
  significado: string;
}

const PHRASES_PER_PAGE = 10;

export default function PhrasesList({ phrases }: { phrases: Phrase[] }) {
  const [expandedId, setExpandedId] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrar frases
  const filteredPhrases = useMemo(() => {
    if (!searchTerm.trim()) return phrases;
    return phrases.filter(
      (p) =>
        p.frase.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.significado.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [phrases, searchTerm]);

  // Paginación
  const paginatedPhrases = useMemo(() => {
    const startIndex = (currentPage - 1) * PHRASES_PER_PAGE;
    const endIndex = startIndex + PHRASES_PER_PAGE;
    return filteredPhrases.slice(startIndex, endIndex);
  }, [filteredPhrases, currentPage]);

  const totalPages = Math.ceil(filteredPhrases.length / PHRASES_PER_PAGE);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

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
      {/* Título */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Frases Proverbiales {filteredPhrases.length > 0 && `(${filteredPhrases.length})`}
        </h2>
      </div>

      {/* Buscador */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Buscar frases o significados..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-800 dark:text-white"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSearchChange("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 h-6 w-6 p-0"
          >
            ×
          </Button>
        )}
      </div>

      {/* Resultados */}
      {filteredPhrases.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {searchTerm
            ? `No se encontraron resultados para "${searchTerm}"`
            : "No hay frases proverbiales disponibles"}
        </div>
      ) : (
        <>
          {/* Lista estilo acordeón */}
          <div className="space-y-2 mb-6">
            {paginatedPhrases.map((phrase) => (
              <div
                key={phrase.frase}
                className="border border-white dark:border-gray-700 rounded-lg bg-white dark:bg-[var(--card)] overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 transition-colors">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {phrase.frase}
                  </h3>
                  <Button
                    variant="outline"
                    onClick={() => toggleExpand(phrase.frase, setExpandedId)}
                    className="ml-4 bg-yellow-800 dark:bg-yellow-800 text-white hover:bg-yellow-900 hover:text-white border-yellow-800 hover:border-yellow-900 cursor-pointer"
                  >
                    {expandedId.includes(phrase.frase) ? "Ver menos" : "Ver más"}
                  </Button>
                </div>

                {/* Contenido expandible */}
                <AnimatePresence initial={false}>
                  {expandedId.includes(phrase.frase) && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-600">
                        <div className="pt-4">
                          <p className="text-gray-700 dark:text-gray-300 mb-4">
                            {phrase.significado}
                          </p>
                          <div className="flex justify-center">
                            <Image
                              src={getImageUrl(phrase.imagen, phrase.formato)}
                              alt={phrase.frase}
                              className="object-cover rounded-md"
                              width={250}
                              height={250}
                              unoptimized
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
                    <span key={index} className="px-2 text-gray-500">...</span>
                  ) : (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => goToPage(page as number)}
                      className={currentPage === page ? "bg-yellow-800 hover:bg-yellow-900" : ""}
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

          {/* Info de paginación */}
          <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
            Mostrando {(currentPage - 1) * PHRASES_PER_PAGE + 1} -{" "}
            {Math.min(currentPage * PHRASES_PER_PAGE, filteredPhrases.length)} de{" "}
            {filteredPhrases.length} frases
          </div>
        </>
      )}
    </div>
  );
}
