import { Navigate } from "react-router-dom";
import UserHome from "./Home";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import Loading from "../components/shared/loading";

export default function HomeRedirect() {
  const {isCompleted,initialState} = useSelector((state:RootState) => state.authuser);

  if(!isCompleted){
    <Loading/>
  }

  
  if(initialState.role==='admin'){return <Navigate to={"/admin/dashboard"} replace />;}
    
  return <UserHome />;
}
