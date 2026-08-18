import { useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileInfoCard from "./ProfileInfoCard";
import PersonalInfoForm from "./PersonalInfoForm";
import SecuritySection from "./SecuritySection";
import { useFetchUser } from "../hooks/useFetchUser";
import Loading from "../../../components/shared/loading";


export default function ProfileView() {
  const {isEditing,setIsEditing,form,fetchUser,handleChange,sendNewData,loading}=useFetchUser()

  useEffect(() => {

    fetchUser();
  }, [fetchUser]);
if(loading)return <Loading/>


  return (
    <div className="min-h-screen bg-bgMain-light dark:bg-bgMain-dark p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        <ProfileHeader 
          isEditing={isEditing} 
          setIsEditing={setIsEditing} 
          onSave={sendNewData} 
        />
        <ProfileInfoCard form={form} />
        <PersonalInfoForm 
          form={form} 
          isEditing={isEditing} 
          onChange={handleChange} 
        />
        <SecuritySection />
      </div>
    </div>
  );
}
