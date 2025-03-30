"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getImageUrl } from "@/utils/getImageUrl";
import { toggleExpand } from "@/utils/toggleExpand";
import { AnimatePresence, motion } from "framer-motion";

interface Phrases {
  frase: string;
  formato: string;
  imagen: string;
  significado: string;
}

export default function PhrasesList(
  { phrases }: { phrases: Phrases[] },
) {
  const [expandedId, setExpandedId] = useState<string[]>([]);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-600 mb-4">Frases Proverbiales</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {phrases.map((phrase) => (
          <Card
            key={phrase.frase}
            className={`transition-all duration-300 ${
              expandedId.includes(phrase.frase)
                ? "h-auto"
                : "h-[120px] overflow-hidden"
            }`}
          >
            <CardHeader>
              <CardTitle>{phrase.frase}</CardTitle>
            </CardHeader>
            <AnimatePresence initial={false}>
              {expandedId.includes(phrase.frase) && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, scale: 0.98, height: 0 }}
                  animate={{ opacity: 1, scale: 1, height: "auto" }}
                  exit={{ opacity: 0, scale: 0.98, height: 0 }}
                  transition={{ duration: 0.1, ease: "easeInOut" }}
                >
                  <CardContent>
                    <CardDescription className="mb-4">
                      {phrase.significado}
                    </CardDescription>
                    <div className="relative h-auto w-full flex justify-center">

                    <Image
                      src={getImageUrl(phrase.imagen, phrase.formato)}
                      alt={phrase.frase}
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
                onClick={() => toggleExpand(phrase.frase, setExpandedId)}
                className="w-1/2 cursor-pointer bg-yellow-800 text-white hover:bg-yellow-900 hover:text-white"
              >
                {expandedId.includes(phrase.frase)
                  ? "Ver menos"
                  : "Ver más"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
