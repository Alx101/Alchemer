import CharacterInteraction from "./characterInteraction";
import characters from "../dialogues";
import { randomInteger } from "../../../utils";
import {
    BranchHandler,
    InteractionHandler,
    NodeHandler,
    SetHandler,
    TextHandler,
} from "./interactionHandlers";

export default class DialogueManager {
    character_interactions: Map<string, CharacterInteraction>;
    handlers: Map<string, InteractionHandler>;
    debug = false;

    print(msg: string) {
        if (this.debug) {
            console.log(`Dialogue manager: ${msg}`);
        }
    }

    constructor(debug_active = false) {
        this.character_interactions = new Map();
        this.debug = debug_active;
        this.print("DialogueManager initialized");

        // Set up interaction handlers
        this.handlers = new Map([
            ["Text", TextHandler],
            ["Node", NodeHandler],
            ["Branch", BranchHandler],
            ["Set", SetHandler],
        ]);
    }

    InitCharacter(character_name: string, character_id: string): boolean {
        this.print(
            `Initializing character ${character_id} as ${character_name}`
        );
        if (
            !Object.keys(characters).find(
                (character) => character == character_name
            )
        ) {
            this.print(`No character with name ${character_name}`);
            return false;
        }
        if (!this.character_interactions.get(character_id)) {
            this.character_interactions.set(
                character_id,
                new CharacterInteraction(character_id, character_name)
            );
            this.character_interactions
                .get(character_id)
                .load_tree(
                    characters[character_name][
                    randomInteger(0, characters[character_name].length - 1)
                    ]
                );
        }
        return true;
    }

    InteractWithCharacter(
        character_id: string,
        interaction_type: string,
        force_node: false | string = false
    ): string | false {
        this.print("InteractWith called");
        if (!this.character_interactions.get(character_id)) {
            this.print(
                `Character with id ${character_id} has not been initialized!`
            );
            return false;
        }
        return this.StepCharacterDialogue(
            character_id,
            interaction_type,
            force_node
        );
    }

    StepCharacterDialogue(
        character_id: string,
        entrypoint = "interact",
        force_node: false | string = false
    ): string | false {
        const interaction = this.character_interactions.get(character_id);
        this.print(`Character dialogue stepped: ${character_id}`);
        this.print(`Current interaction: ${interaction}`);

        if (interaction.current_node && force_node !== "force") {
            this.print(`Current node: ${interaction.current_node}`);
            if (interaction.current_node.next || force_node) {
                interaction.current_node = interaction.nodes.get(
                    interaction.current_node.next || force_node || ""
                );
            }

            const handler = this.handlers.get(interaction.current_node.type);
            if (!handler) {
                this.print(
                    `No handler found for node of type ${interaction.current_node.type}`
                );
                return false;
            }

            return handler(interaction, this, entrypoint);
        } else {
            this.print("Finding entrypoint " + entrypoint);
            interaction.current_node = Array.from(
                interaction.nodes.values()
            ).find((node) => node.type == "Node" && node.name == entrypoint);
            if (!interaction.current_node) {
                this.print(
                    `Couldn't find an entry node with interaction of type ${entrypoint}`
                );
                return false;
            }
            return this.StepCharacterDialogue(character_id, entrypoint);
        }
    }

    SetCharacterVariable(
        character_id: string,
        variable_name: string,
        variable_value: string
    ): void {
        this.print(
            `setting character ${character_id} varaible ${variable_name} to ${variable_value}`
        );
        const interaction = this.character_interactions.get(character_id);
        interaction.active_variables.set(variable_name, variable_value);
    }
}
