export interface IProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
export interface ProfileInfoCardProps {
  form: IProfileForm;
}
export interface ProfileHeaderProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  onSave: () => void;
}
export interface PersonalInfoFormProps {
  form: IProfileForm;
  isEditing: boolean;
  onChange: (name: string, value: string) => void;
}
