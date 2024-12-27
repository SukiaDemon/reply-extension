export interface Settings {
    replyBackgroundColor: string,
    replyTextColor: string
}

export interface BCAPlayerInfos {
    settings: Settings
    targetUser: string,
    repliedMessage: string
}

export const defaultSettings: Settings = {
    replyBackgroundColor: "#D3D3D3",
    replyTextColor: "#000000"
}

let BCAPlayerInfos: BCAPlayerInfos = {
    settings: defaultSettings,
    targetUser: "",
    repliedMessage: ""
}

export function settings() {
    if (!Player.ExtensionSettings.BCA) {
        Player.ExtensionSettings.BCA = BCAPlayerInfos;
    }
}