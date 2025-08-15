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

import { addPhrase, editPhrase, getPhrase, deletePhrase } from "@/utils/phrasesApi";

import { EditPhrase, NewPhrase, Phrase } from "@/interfaces/phrase.interface";

import ImageModal from "@/components/modals/image-admin";
import PhraseDialog from "./modals/phraseDialog";
import EditPhraseDialog from "./modals/editPhraseDialog";
import useModal from "@/app/hooks/useModal";
import Loading from "@/common/loading";

export default function AdminWords() {
  const [phrase, setPhrase] = useState<Phrase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [currentPhrase, setCurrentPhrase] = useState<EditPhrase>({
    id: 0,
    frase: "",
    significado: "",
    imagen: null,
  });
  const [newPhrase, setNewPhrase] = useState<NewPhrase>({
    frase: "",
    significado: "",
    imagen: null,
  });

  const { isOpen, openModal, closeModal } = useModal();

  const getPhraseData = async () => {
    const data = await getPhrase();
    setPhrase(data);
    setIsLoading(false);
    setNewPhrase({
      frase: "",
      significado: "",
      imagen: null,
    });
    closeModal();
  };

  const newPhraseData = async () => {
    await addPhrase(newPhrase);
    getPhraseData();
  };

  const editPhraseData = async () => {
    await editPhrase(currentPhrase);
    getPhraseData();
  };

  useEffect(() => {
    getPhraseData();
  }, []);

  const handleAddPhrase = () => {
    setIsEditing(false);
    setNewPhrase({
      frase: "",
      significado: "",
      imagen: null,
    });
  };

  const handleEditInfo = (phrase: EditPhrase) => {
    setIsEditing(true);
    setCurrentPhrase(phrase);
  };

  const handleDeletePhrase = async (id: number) => {
    setIsLoading(true);
    await deletePhrase(id);
    getPhraseData();
  };

  const handleSavePhrase = () => {
    setIsLoading(true);
    if (isEditing) {
      console.log("edit", currentPhrase);
      editPhraseData();
      
    } else {
      newPhraseData();
      
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-orange-800 dark:text-yellow-600">Gestión de Frases proverbiales</h2>
        <PhraseDialog
          isEditing={isEditing}
          newPhrase={newPhrase}
          setNewPhrase={setNewPhrase}
          handleAddPhrase={handleAddPhrase}
          handleSavePhrase={handleSavePhrase}
          isLoading={isLoading}
          closeModal={closeModal}
          isOpen={isOpen()}
          openModal={openModal}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-gray-600">Lista de Frases proverbiales</CardTitle>
          <CardDescription>
            Administre las Frases Proverbiales del diccionario. Puede editar o eliminar
            frases existentes.
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
                : phrase.length > 0
                ? (
                  phrase.map((phras) => (
                    <TableRow key={phras.id}>
                      <TableCell>{phras.id}</TableCell>
                      <TableCell className="font-medium">
                        {phras.frase}
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {phras.significado}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => {
                              openModal(`edit-${phras.id}`);
                              handleEditInfo(phras);
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
                                  palabra "${phras.frase}" y no se puede
                                  deshacer`}.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeletePhrase(phras.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white cursor-pointer"
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          <ImageModal
                            image={typeof phras.imagen === "string"
                              ? phras.imagen
                              : phras.imagen
                              ? URL.createObjectURL(phras.imagen)
                              : ""}
                            format={phras.formato}
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
            <EditPhraseDialog
              handleSavePhrase={handleSavePhrase}
              isLoading={isLoading}
              closeModal={closeModal}
              isOpen={isOpen(`edit-${currentPhrase?.id}`)}
              currentPhrase={currentPhrase}
              setCurrentPhrase={setCurrentPhrase}
              isEditing={isEditing}
            />
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
 