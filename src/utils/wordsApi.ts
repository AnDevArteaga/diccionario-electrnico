import axios from "axios"
import { NewWord, EditWord } from "@/interfaces/word.interface"


export async function getWords() {
  try {
    const response = await axios.get("https://edutlasdeveloper.pythonanywhere.com/apie/palabras")
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function addWord(word: NewWord) {
  if (!word.imagen) {
    console.log('no imagen')
    return;
  }
  const formData = new FormData();
  formData.append("palabra", word.palabra);
  formData.append("significado", word.significado);
  formData.append("imagen", word.imagen);

  try {
    console.log('formData', formData)
    console.log('word', word)
    const response = await axios.post("https://edutlasdeveloper.pythonanywhere.com/apie/guardarpalabras", formData)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function editWord(word: EditWord) {
  if (!word.imagen) {
    console.log('no imagen')
    return;
  }

  const formData = new FormData();
  formData.append("palabra", word.palabra);
  formData.append("significado", word.significado);
  formData.append("imagen", word.imagen);

  try {
    console.log('word', word)
    const response = await axios.put(`https://edutlasdeveloper.pythonanywhere.com/apie/palabras/${word.id}`, formData)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function deleteWord(id: number) {
  try {
    const response = await axios.delete(`https://edutlasdeveloper.pythonanywhere.com/apie/palabras/${id}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
