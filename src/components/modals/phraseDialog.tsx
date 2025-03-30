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
import { NewPhrase } from "@/interfaces/phrase.interface";
import Loading from "@/common/loading";
import { areFieldsFilled } from "@/utils/buttonDisabled";

interface PhraseDialogProps {
    isEditing: boolean;
    newPhrase: NewPhrase;
    setNewPhrase: React.Dispatch<React.SetStateAction<NewPhrase>>;
    handleSavePhrase: () => void;
    handleAddPhrase: () => void;
    isLoading: boolean;
    closeModal: () => void;
    isOpen: boolean;
    openModal: () => void;
}

const PhraseDialog = (
    { isEditing, newPhrase, setNewPhrase, handleSavePhrase, handleAddPhrase, isLoading, closeModal, isOpen, openModal }:
    PhraseDialogProps,
) => {
    const isDisabled = !areFieldsFilled(newPhrase, ['frase', 'significado']);
    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
                <Button onClick={() => { openModal(); 
                    handleAddPhrase()}} className="cursor-pointer bg-yellow-800 hover:bg-yellow-900">
                    <Plus className="mr-2 h-4 w-4" />
                    Añadir Frase proverbial
                </Button>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-orange-800">
                        {isEditing ? "Editar Frase proverbial" : "Añadir Nueva Frase proverbial"}
                    </DialogTitle>
                    <DialogDescription>
                        Complete el formulario para{" "}
                        {isEditing ? "actualizar la" : "añadir una nueva"}{" "}
                        Frase proverbial al diccionario.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Frase proverbial</Label>
                        <Input
                            id="title"
                            value={newPhrase.frase}
                            onChange={(e) =>
                                setNewPhrase({
                                    ...newPhrase,
                                    frase: e.target.value,
                                })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Significado</Label>
                        <Textarea
                            id="description"
                            rows={4}
                            value={newPhrase.significado}
                            onChange={(e) =>
                                setNewPhrase({
                                    ...newPhrase,
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
                                setNewPhrase({
                                    ...newPhrase,
                                    imagen: e.target.files?.[0] || null,
                                })}
                            accept="image/*"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSavePhrase}
                        className="bg-orange-900 hover:bg-orange-800 cursor-pointer"
                        disabled={isDisabled}
                    >
                        {isLoading ? <Loading width="w-6 h-6" /> : "Guardar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PhraseDialog;
