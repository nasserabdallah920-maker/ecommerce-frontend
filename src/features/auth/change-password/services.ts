import { Axios } from "../../../lib/axios"
import type { IChangePasswordRequest } from "../auth.interfaces";

export const changePassword = async (data: IChangePasswordRequest) => {
  
    const response=await Axios.patch('/users/update/password/me',data)
    return response
    
}