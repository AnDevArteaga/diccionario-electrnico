"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getImageUrl } from "@/utils/getImageUrl";
import { Image as ImageIcon } from "lucide-react";

interface Images {
    image: string;
    format: string;
}

export default function ImageModal({ image, format }: Images) {
    const [open, setOpen] = useState(false);

    return (
            <Dialog open={open} onOpenChange={setOpen}>
                {/* Botón para abrir el modal */}
                <DialogTrigger asChild>
                    <Button variant="default" className="cursor-pointer bg-gray-700 hover:bg-gray-800">
                        <ImageIcon className="h-4 w-4" />
                    </Button>
                </DialogTrigger>

                {/* Contenido del Modal */}
                <DialogContent className="max-w-md rounded-2xl p-6 shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">
                            Imagen Destacada
                        </DialogTitle>
                    </DialogHeader>
                    <Image
                        src={getImageUrl(image, format)}
                        alt="Imagen de muestra"
                        className="w-full rounded-lg"
                        width={100}
                        height={100}
                    />
                    <Button
                        onClick={() => setOpen(false)}
                        className="w-full mt-4 bg-orange-900 hover:bg-orange-800 dark:bg-yellow-500 dark:text-white cursor-pointer"
                    >
                        Cerrar
                    </Button>
                </DialogContent>
            </Dialog>
    );
}
