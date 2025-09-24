import axios from "axios";
import { EditPhrase, NewPhrase } from "@/interfaces/phrase.interface";

export async function getPhrase() {
    try {
        const response = await axios.get(
            "https://edutlasdeveloper.pythonanywhere.com/apie/frases",
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function addPhrase(phrase: NewPhrase) {
    // if (!phrase.imagen) {
    //     console.log("no imagen");
    //     return;
    // }
    const formData = new FormData();
    formData.append("frases", phrase.frase);
    formData.append("significado", phrase.significado);
    if (phrase.imagen) {
    formData.append("imagen", phrase.imagen);
    }

    try {
        console.log("formData", formData);
        console.log("info", phrase);
        const response = await axios.post(
            "https://edutlasdeveloper.pythonanywhere.com/apie/guardarfrase",
            formData,
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function editPhrase(phrase: EditPhrase) {
    // if (!phrase.imagen) {
    //     console.log("no imagen");
    //     return;
    // }

    const formData = new FormData();
    formData.append("frases", phrase.frase);
    formData.append("significado", phrase.significado);
    if (phrase.imagen) {
    formData.append("imagen", phrase.imagen);
    }

    try {
        console.log("info", phrase);
        const response = await axios.put(
            `https://edutlasdeveloper.pythonanywhere.com/apie/frases/${phrase.id}`,
            formData,
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function deletePhrase(id: number) {
    try {
        const response = await axios.delete(
            `https://edutlasdeveloper.pythonanywhere.com/apie/frases/${id}`,
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
