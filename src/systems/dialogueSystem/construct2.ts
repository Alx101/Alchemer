import DialogueManager from "./components/dialogueManager";


const dialogueManager = new DialogueManager(true);

export function InitCharacterInteraction(
    character_name: string,
    character_id: string
) {
    return dialogueManager.InitCharacter(character_name.toString(), character_id.toString());
}

export function InteractWith(
    character_id: string,
    interaction_type: string,
    force_node: false | string = false
): string | false {
    return dialogueManager.InteractWithCharacter(character_id.toString(), interaction_type.toString(), force_node);
}

export function GetNodeText(
    character_id: string,
    node_id: string | false = false
): string {
    const interaction = dialogueManager.character_interactions.get(character_id);
    return node_id
        ? interaction.nodes.get(node_id).name
        : interaction.current_node.name;
}

export function GetNodeChoices(
    character_id: string,
    node_id: string | false = false
): string {
    const interaction = dialogueManager.character_interactions.get(character_id);
    const node = node_id
        ? interaction.nodes.get(node_id)
        : interaction.current_node;
    return node.choices.join("|");
}

export function GetCurrentNodeId(character_id: string): string {
    const interaction = dialogueManager.character_interactions.get(character_id);
    return interaction.current_node?.name;
}

export function GetNodeValue(
    character_id: string,
    node_id: string | false = false
): string {
    const interaction = dialogueManager.character_interactions.get(character_id);
    const node = node_id
        ? interaction.nodes.get(node_id)
        : interaction.current_node;
    return node?.value;
}

export function GetNodeVariable(
    character_id: string,
    node_id: string | false = false
): string {
    const interaction = dialogueManager.character_interactions.get(character_id);
    const node = node_id
        ? interaction.nodes.get(node_id)
        : interaction.current_node;
    return node?.variable;
}

export function SetCharacterVariable(
    character_id: string,
    variable_name: string,
    variable_value: string
): void {
    dialogueManager.print(
        `setting character ${character_id} varaible ${variable_name} to ${variable_value}`
    );
    const interaction = dialogueManager.character_interactions.get(character_id);
    interaction.active_variables.set(variable_name, variable_value);
}

export function GetCharacterVariable(
    character_id: string,
    variable_name: string
): string | number {
    const interaction = dialogueManager.character_interactions.get(character_id);
    const variable = interaction.active_variables.get(variable_name);
    dialogueManager.print(
        `getting character ${character_id} variable ${variable_name} with valye ${variable}`
    );
    return variable;
}
