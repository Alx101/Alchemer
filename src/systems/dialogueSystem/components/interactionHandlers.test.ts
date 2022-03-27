import DialogueManager from "../components/dialogueManager";
import CharacterInteraction from "../components/characterInteraction";
import {
    TextHandler,
    NodeHandler,
    BranchHandler,
    SetHandler,
} from "./interactionHandlers";

jest.mock("../components/dialogueManager");
const DialogueManagerMock = DialogueManager as jest.MockedClass<
    typeof DialogueManager
>;
jest.mock("../components/characterInteraction");

describe("Text handler", () => {
    test("Normal text", () => {
        const interaction = new CharacterInteraction("1", "buddy");
        interaction.current_node = {
            id: "1",
            type: "Text",
        };
        const manager = new DialogueManagerMock();
        expect(TextHandler(interaction, manager, "interact")).toBe("talk");
    });

    test("Choices", () => {
        const interaction = new CharacterInteraction("1", "buddy");
        const manager = new DialogueManagerMock();
        interaction.current_node = {
            id: "1",
            type: "Text",
            choices: ["A choice", "Another choice"],
        };
        expect(TextHandler(interaction, manager, "interact")).toBe("choices");
    });
});

describe("Node handler", () => {
    test("Unknown node", () => {
        const interaction = new CharacterInteraction("1", "buddy");
        interaction.character_id = "123";
        interaction.current_node = {
            type: "Node",
            id: "12",
            name: "unknown",
        };
        const manager = new DialogueManagerMock();
        NodeHandler(interaction, manager, "interact");
        expect(
            DialogueManagerMock.prototype.StepCharacterDialogue.mock.calls
                .length
        ).toBe(1);
        expect(
            DialogueManagerMock.prototype.StepCharacterDialogue.mock.calls[0][0]
        ).toBe("123");
        expect(
            DialogueManagerMock.prototype.StepCharacterDialogue.mock.calls[0][1]
        ).toBe("interact");
    });

    test("Leave node", () => {
        const interaction = new CharacterInteraction("1", "buddy");
        interaction.current_node = {
            type: "Node",
            id: "12",
            name: "leave",
        };
        const manager = new DialogueManagerMock();
        expect(NodeHandler(interaction, manager, "interact")).toBe("leave");
        expect(
            DialogueManagerMock.prototype.StepCharacterDialogue.mock.calls
                .length
        ).toBe(0);
    });
});

test("Branch handler", () => {
    const interaction = new CharacterInteraction("1", "buddy");
    interaction.active_variables = new Map();
    interaction.current_node = {
        type: "Node",
        id: "12",
        name: "leave",
        variable: "somevar",
        branches: { _default: "1", choice_b: "2" },
    };
    const manager = new DialogueManagerMock();
    expect(BranchHandler(interaction, manager, "interact")).toBe(
        "variable_required:somevar"
    );
    expect(
        DialogueManagerMock.prototype.StepCharacterDialogue.mock.calls.length
    ).toBe(0);

    interaction.active_variables = new Map([["somevar", "choice"]]);
    BranchHandler(interaction, manager, "interact");
    expect(
        DialogueManagerMock.prototype.StepCharacterDialogue.mock.calls.length
    ).toBe(1);
    expect(
        DialogueManagerMock.prototype.StepCharacterDialogue.mock.calls[0][1]
    ).toBe("interact");
    expect(
        DialogueManagerMock.prototype.StepCharacterDialogue.mock.calls[0][2]
    ).toBe("1");

    interaction.active_variables = new Map([["somevar", "choice_b"]]);
    BranchHandler(interaction, manager, "interact");
    expect(
        DialogueManagerMock.prototype.StepCharacterDialogue.mock.calls.length
    ).toBe(2);
    expect(
        DialogueManagerMock.prototype.StepCharacterDialogue.mock.calls[1][1]
    ).toBe("interact");
    expect(
        DialogueManagerMock.prototype.StepCharacterDialogue.mock.calls[1][2]
    ).toBe("2");
});

test("Set handler", () => {
    const interaction = new CharacterInteraction("1", "buddy");
    interaction.active_variables = new Map();
    interaction.current_node = {
        type: "Set",
        id: "12",
        name: "leave",
        variable: "somevar",
        value: "50",
    };
    const manager = new DialogueManagerMock();
    expect(SetHandler(interaction, manager, "interact")).toBe(
        "variable_set:somevar"
    );
    expect(
        DialogueManagerMock.prototype.StepCharacterDialogue.mock.calls.length
    ).toBe(0);
});
