import { Dialogue, DialogueNode } from "../dialogues";

export default class CharacterInteraction {
    character_id: string;
    character_name: string;
    current_node: DialogueNode;

    active_variables: Map<string, string | number> = new Map();

    nodes: Map<string, DialogueNode> = new Map();

    constructor(id: string, name: string) {
        this.character_id = id;
        this.character_name = name;
    }

    load_tree(tree: Dialogue) {
        this.nodes = new Map();
        tree.map((entry) => {
            this.nodes.set(entry.id, entry as DialogueNode);
        });
        console.log(this.nodes);
    }
}
