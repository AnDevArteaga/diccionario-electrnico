"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/utils/getImageUrl";
import { toggleExpand } from "@/utils/toggleExpand";
import Image from "next/image";

interface Word {
  palabra: string;
  formato: string;
  significado: string;
  imagen: string;
}

export default function WordsList({ words }: { words: Word[] }) {
  const [expandedId, setExpandedId] = useState<string[]>([]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-600 dark:text-white">Palabras</h2>
      <div className="flex flex-wrap gap-6">
      {words.map((word) => (
          <Card
            key={word.palabra}
            className={`w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] transition-all duration-300 ${
              expandedId.includes(word.palabra)
                ? "h-auto"
                : "h-[120px] overflow-hidden"
            }`}
          >
            <CardHeader>
              <CardTitle>{word.palabra}</CardTitle>
            </CardHeader>
            <AnimatePresence initial={false}>
              {expandedId.includes(word.palabra) && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, scale: 0.98, height: 0 }}
                  animate={{ opacity: 1, scale: 1, height: "auto" }}
                  exit={{ opacity: 0, scale: 0.98, height: 0 }}
                  transition={{ duration: 0.1, ease: "easeInOut" }}
                >
                  <CardContent>
                    <CardDescription className="mb-4">
                      {word.significado}
                    </CardDescription>
                    <div className="relative h-auto w-full flex justify-center">
                      <Image
                        src={getImageUrl(word.imagen, word.formato)}
                        alt={word.palabra}
                        className="object-cover rounded-md"
                        width={250}
                        height={250}
                        unoptimized
                        style={{ userSelect: "none", pointerEvents: "none" }}
                      />
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>

            <CardFooter className="justify-center">
              <Button
                variant="outline"
                onClick={() => toggleExpand(word.palabra, setExpandedId)}
                className="w-1/2 cursor-pointer bg-yellow-800 text-white hover:bg-yellow-900 hover:text-white"
              >
                {expandedId.includes(word.palabra) ? "Ver menos" : "Ver más"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
