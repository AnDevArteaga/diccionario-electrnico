"use client"; // Componente cliente
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WordsList from "@/components/word-list";
import SayingsList from "@/components/sayings-list";
import PhrasesList from "@/components/phrases-list";

import { getWords } from "@/utils/wordsApi";
import { getSayings } from "@/utils/sayingsApi";
import { getPhrase } from "@/utils/phrasesApi";

export default function Home() {
  const [words, setWords] = useState([]);
  const [sayings, setSayings] = useState([]);
  const [phrases, setPhrases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [wordsData, sayingsData, phrasesData] = await Promise.all([
          getWords(),
          getSayings(),
          getPhrase(),
        ]);

        setWords(wordsData);
        setSayings(sayingsData);
        setPhrases(phrasesData);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <main className="container mx-auto px-4 py-6 flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-yellow-900 dark:text-yellow-500">
        Diccionario de Córdoba
      </h1>

      <Tabs defaultValue="words" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-100 dark:bg-[var(--card)] dark:text-gray-500 rounded-lg">
          <TabsTrigger
            value="words"
            className="cursor-pointer text-gray-500 data-[state=active]:text-orange-800 hover:text-orange-800 transition-all rounded-md"
          >
            Palabras
          </TabsTrigger>
          <TabsTrigger
            value="sentences"
            className="cursor-pointer text-gray-500 data-[state=active]:text-orange-800 hover:text-orange-800 transition-all rounded-md"
          >
            Refranes
          </TabsTrigger>
          <TabsTrigger
            value="info"
            className="cursor-pointer text-gray-500 data-[state=active]:text-orange-800 hover:text-orange-800 transition-all rounded-md"
          >
            Frases Proverbiales
          </TabsTrigger>
        </TabsList>

        <TabsContent value="words">
          <WordsList words={words} />
        </TabsContent>
        <TabsContent value="sentences">
          <SayingsList sayings={sayings} />
        </TabsContent>
        <TabsContent value="info">
          <PhrasesList phrases={phrases} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
