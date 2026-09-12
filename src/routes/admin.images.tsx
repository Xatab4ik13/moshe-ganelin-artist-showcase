import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { AdminButton, AdminCard, AdminShell } from "@/components/admin/AdminShell";
import { adminGetImages, adminResetImage, adminUploadImage } from "@/lib/admin.functions";
import { imageRegistry } from "@/lib/site-images";

export const Route = createFileRoute("/admin/images")({
  head: () => ({
    meta: [
      { title: "Фотографии и логотип — панель управления" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Замена логотипа и фотографий сайта Moshe Ariel Ganelin." },
    ],
  }),
  component: AdminImages,
});

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function ImageEditor({
  item,
  currentUrl,
  onChanged,
}: {
  item: (typeof imageRegistry)[number];
  currentUrl: string | null;
  onChanged: () => void;
}) {
  const upload = useServerFn(adminUploadImage);
  const reset = useServerFn(adminResetImage);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const shown = currentUrl ?? item.defaultUrl;

  const onPick = async (file: File) => {
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const base64 = await fileToBase64(file);
      const result = await upload({
        data: { key: item.key, filename: file.name, contentType: file.type, base64 },
      });
      if (result.ok) {
        setMessage("Готово. Новая картинка уже на сайте.");
        onChanged();
      } else {
        setError(result.error ?? "Не удалось загрузить файл.");
      }
    } catch (err) {
      console.error(err);
      setError("Не удалось загрузить файл. Попробуйте ещё раз.");
    }
    setBusy(false);
  };

  return (
    <AdminCard>
      <h3 className="text-lg font-bold text-[#0d3f8f]">{item.label}</h3>
      <p className="mt-1 text-base text-[#41566f]">{item.hint}</p>

      <div className="mt-4 flex flex-wrap items-start gap-5">
        <img
          src={shown}
          alt={item.label}
          className="h-40 w-56 rounded-lg border border-[#cfe0f5] bg-[#f4f9ff] object-contain p-2"
        />
        <div className="min-w-[16rem] flex-1 space-y-3">
          <p className="text-base text-[#41566f]">
            {currentUrl ? "Сейчас стоит ваша картинка." : "Сейчас стоит картинка, которая была на сайте изначально."}
          </p>
          <label className="block">
            <span className="text-base font-semibold text-[#123a6b]">Выбрать новый файл</span>
            <input
              type="file"
              accept="image/*"
              disabled={busy}
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                if (file) void onPick(file);
              }}
              className="mt-1 block w-full rounded-lg border border-[#bcd6f3] bg-white px-4 py-3 text-base text-[#0f2744]"
            />
          </label>
          {currentUrl ? (
            <AdminButton
              tone="quiet"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                await reset({ data: { key: item.key } });
                setBusy(false);
                setMessage("Вернули картинку, которая была изначально.");
                onChanged();
              }}
            >
              Вернуть прежнюю картинку
            </AdminButton>
          ) : null}
          {busy ? <p className="text-base text-[#41566f]">Загружаем…</p> : null}
          {message ? <p className="text-base font-semibold text-[#116b3a]">{message}</p> : null}
          {error ? <p className="text-base font-semibold text-[#b42318]">{error}</p> : null}
        </div>
      </div>
    </AdminCard>
  );
}

function AdminImages() {
  const images = useQuery({ queryKey: ["admin-images"], queryFn: () => adminGetImages() });
  const current = new Map((images.data ?? []).map((row) => [row.key, row.url]));

  const groups = Array.from(new Set(imageRegistry.map((item) => item.group)));

  return (
    <AdminShell title="Фотографии и логотип">
      <AdminCard>
        <p className="text-base text-[#41566f]">
          Здесь можно заменить любую картинку на сайте. Нажмите «Выбрать новый файл», найдите фотографию на
          компьютере — и она сразу появится на сайте. Если результат не понравился, нажмите «Вернуть прежнюю
          картинку».
        </p>
      </AdminCard>

      {images.isLoading ? <p className="text-base text-[#41566f]">Загружаем список…</p> : null}

      {groups.map((group) => (
        <section key={group} className="space-y-4">
          <h2 className="text-xl font-bold text-[#0d3f8f]">{group}</h2>
          {imageRegistry
            .filter((item) => item.group === group)
            .map((item) => (
              <ImageEditor
                key={item.key}
                item={item}
                currentUrl={current.get(item.key) ?? null}
                onChanged={() => void images.refetch()}
              />
            ))}
        </section>
      ))}
    </AdminShell>
  );
}
