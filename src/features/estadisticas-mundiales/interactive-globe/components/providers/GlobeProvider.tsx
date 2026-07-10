"use client";

import { useEffect, useRef } from "react";
import { fetchCountryByCode } from "@/features/estadisticas-mundiales/interactive-globe/lib/api/countries";
import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

export function GlobeProvider({ children }: { children: React.ReactNode }) {
  const selectedIso2 = useGlobeStore((s) => s.selectedIso2);
  const compareMode = useGlobeStore((s) => s.compareMode);
  const compareIso2s = useGlobeStore((s) => s.compareIso2s);
  const setCountryDetail = useGlobeStore((s) => s.setCountryDetail);
  const setLoadingDetail = useGlobeStore((s) => s.setLoadingDetail);
  const setDetailError = useGlobeStore((s) => s.setDetailError);
  const setCompareDetail = useGlobeStore((s) => s.setCompareDetail);
  const removeCompareDetail = useGlobeStore((s) => s.removeCompareDetail);
  const setCompareLoadingIso2s = useGlobeStore((s) => s.setCompareLoadingIso2s);
  const clearCompareDetails = useGlobeStore((s) => s.clearCompareDetails);
  const fetchGenerationRef = useRef(0);

  const compareKey = compareIso2s.join(",");

  useEffect(() => {
    if (compareMode) return;

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
  }, [
    compareMode,
    selectedIso2,
    setCountryDetail,
    setLoadingDetail,
    setDetailError,
  ]);

  useEffect(() => {
    if (!compareMode) {
      fetchGenerationRef.current += 1;
      clearCompareDetails();
      return;
    }

    const compareIso2Set = new Set(compareIso2s);

    for (const iso of useGlobeStore.getState().compareDetails.keys()) {
      if (!compareIso2Set.has(iso)) removeCompareDetail(iso);
    }

    const pending = compareIso2s.filter(
      (iso) => !useGlobeStore.getState().compareDetails.has(iso),
    );

    if (pending.length === 0) {
      setCompareLoadingIso2s([]);
      return;
    }

    const generation = ++fetchGenerationRef.current;
    setCompareLoadingIso2s(pending);

    for (const iso of pending) {
      fetchCountryByCode(iso)
        .then((data) => {
          if (generation !== fetchGenerationRef.current || !data) return;
          if (!new Set(useGlobeStore.getState().compareIso2s).has(iso)) return;
          setCompareDetail(iso, data);
        })
        .catch(() => {
          if (generation !== fetchGenerationRef.current) return;
          setCompareLoadingIso2s(
            useGlobeStore
              .getState()
              .compareLoadingIso2s.filter((id) => id !== iso),
          );
        });
    }
  }, [
    compareMode,
    compareKey,
    compareIso2s,
    clearCompareDetails,
    removeCompareDetail,
    setCompareDetail,
    setCompareLoadingIso2s,
  ]);

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
