import axios from "axios"
import { NewSayings, EditSayings } from "@/interfaces/sayings.interface"


export async function getSayings() {
    try {
      const response = await axios.get("https://edutlasdeveloper.pythonanywhere.com/apie/refranes")
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  
export async function addSayings(saying: NewSayings) {
    if (!saying.imagen) {
      console.log('no imagen')
      return;
    }
    const formData = new FormData();
    formData.append("refran", saying.refran);
    formData.append("significado", saying.significado);
    formData.append("imagen", saying.imagen);
  
    try {
      console.log('formData', formData)
      console.log('refran', saying)
      const response = await axios.post("https://edutlasdeveloper.pythonanywhere.com/apie/guardarrefran", formData)
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }
  
  export async function editSayings(saying: EditSayings) {
    console.log('editSayings', saying)
    if (!saying.imagen) {
      console.log('no imagen')
      return;
    }
  
    const formData = new FormData();
    formData.append("refran", saying.refran);
    formData.append("significado", saying.significado);
    formData.append("imagen", saying.imagen);
  
    try {
      console.log('word', saying)
      const response = await axios.put(`https://edutlasdeveloper.pythonanywhere.com/apie/refranes/${saying.id}`, formData)
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }
  
  export async function deleteSayings(id: number) {
    try {
      const response = await axios.delete(`https://edutlasdeveloper.pythonanywhere.com/apie/refranes/${id}`)
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }