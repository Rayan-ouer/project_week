import { useState, useMemo, useCallback, useRef } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import type { CountryEvent, CyberEvent } from '../model/CyberEvent';
import Dashboard from "./Dashboard";
import worldData from '../../public/data/world.json';
import { color } from 'd3';

interface Feature {
    type: string;
    properties: {
        name: string;
    };
    geometry: {
        type: string;
        coordinates: number[][][] | number[][][][];
    };
    id: string;
}

interface TooltipState {
    visible: boolean;
    x: number;
    y: number;
    name: string;
    code: string;
}

type WorldMapProps = {
    onCountryClick: (countryCode: string | null) => void;
    data: CountryEvent[];
};

const WorldMap = ({ onCountryClick, data }: WorldMapProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [tooltip, setTooltip] = useState<TooltipState>({
        visible: false,
        x: 0,
        y: 0,
        name: '',
        code: '',
    });

    const { projection, pathGenerator, features } = useMemo(() => {
        const width = 960;
        const height = 500;

        const proj = geoMercator()
            .scale(150)
            .center([0, 20])
            .translate([width / 2, height / 2]);

        const path = geoPath().projection(proj);
        const feats = (worldData as { features: Feature[] }).features;

        return {
            projection: proj,
            pathGenerator: path,
            features: feats,
        };
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent, feature: Feature) => {
        setTooltip({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            name: feature.properties.name,
            code: feature.id || 'N/A',
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setTooltip((prev) => ({ ...prev, visible: false }));
    }, []);

    function colorCountryByIncident(data: CountryEvent[], feature: Feature) {
        const country = data.find(event => event.country === feature.id);

        if (!country || !country.events || country.events.length <= 0)
            return "rgba(204, 204, 204, 0.5)";
        if (country.events.length < 5)
            return "rgba(144, 238, 144, 0.5)";
        if (country.events.length < 10)
            return "rgba(50, 205, 50, 0.6)";
        if (country.events.length < 20)
            return "rgba(34, 139, 34, 0.1)";
        if (country.events.length < 50)
            return "rgba(30, 144, 255, 0.4)";
        return "rgba(0, 0, 139, 0.4)";
    }

    return (
        <div ref={containerRef} className="world-map-container">
            <svg
                className="world-map-svg"
                viewBox="0 0 960 500"
                preserveAspectRatio="xMidYMid meet"
            >
                <g>
                    {features.map((feature) => {
                        const d = pathGenerator(feature as any);
                        if (!d) return null;
                        const fillColor = colorCountryByIncident(data, feature)
                        return (
                            <path
                                key={feature.id || feature.properties.name}
                                d={d}
                                className="country-path"
                                fill={fillColor}
                                onMouseMove={(e) => handleMouseMove(e, feature)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => onCountryClick(feature.id)}
                            />
                        );
                    })}
                </g>
            </svg>

            <div
                className={`country-tooltip ${tooltip.visible ? 'visible' : ''}`}
                style={{
                    left: tooltip.x,
                    top: tooltip.y,
                }}
            >
                <div className="country-tooltip-name">{tooltip.name}</div>
                <div className="country-tooltip-code">{tooltip.code}</div>
            </div>
        </div>
    );
};

export default WorldMap;
