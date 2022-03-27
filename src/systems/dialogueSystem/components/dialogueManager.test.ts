import DialogueManager from "./dialogueManager";
import { Dialogue } from "../dialogues";

jest.mock("../dialogues", () => {
    const originalModule = jest.requireActual("../dialogues");

    return {
        __esModule: true,
        ...originalModule,
        default: {
            char: [
                [
                    {
                        type: "Node",
                        id: "1220ec4e-0a90-4194-8b89-9d937fafdb38",
                        actor: "char",
                        name: "interact",
                        next: "ce5f03e4-3769-4a17-bf42-896d952f5fe2",
                    },
                    {
                        type: "Text",
                        id: "ce5f03e4-3769-4a17-bf42-896d952f5fe2",
                        actor: "char",
                        name: "I've got some text for ya",
                        next: null,
                    },
                ] as Dialogue,
            ],
            setsvalue: [
                [
                    {
                        type: "Node",
                        id: "1220ec4e-0a90-4194-8b89-9d937fafdb38",
                        actor: "setsvalue",
                        name: "interact",
                        next: "c24390d0-5da1-4d16-91bd-db9037f3e3ae",
                    },
                    {
                        type: "Set",
                        id: "c24390d0-5da1-4d16-91bd-db9037f3e3ae",
                        variable: "change_gold",
                        value: "20",
                        next: "ec55f1fd-6765-4b97-9623-72939852db9b",
                    },
                    {
                        type: "Text",
                        id: "ec55f1fd-6765-4b97-9623-72939852db9b",
                        actor: "setsvalue",
                        name: "Final text here",
                        next: null,
                    },
                ],
            ],
            branches: [
                [
                    {
                        type: "Node",
                        id: "1220ec4e-0a90-4194-8b89-9d937fafdb38",
                        actor: "branches",
                        name: "dobranch",
                        next: "c24390d0-5da1-4d16-91bd-db9037f3e3ae",
                    },
                    {
                        type: "Branch",
                        id: "c24390d0-5da1-4d16-91bd-db9037f3e3ae",
                        variable: "branch_variable",
                        branches: {
                            right_choice:
                                "ec55f1fd-6765-4b97-9623-72939852db9b",
                            _default: "c3fdb217-ee0d-491b-aa5a-60b63f33887e",
                        },
                    },
                    {
                        type: "Text",
                        id: "ec55f1fd-6765-4b97-9623-72939852db9b",
                        actor: "branches",
                        name: "Right choice hit",
                        next: null,
                    },
                    {
                        type: "Text",
                        id: "c3fdb217-ee0d-491b-aa5a-60b63f33887e",
                        actor: "branches",
                        name: "Default choice hit",
                        next: null,
                    },
                ],
            ],
            broken: [
                [
                    {
                        type: "Node",
                        id: "1220ec4e-0a90-4194-8b89-9d937fafdb38",
                        actor: "broken",
                        name: "interact",
                        next: "ce5f03e4-3769-4a17-bf42-896d952f5fe2",
                    },
                    {
                        type: "Unknown",
                        id: "ce5f03e4-3769-4a17-bf42-896d952f5fe2",
                        actor: "broken",
                        name: "It stops here",
                        next: null,
                    },
                ],
            ],
        },
    };
});

test("Sets debug mode", () => {
    let mgr = new DialogueManager();
    expect(mgr.debug).toBe(false);

    mgr = new DialogueManager(true);
    expect(mgr.debug).toBe(true);
});

test("Character can be initialized", () => {
    const mgr = new DialogueManager();
    expect(mgr.InitCharacter("char", "1")).toBe(true);
    expect(mgr.character_interactions.has("1")).toBe(true);
    const character = mgr.character_interactions.get("1");
    expect(character.current_node).toBeNull;
    expect(character.nodes.size).toBe(2);
});

test("Character with unknown name", () => {
    const mgr = new DialogueManager();
    expect(mgr.InteractWithCharacter("dontexist", "1")).toBe(false);
});

test("StepCharacterDialogue without initializing character", () => {
    const mgr = new DialogueManager();
    expect(() => mgr.StepCharacterDialogue("123")).toThrowError();
});

