import {
    InteractWith,
    GetCharacterVariable,
    GetCurrentNodeId,
    GetNodeChoices,
    GetNodeText,
    SetCharacterVariable,
    InitCharacterInteraction,
} from "./systems/dialogueSystem";
import { ListPotions, GetPotion } from "./systems/potionHelper";

console.log("Loaded game code");

// Required to allow Construct 2 to call the functions, as it looks for the function name on the window object.
window.ListPotions = ListPotions;
window.GetPotion = GetPotion;

window.InitCharacterInteraction = InitCharacterInteraction;
window.InteractWith = InteractWith;
window.GetCharacterVariable = GetCharacterVariable;
window.SetCharacterVariable = SetCharacterVariable;
window.GetCurrentNodeId = GetCurrentNodeId;
window.GetNodeChoices = GetNodeChoices;
window.GetNodeText = GetNodeText;
