import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { AdminButton, AdminCard, AdminShell } from "@/components/admin/AdminShell";
import { adminChangePassword } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Настройки — панель управления" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Настройки панели управления сайтом Moshe Ariel Ganelin." },
    ],
  }),
  component: AdminSettings,
});

function AdminSettings() {
  const changePassword = useServerFn(adminChangePassword);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [repeat, setRepeat] = useState("");
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <AdminShell title="Настройки и пароль">
      <AdminCard>
        <h2 className="text-xl font-bold text-[#0d3f8f]">Смена пароля</h2>
        <p className="mt-2 text-base text-[#41566f]">
          Придумайте пароль не короче 8 символов и запишите его в надёжном месте.
        </p>
        <form
          className="mt-5 max-w-md space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            if (next !== repeat) {
              setMessage({ kind: "error", text: "Новый пароль и повтор не совпадают." });
              return;
            }
            setBusy(true);
            setMessage(null);
            const result = await changePassword({ data: { current, next } });
            setBusy(false);
            if (result.ok) {
              setMessage({ kind: "ok", text: "Пароль изменён." });
              setCurrent("");
              setNext("");
              setRepeat("");
            } else {
              setMessage({ kind: "error", text: result.error ?? "Не удалось изменить пароль." });
            }
          }}
        >
          {[
            { label: "Текущий пароль", value: current, set: setCurrent, auto: "current-password" },
            { label: "Новый пароль", value: next, set: setNext, auto: "new-password" },
            { label: "Новый пароль ещё раз", value: repeat, set: setRepeat, auto: "new-password" },
          ].map((item) => (
            <label key={item.label} className="block">
              <span className="text-base font-semibold text-[#123a6b]">{item.label}</span>
              <input
                type="password"
                value={item.value}
                onChange={(event) => item.set(event.target.value)}
                autoComplete={item.auto}
                required
                className="mt-1 w-full rounded-lg border border-[#bcd6f3] bg-white px-4 py-3 text-base text-[#0f2744] outline-none focus:border-[#1b63d8]"
              />
            </label>
          ))}
          {message ? (
            <p
              className={`text-base font-semibold ${
                message.kind === "ok" ? "text-[#127a3d]" : "text-[#b42318]"
              }`}
            >
              {message.text}
            </p>
          ) : null}
          <AdminButton type="submit" disabled={busy}>
            {busy ? "Сохраняем…" : "Сохранить новый пароль"}
          </AdminButton>
        </form>
      </AdminCard>

      <AdminCard>
        <h2 className="text-xl font-bold text-[#0d3f8f]">Восстановление пароля</h2>
        <p className="mt-2 text-base text-[#41566f]">
          Письмо для восстановления подключим, когда появится почтовый ящик для рассылки. Пока пароль меняется
          здесь.
        </p>
      </AdminCard>
    </AdminShell>
  );
}
