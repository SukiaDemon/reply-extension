import bcModSdk from "bondage-club-mod-sdk";

const MOD_NAME = "BCA";
const MOD_FULL_NAME = "Bondage Club Additions";
const MOD_VERSION = "0.1.0";
const MOD_REPOSITORY = "";

export let mod = null;

// @ts-ignore
if (!window.BCA_VERSION) {
    mod = bcModSdk.registerMod({
        name: MOD_NAME,
        fullName: MOD_FULL_NAME,
        version: MOD_VERSION,
        repository: MOD_REPOSITORY,
    });
}


