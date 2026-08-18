import { Axios } from "../../lib/axios"

export const getLastOrders = async () => {
  
const response = await Axios.get('/order')

return response

}