import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../rootReducer";

function toFloatStr(u8: number) {
  return `${u8 / 255}`;
}
const getGlowsCvarText = createSelector(
  (state: AppState) => state.glows.cvars,
  (state: AppState) => state.glows.flags.cloneToColorblind,
  (glows, shouldCloneToColorblind) => {
    return (
      glows.orderedIds
        .flatMap((glowCvar) => {
          const targetGlowName = shouldCloneToColorblind
            ? glowCvar.replace(/_colorblind$/, "")
            : glowCvar;
          const glow = glows.byId[targetGlowName]!;
          return [
            `${glowCvar}_r "${toFloatStr(glow.r)}";`,
            `${glowCvar}_g "${toFloatStr(glow.g)}";`,
            `${glowCvar}_b "${toFloatStr(glow.b)}";`,
          ];
        })
        .join("\n") + "\n"
    );
  }
);

export default getGlowsCvarText;
