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
import { EditSayings } from "@/interfaces/sayings.interface";
import Loading from "@/common/loading";
import { areFieldsFilled } from "@/utils/buttonDisabled";

interface SayingDialogProps {
    isEditing: boolean;
    currentSaying: EditSayings;
    setCurrentSaying: React.Dispatch<React.SetStateAction<EditSayings>>;
    handleSaveSaying: () => void;
    isLoading: boolean;
    closeModal: () => void;
    isOpen: boolean;
}

const SayingDialog = (
    {
        handleSaveSaying,
        isLoading,
        closeModal,
        isOpen,
        currentSaying,
        setCurrentSaying,
    }: SayingDialogProps,
) => {
    const isDisabled = !areFieldsFilled(currentSaying, ['refran', 'significado']);
    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-orange-800 dark:text-yellow-600">Editar Refranes</DialogTitle>
                    <DialogDescription>
                        Actualice los detalles del refrán seleccionada.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="edit-title" >Título</Label>
                        <Input
                            id="edit-title"
                            value={currentSaying.refran}
                            onChange={(e) =>
                                setCurrentSaying({
                                    ...currentSaying,
                                    refran: e.target.value,
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
                            value={currentSaying.significado}
                            onChange={(e) =>
                                setCurrentSaying({
                                    ...currentSaying,
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
                                setCurrentSaying({
                                    ...currentSaying,
                                    imagen: e.target.files?.[0] || null,
                                })}
                            accept="image/*"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSaveSaying}
                    className="bg-orange-900 hover:bg-orange-800 cursor-pointer dark:text-white dark:bg-yellow-600"
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

export default SayingDialog;
