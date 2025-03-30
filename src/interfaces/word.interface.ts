interface BaseWord {
    palabra: string;
    significado: string;
  }
  
  export interface Word extends BaseWord {
    id: number;
    imagen: File | string | null;
    formato: string;
  }
  
  export interface NewWord extends BaseWord {
    imagen: File | string | null;
  }
  
  export interface EditWord extends NewWord {
    id: number;
  }
  