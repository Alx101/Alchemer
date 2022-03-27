import { randomInteger } from "../../utils";
import potions from "./potions.json";

// Types
export type PotionBase = keyof typeof potions;
export type PotionSign = keyof typeof potions[PotionBase];
export type PotionModifier = keyof typeof potions[PotionBase][PotionSign];

// Debug utility
export function ListPotions(): void {
    console.log(potions);
}

// Input values are comma separated strings
export function GetPotionName(
    bases: Array<PotionBase>,
    signs: Array<PotionSign>,
    modifiers: Array<PotionModifier>
): string {
    const target_base = bases[randomInteger(0, bases.length - 1)];
    const target_sign = signs[randomInteger(0, signs.length - 1)];
    const target_modifier = modifiers[randomInteger(0, modifiers.length - 1)];

    return (
        potions?.[target_base as PotionBase]?.[target_sign as PotionSign]?.[
            target_modifier as PotionModifier
        ] || ""
    );
}
