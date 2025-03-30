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
import { getImageUrl } from "@/utils/getImageUrl";
import { toggleExpand } from "@/utils/toggleExpand";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface Saying {
  refran: string;
  formato: string;
  significado: string;
  imagen: string;
}

export default function SayingsList(
  { sayings }: { sayings: Saying[] },
) {
  const [expandedId, setExpandedId] = useState<string[]>([]);
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-600 mb-4">Refranes</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {sayings.map((saying) => (
          <Card
            key={saying.refran}
            className={`transition-all duration-300 ${
              expandedId.includes(saying.refran)
                ? "h-auto"
                : "h-[120px] overflow-hidden"
            }`}
          >
            <CardHeader>
              <CardTitle>{saying.refran}</CardTitle>
            </CardHeader>
            <AnimatePresence initial={false}>
              {expandedId.includes(saying.refran) && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, scale: 0.98, height: 0 }}
                  animate={{ opacity: 1, scale: 1, height: "auto" }}
                  exit={{ opacity: 0, scale: 0.98, height: 0 }}
                  transition={{ duration: 0.1, ease: "easeInOut" }}
                >
                  <CardContent>
                    <CardDescription className="mb-4">
                      {saying.significado}
                    </CardDescription>
                    <div className="relative h-auto w-full flex justify-center">

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
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
            <CardFooter className="justify-center">
              <Button
                variant="outline"
                onClick={() => toggleExpand(saying.refran, setExpandedId)}
                className="w-1/2 cursor-pointer bg-yellow-800 text-white hover:bg-yellow-900 hover:text-white"
              >
                {expandedId.includes(saying.refran)
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
