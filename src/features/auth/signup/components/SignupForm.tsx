import Button from "../../../../components/shared/Button";
import PasswordInput from "../../../../components/shared/PasswordInput";
import TextInput from "../../../../components/shared/TextInput";
import { formFields } from "../../auth.constants";
import { useSignup } from "../../hooks/useSignup";

export default function SignupForm() {
      const { handleSubmit, handleChange, error, loading } = useSignup();
  return (
           <form onSubmit={handleSubmit} className="space-y-5">
             <div className="grid grid-cols-2 gap-4">
               {formFields.map((field) => (
                 <div key={field.id}>
                   <TextInput

                     id={field.id}
                     type={field.type}
                     label={field.label}
                     placeholder={field.placeholder}
                     onChange={(e) => handleChange(field.id, e.target.value)}
                     required
                   />
                 </div>
               ))}
             </div>
             <PasswordInput
               label="Password"
               id="password"
               required
               onChange={(e) => handleChange("password", e.target.value)}
             />
   
             <div>
               {error && (
                 <p className="flex items-center gap-2 p-3 mt-2 text-sm font-medium rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
                   <span>{error}</span>
                 </p>
               )}
             </div>
   
             <div className="pt-2">
               <Button loading={loading} word="signup" />
             </div>
           </form>
   
  )
}
