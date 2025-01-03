import constants from "../utils/constants";

export interface Settings {
    replyBackgroundColor: string,
    replyTextColor: string,
    enableCustomFocusColor: boolean,
    customFocusColor: string,
}

export interface BCRPlayerInfos {
    settings: Settings
}

export const defaultSettings: Settings = {
    replyBackgroundColor: "#D3D3D3",
    replyTextColor: "#000000",
    enableCustomFocusColor: true,
    customFocusColor: "#FF0000"
}

let BCRPlayerInfos: BCRPlayerInfos = {
    settings: {...defaultSettings},
}

export function settings() {
    if (!Player.ExtensionSettings.BCR) {
        Player.ExtensionSettings.BCR = BCRPlayerInfos;
    }

    // @ts-ignore
    window.BCR_VERSION = constants.MOD_VERSION;
}