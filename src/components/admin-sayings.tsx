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

import { addSayings, editSayings, getSayings, deleteSayings } from "@/utils/sayingsApi";

import { EditSayings, NewSayings, Sayings } from "@/interfaces/sayings.interface";

import ImageModal from "@/components/modals/image-admin";
import SayingDialog from "./modals/sayingDialog";
import EditSayingDialog from "./modals/editSayingDialog";
import useModal from "@/app/hooks/useModal";
import Loading from "@/common/loading";

export default function AdminWords() {
  const [sayings, setSayings] = useState<Sayings[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [currentSaying, setCurrentSaying] = useState<EditSayings>({
    id: 0,
    refran: "",
    significado: "",
    imagen: null,
  });
  const [NewSaying, setNewSaying] = useState<NewSayings>({
    refran: "",
    significado: "",
    imagen: null,
  });

  const { isOpen, openModal, closeModal } = useModal();

  const getSayingsData = async () => {
    const data = await getSayings();
    setSayings(data);
    setIsLoading(false);
    setNewSaying({
      refran: "",
      significado: "",
      imagen: null,
    });
    closeModal();
  };

  const newSayingData = async () => {
    await addSayings(NewSaying);
    getSayingsData();
  };

  const editSayingData = async () => {
    await editSayings(currentSaying);
    getSayingsData();
  };

  useEffect(() => {
    getSayingsData();
  }, []);

  const handleAddSaying = () => {
    setIsEditing(false);
    setNewSaying({
      refran: "",
      significado: "",
      imagen: null,
    });
  };

  const handleEditWord = (saying: EditSayings) => {
    setIsEditing(true);
    setCurrentSaying(saying);
  };

  const handleDeleteSaying = async (id: number) => {
    setIsLoading(true);
    await deleteSayings(id);
    getSayingsData();
  };

  const handleSaveSaying = () => {
    setIsLoading(true);
    if (isEditing) {
      console.log("edit", currentSaying);
      editSayingData();
    } else {
      newSayingData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-orange-800">Gestión de Refranes</h2>
        <SayingDialog
          isEditing={isEditing}
          newSaying={NewSaying}
          setNewSaying={setNewSaying}
          handleAddSaying={handleAddSaying}
          handleSaveSaying={handleSaveSaying}
          isLoading={isLoading}
          closeModal={closeModal}
          isOpen={isOpen()}
          openModal={openModal}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-gray-600">Lista de Refranes</CardTitle>
          <CardDescription>
            Administre los Refranes del diccionario. Puede editar o eliminar
            Refranes existentes.
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
                : sayings.length > 0
                ? (
                  sayings.map((saying) => (
                    <TableRow key={saying.id}>
                      <TableCell>{saying.id}</TableCell>
                      <TableCell className="font-medium">
                        {saying.refran}
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {saying.significado}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => {
                              openModal(`edit-${saying.id}`);
                              handleEditWord(saying);
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
                                  palabra "${saying.refran}" y no se puede
                                  deshacer`}.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel  className="cursor-pointer">Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteSaying(saying.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white cursor-pointer"
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          <ImageModal
                            image={typeof saying.imagen === "string"
                              ? saying.imagen
                              : saying.imagen
                              ? URL.createObjectURL(saying.imagen)
                              : ""}
                            format={saying.formato}
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
            <EditSayingDialog
              handleSaveSaying={handleSaveSaying}
              isLoading={isLoading}
              closeModal={closeModal}
              isOpen={isOpen(`edit-${currentSaying?.id}`)}
              currentSaying={currentSaying}
              setCurrentSaying={setCurrentSaying}
              isEditing={isEditing}
            />
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