test("InteractWithCharacter without initializing character", () => {
    const mgr = new DialogueManager();
    expect(mgr.InteractWithCharacter("123", "interact")).toBe(false);
});

test("StepCharacterDialogue basic text", () => {
    const mgr = new DialogueManager();
    mgr.InitCharacter("char", "1");
    expect(mgr.StepCharacterDialogue("1", "interact")).toBe("talk");

    const interaction = mgr.character_interactions.get("1");
    expect(interaction.current_node.id).toBe(
        "ce5f03e4-3769-4a17-bf42-896d952f5fe2"
    );
    expect(interaction.current_node.type).toBe("Text");

    // Interaction should be re-played if no next node is set
    expect(mgr.StepCharacterDialogue("1", "interact")).toBe("talk");
    expect(interaction.current_node.id).toBe(
        "ce5f03e4-3769-4a17-bf42-896d952f5fe2"
    );
});

test("StepCharacterDialogue setting value", () => {
    const mgr = new DialogueManager();
    mgr.InitCharacter("setsvalue", "1");
    expect(mgr.StepCharacterDialogue("1", "interact")).toBe(
        "variable_set:change_gold"
    );
    const interaction = mgr.character_interactions.get("1");
    expect(interaction.current_node.id).toBe(
        "c24390d0-5da1-4d16-91bd-db9037f3e3ae"
    );

    // Step dialogue again to confirm we've caught the variable_set message
    expect(mgr.StepCharacterDialogue("1", "interact")).toBe("talk");
    expect(interaction.current_node.id).toBe(
        "ec55f1fd-6765-4b97-9623-72939852db9b"
    );
    expect(interaction.current_node.type).toBe("Text");
    expect(interaction.active_variables.size).toBe(1);
    expect(interaction.active_variables.get("change_gold")).toBe("20");
});

test("StepCharacterDialogue branching with no value", () => {
    const mgr = new DialogueManager();
    mgr.InitCharacter("branches", "1");
    expect(mgr.StepCharacterDialogue("1", "dobranch")).toBe(
        "variable_required:branch_variable"
    );

    // Stays on branch until value is set
    const interaction = mgr.character_interactions.get("1");
    expect(interaction.current_node.id).toBe(
        "c24390d0-5da1-4d16-91bd-db9037f3e3ae"
    );
    expect(interaction.current_node.type).toBe("Branch");
});

test("StepCharacterDialogue branching with default (incorrect) value", () => {
    const mgr = new DialogueManager();
    mgr.InitCharacter("branches", "1");
    const interaction = mgr.character_interactions.get("1");
    interaction.active_variables.set("branch_variable", "incorrect");
    expect(mgr.StepCharacterDialogue("1", "dobranch")).toBe("talk");

    // Default choice selected here
    expect(interaction.current_node.id).toBe(
        "c3fdb217-ee0d-491b-aa5a-60b63f33887e"
    );
    expect(interaction.current_node.type).toBe("Text");
    expect(interaction.current_node.name).toBe("Default choice hit");
});

test("StepCharacterDialogue branching based on set value", () => {
    const mgr = new DialogueManager();
    mgr.InitCharacter("branches", "1");
    const interaction = mgr.character_interactions.get("1");
    interaction.active_variables.set("branch_variable", "right_choice");
    expect(mgr.StepCharacterDialogue("1", "dobranch")).toBe("talk");

    expect(interaction.current_node.id).toBe(
        "ec55f1fd-6765-4b97-9623-72939852db9b"
    );
    expect(interaction.current_node.type).toBe("Text");
    expect(interaction.current_node.name).toBe("Right choice hit");
});

test("StepCharacterDialogue with unknown node type", () => {
    const mgr = new DialogueManager();
    mgr.InitCharacter("broken", "1");
    const interaction = mgr.character_interactions.get("1");
    expect(mgr.StepCharacterDialogue("1", "interact")).toBe(false);

    expect(interaction.current_node.id).toBe(
        "ce5f03e4-3769-4a17-bf42-896d952f5fe2"
    );
    expect(interaction.current_node.type).toBe("Unknown");
    expect(mgr.StepCharacterDialogue("1", "interact")).toBe(false);
    expect(interaction.current_node.id).toBe(
        "ce5f03e4-3769-4a17-bf42-896d952f5fe2"
    );
});
