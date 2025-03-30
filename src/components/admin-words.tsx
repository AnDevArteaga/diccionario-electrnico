"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from "lucide-react";

import { addWord, editWord, getWords, deleteWord } from "@/utils/wordsApi";

import { EditWord, NewWord, Word } from "@/interfaces/word.interface";

import ImageModal from "@/components/modals/image-admin";
import WordDialog from "./modals/wordDialog";
import EditWordDialog from "./modals/editWordDialog";
import useModal from "@/app/hooks/useModal";
import Loading from "@/common/loading";

export default function AdminWords() {
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [currentWord, setCurrentWord] = useState<EditWord>({
    id: 0,
    palabra: "",
    significado: "",
    imagen: null,
  });
  const [newWord, setNewWord] = useState<NewWord>({
    palabra: "",
    significado: "",
    imagen: null,
  });

  const { isOpen, openModal, closeModal } = useModal();

  const getWordsData = async () => {
    const data = await getWords();
    setWords(data);
    setIsLoading(false);
    setNewWord({
      palabra: "",
      significado: "",
      imagen: null,
    });
    closeModal();
  };

  const newWordData = async () => {
    await addWord(newWord);
    getWordsData();
  };

  const editWordData = async () => {
    await editWord(currentWord);
    getWordsData();
  };

  useEffect(() => {
    getWordsData();
  }, []);

  const handleAddWord = () => {
    setIsEditing(false);
    setNewWord({
      palabra: "",
      significado: "",
      imagen: null,
    });
  };

  const handleEditWord = (word: EditWord) => {
    setIsEditing(true);
    setCurrentWord(word);
  };

  const handleDeleteWord = async (id: number) => {
    setIsLoading(true);
    await deleteWord(id);
    getWordsData();
  };

  const handleSaveWord = () => {
    setIsLoading(true);
    if (isEditing) {
      console.log("edit", currentWord);
      editWordData();
    } else {
      newWordData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-orange-800">Gestión de Palabras</h2>
        <WordDialog
          isEditing={isEditing}
          newWord={newWord}
          setNewWord={setNewWord}
          handleAddWord={handleAddWord}
          handleSaveWord={handleSaveWord}
          isLoading={isLoading}
          closeModal={closeModal}
          isOpen={isOpen()}
          openModal={openModal}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-gray-600">Lista de Palabras</CardTitle>
          <CardDescription>
            Administre las palabras del diccionario. Puede editar o eliminar
            palabras existentes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead className="hidden md:table-cell">
                  Descripción
                </TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      <Loading width="w-16 h-16" />
                    </TableCell>
                  </TableRow>
                )
                : words.length > 0
                ? (
                  words.map((word) => (
                    <TableRow key={word.id}>
                      <TableCell>{word.id}</TableCell>
                      <TableCell className="font-medium">
                        {word.palabra}
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {word.significado}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => {
                              openModal(`edit-${word.id}`);
                              handleEditWord(word);
                            }}
                            className="cursor-pointer bg-yellow-800 hover:bg-yellow-900"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-destructive cursor-pointer hover:bg-destructive/90 hover:text-white"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  ¿Está seguro?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                {`Esta acción eliminará permanentemente la
                                  palabra "${word.palabra}" y no se puede
                                  deshacer`}.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteWord(word.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white cursor-pointer"
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          <ImageModal
                            image={typeof word.imagen === "string"
                              ? word.imagen
                              : word.imagen
                              ? URL.createObjectURL(word.imagen)
                              : ""}
                            format={word.formato}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )
                : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-4 text-gray-500"
                    >
                      No hay palabras disponibles.
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
            <EditWordDialog
              handleSaveWord={handleSaveWord}
              isLoading={isLoading}
              closeModal={closeModal}
              isOpen={isOpen(`edit-${currentWord?.id}`)}
              currentWord={currentWord}
              setCurrentWord={setCurrentWord}
              isEditing={isEditing}
            />
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
