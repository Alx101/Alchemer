import { DialogueNode } from "../dialogues";
import { CharacterInteraction } from "./characterInderaction";
import DialogueManager from "./dialogueManager";

export type InteractionHandler = (
    node: DialogueNode,
    interaction: CharacterInteraction,
    manager: DialogueManager
) => string | undefined;
