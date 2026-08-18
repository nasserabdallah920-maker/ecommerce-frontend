import { Axios } from "../../../lib/axios"
const baseCategoryAdmin='/admin/categories'
export const createNewCategory=async(newCategory:FormData)=>{
    const response = await Axios.post(`${baseCategoryAdmin}/create`,newCategory)
    return response
}

export const deleteCategoryById=async(id:string)=>{
    const response = await Axios.delete(`${baseCategoryAdmin}/delete/${id}`)
    return response
}
export const updateCategory=async(id:string,newData:{name:string,description:string})=>{
    const response = await Axios.patch(`${baseCategoryAdmin}/update/information/${id}`,newData)
    return response
}

export const findAllCategories=async ()=>{
    const response = await Axios.get('/categories/')
    return response 
}
export const updateCategoryImage=async (id:string,formData:FormData)=>{
    const response = await Axios.patch(`${baseCategoryAdmin}/update/image/${id}`,formData)
    return response 
}