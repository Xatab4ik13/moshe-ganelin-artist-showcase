import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, type ReactNode } from "react";

import { adminLogin, adminLogout, adminStatus } from "@/lib/admin.functions";

export const adminFont = { fontFamily: "'Arial', 'Helvetica Neue', Helvetica, sans-serif" } as const;

export function AdminCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-[#cfe0f5] bg-white p-6 shadow-sm ${className}`}>{children}</div>
  );
}

export function AdminButton({
  children,
  onClick,
  type = "button",
  disabled,
  tone = "primary",
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  tone?: "primary" | "quiet";
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-5 py-3 text-base font-semibold transition-colors disabled:opacity-50";
  const styles =
    tone === "primary"
      ? "bg-[#1b63d8] text-white hover:bg-[#164fae]"
      : "border border-[#bcd6f3] bg-[#eaf3ff] text-[#124a9e] hover:bg-[#dbeafe]";
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${styles}`} style={adminFont}>
      {children}
    </button>
  );
}

function LoginScreen({ onDone }: { onDone: () => void }) {
  const login = useServerFn(adminLogin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#eef5fd] px-4" style={adminFont}>
      <AdminCard className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#0d3f8f]">Вход в панель управления</h1>
        <p className="mt-2 text-base text-[#41566f]">Введите почту и пароль администратора сайта.</p>
        <form
          className="mt-6 space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setBusy(true);
            setError(null);
            const result = await login({ data: { email, password } });
            setBusy(false);
            if (result.ok) onDone();
            else setError(result.error ?? "Не удалось войти.");
          }}
        >
          <label className="block">
            <span className="text-base font-semibold text-[#123a6b]">Почта</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="username"
              className="mt-1 w-full rounded-lg border border-[#bcd6f3] bg-white px-4 py-3 text-base text-[#0f2744] outline-none focus:border-[#1b63d8]"
            />
          </label>
          <label className="block">
            <span className="text-base font-semibold text-[#123a6b]">Пароль</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-lg border border-[#bcd6f3] bg-white px-4 py-3 text-base text-[#0f2744] outline-none focus:border-[#1b63d8]"
            />
          </label>
          {error ? <p className="text-base font-semibold text-[#b42318]">{error}</p> : null}
          <AdminButton type="submit" disabled={busy}>
            {busy ? "Входим…" : "Войти"}
          </AdminButton>
        </form>
      </AdminCard>
    </div>
  );
}

const navItems = [
  { to: "/admin", label: "Главная панели" },
  { to: "/admin/texts", label: "Тексты сайта" },
  { to: "/admin/images", label: "Фотографии и логотип" },
  { to: "/admin/concerts", label: "Концерты" },
  { to: "/admin/videos", label: "Видео" },
  { to: "/admin/press", label: "Пресса и публикации" },
  { to: "/admin/works", label: "Сочинения" },
  { to: "/admin/poetry", label: "Стихи" },
  { to: "/admin/photos", label: "Фотогалерея" },
  { to: "/admin/contacts", label: "Контакты и соцсети" },
  { to: "/admin/settings", label: "Настройки и пароль" },
] as const;

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  const router = useRouter();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logout = useServerFn(adminLogout);
  const status = useQuery({ queryKey: ["admin-status"], queryFn: () => adminStatus(), staleTime: 0 });

  if (status.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#eef5fd] text-lg text-[#123a6b]" style={adminFont}>
        Загрузка…
      </div>
    );
  }

  if (status.data && !status.data.ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#eef5fd] px-4" style={adminFont}>
        <AdminCard className="max-w-lg">
          <h1 className="text-2xl font-bold text-[#0d3f8f]">Панель ещё не подключена</h1>
          <p className="mt-3 text-base text-[#41566f]">{status.data.reason}</p>
          <p className="mt-3 text-base text-[#41566f]">
            Это нормально в предпросмотре. На вашем сервере панель заработает после настройки базы данных.
          </p>
        </AdminCard>
      </div>
    );
  }

  if (!status.data?.email) {
    return <LoginScreen onDone={() => status.refetch()} />;
  }

  return (
    <div className="min-h-screen bg-[#eef5fd] text-[#0f2744]" style={adminFont}>
      <header className="border-b border-[#cfe0f5] bg-[#0d3f8f] text-white">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-5 py-4">
          <span className="text-lg font-bold">Панель управления сайтом</span>
          <div className="flex items-center gap-3 text-base">
            <a href="/" className="underline">
              Открыть сайт
            </a>
            <button
              type="button"
              className="rounded-lg bg-white/15 px-4 py-2 font-semibold hover:bg-white/25"
              onClick={async () => {
                await logout();
                queryClient.clear();
                await router.invalidate();
                navigate({ to: "/admin" });
              }}
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-8 md:flex-row">
        <nav className="md:w-64 md:shrink-0">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/admin" }}
                  className="block rounded-lg border border-[#cfe0f5] bg-white px-4 py-3 text-base font-semibold text-[#124a9e] hover:bg-[#dbeafe] [&.active]:bg-[#1b63d8] [&.active]:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <main className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold text-[#0d3f8f]">{title}</h1>
          <div className="mt-6 space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
