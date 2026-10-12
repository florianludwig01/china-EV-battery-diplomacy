"use client";

import { useMemo, useState } from "react";
import type { FeatureCollection, LineString } from "geojson";
import { setWorkerUrl } from "maplibre-gl";
import {
  Layer,
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  Popup,
  Source,
  type LayerProps,
} from "react-map-gl/maplibre";

import {
  edges,
  nodes,
  relationStyles,
  type ActorCategory,
  type ActorNode,
  type FeedbackLoop,
  type RelationCategory,
} from "@/data/systemsMap";

const labelZoomByCategory: Record<ActorCategory, number> = {
  state: 1.5,
  institution: 1.8,
  industry: 2.3,
  company: 3,
  resource: 3,
};

setWorkerUrl(
  new URL(
    "maplibre-gl/dist/maplibre-gl-worker.mjs",
    import.meta.url,
  ).toString(),
);

type RelationProperties = {
  id: string;
  label: string;
  category: RelationCategory;
  color: string;
  opacity: number;
  width: number;
};

const relationLayer: LayerProps = {
  id: "battery-relations",
  type: "line",
  layout: {
    "line-cap": "round",
    "line-join": "round",
  },
  paint: {
    "line-color": ["get", "color"],
    "line-width": ["get", "width"],
    "line-opacity": ["get", "opacity"],
  },
};

const relationLabelLayer: LayerProps = {
  id: "battery-relation-labels",
  type: "symbol",
  minzoom: 2.2,
  layout: {
    "symbol-placement": "line",
    "symbol-spacing": 240,
    "text-field": ["get", "label"],
    "text-size": 11,
    "text-offset": [0, -0.9],
    "text-allow-overlap": false,
  },
  paint: {
    "text-color": ["get", "color"],
    "text-halo-color": "#020617",
    "text-halo-width": 1.5,
    "text-opacity": ["get", "opacity"],
  },
};

type WorldMapProps = {
  visibleActors: ReadonlySet<ActorCategory>;
  visibleRelations: ReadonlySet<RelationCategory>;
  activeFeedbackLoop: FeedbackLoop | null;
};

export default function WorldMap({
  visibleActors,
  visibleRelations,
  activeFeedbackLoop,
}: WorldMapProps) {
  const [selectedActor, setSelectedActor] = useState<ActorNode | null>(null);
  const [zoom, setZoom] = useState(1.25);

  const geographicNodes = useMemo(
    () =>
      nodes.filter(
        (node) =>
          node.data.geography && visibleActors.has(node.data.category),
      ),
    [visibleActors],
  );

  const relationGeoJson = useMemo<
    FeatureCollection<LineString, RelationProperties>
  >(() => {
    const nodesById = new Map(nodes.map((node) => [node.id, node]));

    return {
      type: "FeatureCollection",
      features: edges.flatMap((edge) => {
        const sourceNode = nodesById.get(edge.source);
        const targetNode = nodesById.get(edge.target);
        const source = sourceNode?.data.geography;
        const target = targetNode?.data.geography;
        const category = edge.data?.category;

        if (
          !sourceNode ||
          !targetNode ||
          !source ||
          !target ||
          !category ||
          !visibleRelations.has(category) ||
          !visibleActors.has(sourceNode.data.category) ||
          !visibleActors.has(targetNode.data.category)
        ) {
          return [];
        }

        const highlighted =
          activeFeedbackLoop?.edgeIds.some(
            (edgeId: string) => edgeId === edge.id,
          ) ?? false;

        return [
          {
            type: "Feature" as const,
            properties: {
              id: edge.id,
              label: String(edge.label ?? "Relation"),
              category,
              color: highlighted
                ? activeFeedbackLoop?.color ?? relationStyles[category].color
                : relationStyles[category].color,
              opacity: activeFeedbackLoop ? (highlighted ? 0.95 : 0.1) : 0.82,
              width: highlighted ? 5 : 2.5,
            },
            geometry: {
              type: "LineString" as const,
              coordinates: [
                [source.longitude, source.latitude],
                [target.longitude, target.latitude],
              ],
            },
          },
        ];
      }),
    };
  }, [activeFeedbackLoop, visibleActors, visibleRelations]);

  return (
    <section className="relative h-[75vh] min-h-[520px] w-full overflow-hidden bg-slate-900">
      <MapLibreMap
        renderWorldCopies={false}
        initialViewState={{
          longitude: 30,
          latitude: 16,
          zoom: 1.25,
        }}
        minZoom={0.1}
        maxZoom={70}
        onMove={(event) => setZoom(event.viewState.zoom)}
        mapStyle="https://demotiles.maplibre.org/style.json"
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="bottom-right" />

        <Source id="battery-relations" type="geojson" data={relationGeoJson}>
          <Layer {...relationLayer} />
          <Layer {...relationLabelLayer} />
        </Source>

        {geographicNodes.map((node) => {
          const geography = node.data.geography;

          if (!geography) {
            return null;
          }

          const showLabel =
            zoom >= labelZoomByCategory[node.data.category];
          const highlighted =
            !activeFeedbackLoop ||
            activeFeedbackLoop.nodeIds.some(
              (nodeId: string) => nodeId === node.id,
            );

          return (
            <Marker
              key={node.id}
              longitude={geography.longitude}
              latitude={geography.latitude}
              anchor="bottom"
            >
              <button
                type="button"
                className={`map-actor map-actor-${node.data.category}`}
                style={{
                  opacity: highlighted ? 1 : 0.16,
                  transition: "opacity 200ms ease",
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedActor(node);
                }}
                aria-label={`Show details for ${node.data.label}`}
              >
                <span className="map-actor-dot" />
                {showLabel ? (
                  <span className="map-actor-label">{node.data.label}</span>
                ) : null}
              </button>
            </Marker>
          );
        })}

        {selectedActor?.data.geography &&
        visibleActors.has(selectedActor.data.category) ? (
          <Popup
            longitude={selectedActor.data.geography.longitude}
            latitude={selectedActor.data.geography.latitude}
            anchor="top"
            closeButton
            closeOnClick={false}
            onClose={() => setSelectedActor(null)}
            offset={12}
          >
            <div className="min-w-48">
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">
                {selectedActor.data.category}
              </p>
              <h2 className="mt-1 text-base font-bold text-white">
                {selectedActor.data.label}
              </h2>
              {selectedActor.data.description ? (
                <p className="mt-2 text-sm leading-5 text-slate-300">
                  {selectedActor.data.description}
                </p>
              ) : null}
            </div>
          </Popup>
        ) : null}
      </MapLibreMap>

    </section>
  );
}
