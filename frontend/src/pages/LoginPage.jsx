import { useState } from "react";
import { Link } from "react-router";
import { LoaderIcon, LockIcon, MailIcon, SparklesIcon, UserIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import AuthLayout from "../components/auth/AuthLayout";
import FormField from "../components/auth/FormField";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const DEMO_ACCOUNTS = [
  { id: "alex", name: "Enter as Alex" },
  { id: "sam", name: "Enter as Sam" },
];

function LoginPage() {
  const { login, demoLogin, isLoggingIn } = useAuthStore();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [demoAccount, setDemoAccount] = useState(null);

  const startDemo = async (id) => {
    setDemoAccount(id);
    await demoLogin(id);
    setDemoAccount(null);
  };

  const update = (field) => (e) => {
    setFormData((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!EMAIL_RE.test(formData.email.trim())) next.email = "Enter a valid email address.";
    if (!formData.password) next.password = "Enter your password.";
    setErrors(next);
    if (Object.keys(next).length) return;
    login({ email: formData.email.trim(), password: formData.password });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to pick up your conversations."
      footer={
        <>
          New to Chatify?{" "}
          <Link to="/signup" className="focus-ring rounded font-semibold text-lagoon-400 hover:text-lagoon-300">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField
          label="Email"
          icon={MailIcon}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={update("email")}
          error={errors.email}
          disabled={isLoggingIn}
        />
        <FormField
          label="Password"
          icon={LockIcon}
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Your password"
          value={formData.password}
          onChange={update("password")}
          error={errors.password}
          disabled={isLoggingIn}
        />
        <button type="submit" className="btn-primary w-full" disabled={isLoggingIn} aria-busy={isLoggingIn}>
          {isLoggingIn && !demoAccount ? (
            <>
              <LoaderIcon className="size-4 animate-spin" aria-hidden="true" />
              Signing in
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-mist-700" aria-hidden="true">
        <span className="h-px flex-1 bg-ink-600" />
        or
        <span className="h-px flex-1 bg-ink-600" />
      </div>

      <section aria-labelledby="demo-heading" className="rounded-xl border border-lagoon-500/30 bg-lagoon-500/5 p-4">
        <h3 id="demo-heading" className="flex items-center gap-2 text-sm font-semibold text-mist-100">
          <SparklesIcon className="size-4 text-lagoon-400" aria-hidden="true" />
          Try the demo — no sign-up needed
        </h3>
        <p className="mt-1 text-[13px] leading-relaxed text-mist-500">
          Open Alex in one window and Sam in another (e.g. incognito) to see real-time messages and presence.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {DEMO_ACCOUNTS.map(({ id, name }) => (
            <button
              key={id}
              type="button"
              className="btn-secondary w-full"
              onClick={() => startDemo(id)}
              disabled={isLoggingIn}
              aria-busy={demoAccount === id}
            >
              {demoAccount === id ? (
                <LoaderIcon className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <UserIcon className="size-4" aria-hidden="true" />
              )}
              {name}
            </button>
          ))}
        </div>
      </section>
    </AuthLayout>
  );
}

export default LoginPage;
