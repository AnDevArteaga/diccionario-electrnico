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
import { EditWord } from "@/interfaces/word.interface";
import { areFieldsFilled } from "@/utils/buttonDisabled";
import Loading from "@/common/loading";

interface WordDialogProps {
    isEditing: boolean;
    currentWord: EditWord;
    setCurrentWord: React.Dispatch<React.SetStateAction<EditWord>>;
    handleSaveWord: () => void;
    isLoading: boolean;
    closeModal: () => void;
    isOpen: boolean;
}

const WordDialog = (
    {
        handleSaveWord,
        isLoading,
        closeModal,
        isOpen,
        currentWord,
        setCurrentWord,
    }: WordDialogProps,
) => {
    const isDisabled = !areFieldsFilled(currentWord, ['palabra', 'significado']);
    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-orange-800">Editar Palabra</DialogTitle>
                    <DialogDescription>
                        Actualice los detalles de la palabra seleccionada.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="edit-title">Título</Label>
                        <Input
                            id="edit-title"
                            value={currentWord.palabra}
                            onChange={(e) =>
                                setCurrentWord({
                                    ...currentWord,
                                    palabra: e.target.value,
                                })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-description">
                            Descripción
                        </Label>
                        <Textarea
                            id="edit-description"
                            rows={4}
                            value={currentWord.significado}
                            onChange={(e) =>
                                setCurrentWord({
                                    ...currentWord,
                                    significado: e.target.value,
                                })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-imageUrl">
                            URL de la imagen
                        </Label>
                        <Input
                            type="file"
                            id="imageUrl"
                            onChange={(e) =>
                                setCurrentWord({
                                    ...currentWord,
                                    imagen: e.target.files?.[0] || null,
                                })}
                            accept="image/*"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSaveWord} className="bg-orange-900 hover:bg-orange-800 cursor-pointer"
                    disabled={isDisabled}
                    >
                        {isLoading
                            ? <Loading width="w-6 h-6" />
                            : "Guardar cambios"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WordDialog;
