import merchant_mortar_and_pestle from "./merchant_mortar_and_pestle.json";
import guard_strength from "./guard_strength.json";

export type Dialogue =
    | typeof merchant_mortar_and_pestle
    | typeof guard_strength;

export type CharacterMap = {
    [name: string]: Array<Dialogue>;
};

export type DialogueNode = {
    type: string;
    id: string;
    variable?: string;
    value?: string;
    next?: string;
    name?: string;
    actor?: string;
    choices?: Array<string>;
    branches?: {
        [x: string]: string;
    };
};

const characters: CharacterMap = {
    merchant: [merchant_mortar_and_pestle],
    guard: [guard_strength],
};

export default characters;
