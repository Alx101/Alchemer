# Alchemer JS helpers

This is a typescript companion project for a game project built in Construct 2. It provides system helpers for parsing and utilizing external tools, resources and offloads some logic work from the more cumbersome visual coding editor inside Construct 2. Most systems are re-usable and engine-agnostic with interfacing layers to allow Construct 2 to call functions provided by this project. It's built with flexibility in mind, meaning additional interface-layers can easily be built to support other game engines, or the systems themselves can be used standalone in code-based projects.


## Current systems

### Dialogue system

A dialogue state machine, used to manage NPC interactions created in [talkit](https://github.com/ajboni/Talkit). It makes certain assumptions on how basic Nodes are used, and has a specified set of trigger-nodes. Still a work-in-progress.