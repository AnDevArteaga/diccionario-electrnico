interface BasePhrase {
    frase: string;
    significado: string;
}

export interface Phrase extends BasePhrase {
    id: number;
    imagen: File | string | null;
    formato: string;
}

export interface NewPhrase extends BasePhrase {
    imagen: File | string | null;
}

export interface EditPhrase extends NewPhrase {
    id: number;
}
