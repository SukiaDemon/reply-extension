import bcModSdk from "bondage-club-mod-sdk";
import constants from "./utils/constants";

/*const MOD_NAME = "BCA";
const MOD_FULL_NAME = "Bondage Club Additions";
const MOD_VERSION = "0.1.0";
const MOD_REPOSITORY = "";*/

export let mod = null;

// @ts-ignore
if (!window.BCR_VERSION) {
    mod = bcModSdk.registerMod({
        name: constants.MOD_NAME,
        fullName: constants.MOD_FULL_NAME,
        version: constants.MOD_VERSION,
        repository: constants.MOD_REPOSITORY,
    });
}


