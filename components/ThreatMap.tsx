"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface ThreatData {
  x: number;
  y: number;
  label?: string;
  id?: string | number;
}

interface ThreatMapProps {
  data: ThreatData[];
  isSecure: boolean;
}

export default function ThreatMap({ data, isSecure }: ThreatMapProps) {
  {
    return (
      <div className="h-85 w-full rounded-xl overflow-hidden bg-[#090d13]">
        <ComposableMap
          projectionConfig={{
            scale: 150,
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isSecure ? "#0f172a" : "#111827"}
                  stroke={isSecure ? "#10b98133" : "#f59e0b22"}
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {data.map((item, i) => (
            <Marker key={i} coordinates={[item.x, item.y]}>
              <circle
                r={isSecure ? 5 : 8}
                fill={isSecure ? "#10b981" : "#f59e0b"}
                opacity={0.8}
                className="animate-pulse"
              />
            </Marker>
          ))}
        </ComposableMap>
      </div>
    );
  }
}
