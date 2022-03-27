import CharacterInteraction from "./characterInteraction";
import DialogueManager from "./dialogueManager";

export type InteractionHandler = (
    interaction: CharacterInteraction,
    manager: DialogueManager,
    interaction_type: string
) => string | false;

// Handles text nodes. They can either be a basic prompt, or they can provide text and choices
export const TextHandler: InteractionHandler = (
    interaction,
    manager,
    interaction_type
) => {
    if (interaction.current_node.choices) {
        return "choices";
    }
    return "talk";
};

export const SetHandler: InteractionHandler = (
    interaction,
    manager,
    interaction_type
) => {
    // means a variable will be set on this interaction and should potentially be used in game
    interaction.active_variables.set(
        interaction.current_node.variable,
        interaction.current_node.value
    );
    return `variable_set:${interaction.current_node.variable}`;
};

export const NodeHandler: InteractionHandler = (
    interaction,
    manager,
    interaction_type
) => {
    // functional nodes, like interact or leave
    manager.print(`Functional node hit: ${interaction.current_node.name}`);
    switch (interaction.current_node.name) {
        // TODO: Add more functional nodes here
        case "leave":
            manager.print("Leave encountered");
            return "leave"; // interaction over, character should exit
    }
    // By default we just continue
    manager.print("Continuing...");
    return manager.StepCharacterDialogue(
        interaction.character_id,
        interaction_type
    );
};

export const BranchHandler: InteractionHandler = (
    interaction,
    manager,
    interaction_type
) => {
    // internal dialogue tree branch. Based on set variables
    const target_var = interaction.active_variables.get(
        interaction.current_node.variable
    );
    manager.print(
        `Branching on target variable ${interaction.current_node.variable} with value ${target_var}`
    );
    if (target_var) {
        let next = interaction.current_node.branches[target_var];
        manager.print(`Branch: ${next || "_default"}`);
        if (!next) {
            next = interaction.current_node.branches["_default"];
        }
        return manager.StepCharacterDialogue(
            interaction.character_id,
            interaction_type,
            next
        );
    } else {
        manager.print("Variable not found");
        return `variable_required:${interaction.current_node.variable}`;
    }
};
