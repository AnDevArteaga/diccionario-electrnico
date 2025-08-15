import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { NewSayings } from "@/interfaces/sayings.interface";
import Loading from "@/common/loading";
import { areFieldsFilled } from "@/utils/buttonDisabled";

interface SayingDialogProps {
    isEditing: boolean;
    newSaying: NewSayings;
    setNewSaying: React.Dispatch<React.SetStateAction<NewSayings>>;
    handleSaveSaying: () => void;
    handleAddSaying: () => void;
    isLoading: boolean;
    closeModal: () => void;
    isOpen: boolean;
    openModal: () => void;
}

const SayingDialog = (
    { isEditing, newSaying, setNewSaying, handleSaveSaying, handleAddSaying, isLoading, closeModal, isOpen, openModal }:
    SayingDialogProps,
) => {
    const isDisabled = !areFieldsFilled(newSaying, ['refran', 'significado']);
    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
                <Button onClick={() => { openModal(); 
                    handleAddSaying()}} className="cursor-pointer bg-yellow-800 hover:bg-yellow-900 dark:text-white dark:bg-yellow-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Añadir Refrán
                </Button>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-orange-800 dark:text-yellow-600">
                        {isEditing ? "Editar Refrán" : "Añadir Nuevo Refrán"}	
                    </DialogTitle>
                    <DialogDescription>
                        Complete el formulario para{" "}
                        {isEditing ? "actualizar el" : "añadir un nuevo"}{" "}
                        refrán al diccionario.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Refrán</Label>
                        <Input
                            id="title"
                            value={newSaying.refran}
                            onChange={(e) =>
                                setNewSaying({
                                    ...newSaying,
                                    refran: e.target.value,
                                })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Significado</Label>
                        <Textarea
                            id="description"
                            rows={4}
                            value={newSaying.significado}
                            onChange={(e) =>
                                setNewSaying({
                                    ...newSaying,
                                    significado: e.target.value,
                                })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="imageUrl">Imagen</Label>
                        <Input
                            type="file"
                            id="imageUrl"
                            onChange={(e) =>
                                setNewSaying({
                                    ...newSaying,
                                    imagen: e.target.files?.[0] || null,
                                })}
                            accept="image/*"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSaveSaying}
                    className="bg-orange-900 hover:bg-orange-800 dark:bg-yellow-600  dark:text-white cursor-pointer"
                    disabled={isDisabled}
                    >
                        {isLoading ? <Loading width="w-6 h-6" /> : "Guardar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SayingDialog;
