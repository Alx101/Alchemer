import {
    InteractWith,
    GetCharacterVariable,
    GetCurrentNodeId,
    GetNodeChoices,
    GetNodeText,
    SetCharacterVariable,
} from "./systems/dialogueSystem/construct2";
import { InitCharacterInteraction } from "./systems/dialogueSystem/construct2";
import { ListPotions } from "./systems/potionHelper";
import { GetPotion } from "./systems/potionHelper/construct2";
// ts-ignore
console.log("Loaded game code");

// Required to allow Construct 2 to call the functions, as it looks for the function name on the window object.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.ListPotions = ListPotions;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.GetPotion = GetPotion;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.InitCharacterInteraction = InitCharacterInteraction;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.InteractWith = InteractWith;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.GetCharacterVariable = GetCharacterVariable;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.SetCharacterVariable = SetCharacterVariable;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.GetCurrentNodeId = GetCurrentNodeId;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.GetNodeChoices = GetNodeChoices;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.GetNodeText = GetNodeText;
