import Button from "../../../../components/shared/Button";
import PasswordInput from "../../../../components/shared/PasswordInput";
import TextInput from "../../../../components/shared/TextInput";
import { useLogin } from "../../hooks/useLogin";

export default function LoginForm() {
  const { handleChange, handleSubmit, loading,error } = useLogin();
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <TextInput
          id="email"
          type="email"
          placeholder="user@example.com"
          label="email"
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
      </div>

      <PasswordInput
        label="password"
        id="password"
        required
        onChange={(e) => {
          handleChange("password", e.target.value);
        }}
      />
      <div>
        {error && (
          <p className="flex items-center gap-2 p-3 mt-2 text-sm font-medium rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
            <span>{error}</span>
          </p>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <a
          href="#forgot"
          className="text-prime dark:text-prime-darkTheme hover:underline font-semibold transition-colors"
        >
          Forgot password?
        </a>
      </div>

      <Button loading={loading} word="login" />
    </form>
  );
}
