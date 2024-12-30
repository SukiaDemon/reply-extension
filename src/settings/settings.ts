export interface Settings {
    replyBackgroundColor: string,
    replyTextColor: string,
    enableCustomFocusColor: boolean,
    customFocusColor: string,
}

export interface BCAPlayerInfos {
    settings: Settings
}

export const defaultSettings: Settings = {
    replyBackgroundColor: "#D3D3D3",
    replyTextColor: "#000000",
    enableCustomFocusColor: true,
    customFocusColor: "red"
}

let BCAPlayerInfos: BCAPlayerInfos = {
    settings: {...defaultSettings},
}

export function settings() {
    if (!Player.ExtensionSettings.BCA) {
        Player.ExtensionSettings.BCA = BCAPlayerInfos;
    }
}