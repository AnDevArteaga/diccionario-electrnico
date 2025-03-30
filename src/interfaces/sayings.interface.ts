interface BaseSayings {
    refran: string;
    significado: string;
  }
  
  export interface Sayings extends BaseSayings {
    id: number;
    imagen: File | string | null;
    formato: string;
  }
  
  export interface NewSayings extends BaseSayings {
    imagen: File | string | null;
  }
  
  export interface EditSayings extends NewSayings {
    id: number;
  }
  