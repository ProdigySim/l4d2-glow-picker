import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PojoMap } from "pojo-maps";
import { Dispatch } from "react";
import parseCfgFile from "../../utils/parseCfgFile";
import { normalize } from "../normalize";
import { AppState } from "../rootReducer";
import glowData from "./glow_data.json";

type RGBValues = {
  r: number;
  g: number;
  b: number;
};

function floatStrToU8(value: string): number {
  return floatToU8(parseFloat(value));
}

function floatToU8(value: number): number {
  return Math.floor(value * 255);
}

const defaultGlowCvars = normalize(
  glowData.map((cvar) => ({
    ...cvar,
    r: floatStrToU8(cvar.r),
    g: floatStrToU8(cvar.g),
    b: floatStrToU8(cvar.b),
    isColorblind: cvar.name.endsWith("colorblind"),
  })),
  (glow) => glow.name
);

const slice = createSlice({
  name: "glows",
  initialState: {
    cvars: defaultGlowCvars,
    flags: {
      cloneToColorblind: true,
    },
  },
  reducers: {
    setGlowColor: (
      state,
      action: PayloadAction<{ name: string; value: RGBValues }>
    ) => {
      const cvar = state.cvars.byId[action.payload.name];
      const { r, g, b } = action.payload.value;
      if (cvar) {
        cvar.r = r;
        cvar.g = g;
        cvar.b = b;
        const colorblindCvar = state.cvars.byId[`${cvar.name}_colorblind`];
        if (state.flags.cloneToColorblind && colorblindCvar) {
          // Also clone this change to the colorblind version of the cvar
          colorblindCvar.r = r;
          colorblindCvar.g = g;
          colorblindCvar.b = b;
        }
      }
    },
    setCloneToColorblind: (state, action: PayloadAction<boolean>) => {
      state.flags.cloneToColorblind = action.payload;
    },
  },
});

export const { setGlowColor, setCloneToColorblind } = slice.actions;

export const setGlowsFromCfg = (cfg: string) => (
  dispatch: Dispatch<unknown>,
  getState: () => AppState
) => {
  const cvarPairs = parseCfgFile(cfg);

  const glowsByName = getState().glows.cvars.byId;
  cvarPairs
    .flatMap(({ cvar, value }) => {
      const res = /^(.*)_([rgb])$/i.exec(cvar);
      if (!res) {
        return [];
      }
      const [, glowName, color] = res;
      if (!PojoMap.has(glowsByName, glowName)) {
        return [];
      }
      return {
        name: glowName,
        value: {
          [color as "r" | "g" | "b"]: floatToU8(value),
        },
      };
    })
    .forEach(({ name, value }) => {
      const prev = PojoMap.get(getState().glows.cvars.byId, name);
      if (prev) {
        dispatch(
          setGlowColor({
            name,
            value: {
              r: prev.r,
              g: prev.g,
              b: prev.b,
              ...value,
            },
          })
        );
      }
    });
};

export default slice.reducer;
