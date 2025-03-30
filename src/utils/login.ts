import axios from "axios"
import { UserAdmin } from "@/interfaces/login.interface"



export async function login( { username, password } : UserAdmin) {
  try {
    const response = await axios.post("https://edutlasdeveloper.pythonanywhere.com/api/login", {
      username,
      password,
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}