import bcModSdk from "bondage-club-mod-sdk";
import constants from "./utils/constants";

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


