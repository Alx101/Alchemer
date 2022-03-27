import { GetPotionName, PotionBase, PotionSign, PotionModifier } from ".";

export function GetPotion(
    bases: string,
    signs: string,
    modifiers: string,
    ingredients: string
): string {
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

    return GetPotionName(
        base_list as Array<PotionBase>,
        sign_list as Array<PotionSign>,
        modifier_list as Array<PotionModifier>
    );
}
