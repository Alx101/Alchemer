import { randomInteger } from "../../utils";
import potions from "./potions";

// Debug utility
export function ListPotions() {
    console.log(potions);
}

// Input values are comma separated strings
export function GetPotion(bases, signs, modifiers, ingredients) {
    const base_list = bases.split(",").filter((val) => val.length > 0);
    const sign_list = signs.split(",").filter((val) => val.length > 0);
    const modifier_list = modifiers.split(",").filter((val) => val.length > 0);
    const ingredients_list = ingredients.split(","); // TODO: Implement specific recipies

    if (
        base_list.length == 0 ||
        sign_list.length == 0 ||
        modifier_list.length == 0
    ) {
        return "";
    }

    const target_base = base_list[randomInteger(0, base_list.length - 1)];
    const target_sign = sign_list[randomInteger(0, sign_list.length - 1)];
    const target_modifier =
        modifier_list[randomInteger(0, modifier_list.length - 1)];

    return potions[target_base][target_sign][target_modifier];
}
