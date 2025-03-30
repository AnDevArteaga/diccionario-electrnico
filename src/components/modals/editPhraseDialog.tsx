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
import { EditPhrase } from "@/interfaces/phrase.interface";
import Loading from "@/common/loading";
import { areFieldsFilled } from "@/utils/buttonDisabled";

interface PhraseDialogProps {
    isEditing: boolean;
    currentPhrase: EditPhrase;
    setCurrentPhrase: React.Dispatch<React.SetStateAction<EditPhrase>>;
    handleSavePhrase: () => void;
    isLoading: boolean;
    closeModal: () => void;
    isOpen: boolean;
}

const PhraseDialog = (
    {
        handleSavePhrase,
        isLoading,
        closeModal,
        isOpen,
        currentPhrase,
        setCurrentPhrase,
    }: PhraseDialogProps,
) => {
    const isDisabled = !areFieldsFilled(currentPhrase, ['frase', 'significado']);
    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-orange-800">Editar Frase</DialogTitle>
                    <DialogDescription>
                        Actualice los detalles de la Frase seleccionada.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="edit-title">Título</Label>
                        <Input
                            id="edit-title"
                            value={currentPhrase.frase}
                            onChange={(e) =>
                                setCurrentPhrase({
                                    ...currentPhrase,
                                    frase: e.target.value,
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
                            value={currentPhrase.significado}
                            onChange={(e) =>
                                setCurrentPhrase({
                                    ...currentPhrase,
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
                                setCurrentPhrase({
                                    ...currentPhrase,
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
                        {isLoading
                            ? <Loading width="w-6 h-6" />
                            : "Guardar cambios"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PhraseDialog;
