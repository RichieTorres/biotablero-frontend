import React from "react";

export interface SearchContextValues {
  areaId: string;
  geofenceId: string | number;
  switchLayer(layer: string): void;
  handlerClickOnGraph({}): void;
}

const SearchContext = React.createContext<SearchContextValues>({
  areaId: "",
  geofenceId: "",
  switchLayer: () => {},
  handlerClickOnGraph: () => {},
});

export default SearchContext;