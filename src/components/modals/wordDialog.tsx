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
import { NewWord } from "@/interfaces/word.interface";
import Loading from "@/common/loading";
import { areFieldsFilled } from "@/utils/buttonDisabled";

interface WordDialogProps {
    isEditing: boolean;
    newWord: NewWord;
    setNewWord: React.Dispatch<React.SetStateAction<NewWord>>;
    handleSaveWord: () => void;
    handleAddWord: () => void;
    isLoading: boolean;
    closeModal: () => void;
    isOpen: boolean;
    openModal: () => void;
}

const WordDialog = (
    { isEditing, newWord, setNewWord, handleSaveWord, handleAddWord, isLoading, closeModal, isOpen, openModal }:
        WordDialogProps,
) => {
    const isDisabled = !areFieldsFilled(newWord, ['palabra', 'significado']);
    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
                <Button onClick={() => { openModal(); 
                    handleAddWord()}} className="cursor-pointer bg-yellow-800 dark:text-white hover:bg-yellow-900">
                    <Plus className="mr-2 h-4 w-4" />
                    Añadir Palabra
                </Button>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-orange-800 dark:text-yellow-600">
                        {isEditing ? "Editar Palabra" : "Añadir Nueva Palabra"}
                    </DialogTitle>
                    <DialogDescription>
                        Complete el formulario para{" "}
                        {isEditing ? "actualizar la" : "añadir una nueva"}{" "}
                        palabra al diccionario.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Palabra</Label>
                        <Input
                            id="title"
                            value={newWord.palabra}
                            onChange={(e) =>
                                setNewWord({
                                    ...newWord,
                                    palabra: e.target.value,
                                })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Significado</Label>
                        <Textarea
                            id="description"
                            rows={4}
                            value={newWord.significado}
                            onChange={(e) =>
                                setNewWord({
                                    ...newWord,
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
                                setNewWord({
                                    ...newWord,
                                    imagen: e.target.files?.[0] || null,
                                })}
                            accept="image/*"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSaveWord} className="bg-orange-900 hover:bg-orange-800 cursor-pointer dark:bg-yellow-600  dark:text-white"
                    disabled={isDisabled}
                    >
                        {isLoading ? <Loading width="w-6 h-6" /> : "Guardar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WordDialog;
