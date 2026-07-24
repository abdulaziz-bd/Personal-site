import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  GeoJSON,
  useMap,
} from "react-leaflet";
import type { GeoJsonObject } from "geojson";
import "leaflet/dist/leaflet.css";
import { BentoCard, CardChip } from "./BentoCard";
import { profile } from "../data/cv";

const GERMANY_GEOJSON_URL =
  "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/1_deutschland/4_niedrig.geo.json";

type SearchResult = {
  lat: number;
  lon: number;
  name: string;
  inGermany: boolean;
};

function FlyTo({ target }: { target: SearchResult | null }) {
  const map = useMap();
  useEffect(() => {
    if (!target) return;
    map.flyTo([target.lat, target.lon], target.inGermany ? 8 : 4, {
      duration: 1.6,
    });
  }, [target, map]);
  return null;
}

export default function MapCard() {
  const { location } = profile;
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "yes" | "no" | "notfound" | "error"
  >("idle");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [germany, setGermany] = useState<GeoJsonObject | null>(null);

  async function search(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&q=${encodeURIComponent(q)}`,
        { headers: { Accept: "application/json" } },
      );
      const [hit] = await res.json();
      if (!hit) {
        setResult(null);
        setStatus("notfound");
        return;
      }
      const inGermany = hit.address?.country_code === "de";
      setResult({
        lat: +hit.lat,
        lon: +hit.lon,
        name: hit.display_name.split(",")[0],
        inGermany,
      });
      setStatus(inGermany ? "yes" : "no");
      // lazily load the Germany border so the "agreed" area lights up
      if (inGermany && !germany) {
        fetch(GERMANY_GEOJSON_URL)
          .then((r) => r.json())
          .then(setGermany)
          .catch(() => {});
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <BentoCard className="min-h-[360px] overflow-hidden !p-0">
      <div className="absolute left-4 top-4 z-[1000]">
        <CardChip>Map</CardChip>
      </div>

      {/* relocation search */}
      <form
        onSubmit={search}
        className="absolute inset-x-4 top-[60px] z-[1000] flex items-center gap-1.5 rounded-full border border-line bg-white/95 py-1 pl-4 pr-1 shadow-card backdrop-blur"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Would I relocate to… (try Munich)"
          aria-label="Search a place to check relocation"
          className="w-full bg-transparent text-[12.5px] font-medium outline-none placeholder:text-ink-faint"
        />
        <motion.button
          type="submit"
          whileTap={{ scale: 0.9 }}
          aria-label="Search"
          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ink text-white"
        >
          {status === "loading" ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="block size-3 rounded-full border-[1.5px] border-white/30 border-t-white"
            />
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          )}
        </motion.button>
      </form>

      <MapContainer
        center={[location.lat, location.lon]}
        zoom={11}
        zoomControl={false}
        scrollWheelZoom={false}
        attributionControl={true}
        className="z-0 h-full min-h-[360px] w-full flex-1"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles"
        />
        <FlyTo target={result} />

        {/* the "agreed" area — whole of Germany */}
        {germany && result?.inGermany && (
          <GeoJSON
            data={germany}
            style={{
              color: "#f4530b",
              weight: 2,
              fillColor: "#f4530b",
              fillOpacity: 0.08,
            }}
          />
        )}

        {/* home: Potsdam */}
        <CircleMarker
          center={[location.lat, location.lon]}
          radius={8}
          pathOptions={{ color: "#ffffff", weight: 3, fillColor: "#f4530b", fillOpacity: 1 }}
        >
          <Tooltip direction="top" offset={[0, -8]}>
            Home — {location.city} 🏠
          </Tooltip>
        </CircleMarker>

        {/* searched place */}
        {result && (
          <CircleMarker
            center={[result.lat, result.lon]}
            radius={8}
            pathOptions={{
              color: "#ffffff",
              weight: 3,
              fillColor: result.inGermany ? "#10b981" : "#94a3b8",
              fillOpacity: 1,
            }}
          >
            <Tooltip direction="top" offset={[0, -8]} permanent>
              {result.name} {result.inGermany ? "✅" : "🚫"}
            </Tooltip>
          </CircleMarker>
        )}
      </MapContainer>

      {/* verdict banner */}
      <div className="pointer-events-none absolute inset-x-4 bottom-10 z-[1000] flex flex-col items-center gap-1.5">
        <AnimatePresence mode="wait">
          {status === "yes" && result && (
            <motion.p
              key={`yes-${result.name}`}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6 }}
              className="rounded-2xl bg-emerald-600 px-4 py-2 text-center text-[12.5px] font-semibold text-white shadow-card-hover"
            >
              ✅ {result.name}? Deal — I&rsquo;m open to anywhere in Germany!
            </motion.p>
          )}
          {status === "no" && result && (
            <motion.p
              key={`no-${result.name}`}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6 }}
              className="rounded-2xl bg-ink px-4 py-2 text-center text-[12.5px] font-semibold text-white shadow-card-hover"
            >
              🚫 {result.name} is outside my range — Germany-wide (for now).
            </motion.p>
          )}
          {status === "notfound" && (
            <motion.p
              key="notfound"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl bg-ink px-4 py-2 text-[12.5px] font-semibold text-white shadow-card-hover"
            >
              Couldn&rsquo;t find that place — try another spelling?
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl bg-ink px-4 py-2 text-[12.5px] font-semibold text-white shadow-card-hover"
            >
              Search hiccup — please try again.
            </motion.p>
          )}
          {status === "idle" && (
            <motion.p
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-full border border-accent/25 bg-white/90 px-3.5 py-1.5 text-[12px] font-semibold text-accent shadow-card backdrop-blur"
            >
              {location.relocation} 🇩🇪 · {location.workModes.join(" · ")}
            </motion.p>
          )}
        </AnimatePresence>
        <p className="rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted backdrop-blur">
          {location.city} · {location.coords}
        </p>
      </div>
    </BentoCard>
  );
}
