import { Axios } from "../../lib/axios"

export const getAllCategories = async () => {
   
    const response = await Axios.get('/categories/')
    return response 
    
}
export const getCategoryById = async (id:string) => {

    const response = await Axios.get(`/categories/${id}`)
    return response
    
}