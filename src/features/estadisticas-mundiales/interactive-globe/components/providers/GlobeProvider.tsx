"use client";

import { useEffect } from "react";
import { fetchCountryByCode } from "@/features/estadisticas-mundiales/interactive-globe/lib/api/countries";
import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

export function GlobeProvider({ children }: { children: React.ReactNode }) {
  const selectedIso2 = useGlobeStore((s) => s.selectedIso2);
  const setCountryDetail = useGlobeStore((s) => s.setCountryDetail);
  const setLoadingDetail = useGlobeStore((s) => s.setLoadingDetail);
  const setDetailError = useGlobeStore((s) => s.setDetailError);

  useEffect(() => {
    if (!selectedIso2) {
      setCountryDetail(null);
      return;
    }

    const controller = new AbortController();
    setLoadingDetail(true);
    setDetailError(null);

    fetchCountryByCode(selectedIso2, { signal: controller.signal })
      .then((data) => {
        if (!data) throw new Error("No se pudo cargar el país");
        setCountryDetail(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setDetailError(err.message);
          setCountryDetail(null);
        }
      })
      .finally(() => setLoadingDetail(false));

    return () => controller.abort();
  }, [selectedIso2, setCountryDetail, setLoadingDetail, setDetailError]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        useGlobeStore.getState().clearSelection();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return <>{children}</>;
}
