import {defaultSettings} from "./settings";

export function settingsPage() {

    let hideBackGroundColorPicker: boolean = true;
    let hideTextColorPicker: boolean = true;

    PreferenceRegisterExtensionSetting({
        Identifier: "BCA",
        ButtonText: "BCA Settings",
        Image: undefined, // TODO: Need to find/create cool image
        load: PreferenceSubScreenBCASettingsLoad,
        click: PreferenceSubScreenBCASettingsClick,
        run: PreferenceSubScreenBCASettingsRun,
        exit: PreferenceSubScreenBCASettingsExit,
    });

    function PreferenceSubScreenBCASettingsLoad() {
        //ReplyBoxBackgroundColor Input Field
        ElementCreateInput("InputReplyBoxBackgroundColor", "text", Player.ExtensionSettings.BCA.settings.replyBackgroundColor);
        //ReplyTextColor Input Field
        ElementCreateInput("InputReplyTextColor", "text", Player.ExtensionSettings.BCA.settings.replyTextColor);
        hideBackGroundColorPicker = true;
        hideTextColorPicker = true;
    }

    function PreferenceSubScreenBCASettingsClick() {
        if (MouseIn(1815, 75, 90, 90)) { //Exit Icon Click
            PreferenceSubScreenBCASettingsExit();
        }
        if (MouseIn(1140, 215, 65, 65)) { //ReplyBoxBackgroundColor Icon Click
            hideTextColorPicker = true;
            ColorPickerHide();
            hideBackGroundColorPicker = !hideBackGroundColorPicker
        }
        if (MouseIn(1140, 315, 65, 65)) { //ReplyTextColor Icon Click
            hideBackGroundColorPicker = true;
            ColorPickerHide();
            hideTextColorPicker = !hideTextColorPicker
        }
        if (MouseIn(600, 715, 300, 100)) {
            ElementValue("InputReplyBoxBackgroundColor", defaultSettings.replyBackgroundColor)
            ElementValue("InputReplyTextColor", defaultSettings.replyTextColor)
        }
    }

    function PreferenceSubScreenBCASettingsRun() {
        DrawCharacter(Player, 50, 50, 0.9);
        DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png"); //Exit Icon

        DrawText("Reply box background color: ", 630, 250, "Black", "Gray") //ReplyBoxBackgroundColor Label
        ElementPosition("InputReplyBoxBackgroundColor", 1000, 250, 250); //ReplyBoxBackgroundColor ColorPicker Position
        DrawButton(1140, 215, 65, 65, "", "White", "Icons/Color.png");  //ReplyBoxBackgroundColor Icon Position

        updateInputFieldTextColor("InputReplyBoxBackgroundColor")

        DrawText("Reply text color: ", 730, 350, "Black", "Gray") //ReplyTextColor Label
        ElementPosition("InputReplyTextColor", 1000, 350, 250); //ReplyTextColor ColorPicker Position
        DrawButton(1140, 315, 65, 65, "", "White", "Icons/Color.png");  //ReplyTextColor Icon Position

        updateInputFieldTextColor("InputReplyTextColor")

        if (hideBackGroundColorPicker) {
            if (hideTextColorPicker) {
                ColorPickerHide();
            }
        } else {
            ColorPickerDraw(1250, 185, 675, 800, (document.getElementById("InputReplyBoxBackgroundColor") as HTMLInputElement));
        }

        if (hideTextColorPicker) {
            if (hideBackGroundColorPicker) {
                ColorPickerHide();
            }
        } else {
            ColorPickerDraw(1250, 185, 675, 800, (document.getElementById("InputReplyTextColor") as HTMLInputElement));
        }

        DrawButton(600, 715, 300, 100, "Restore to default", "White");

    }

    function PreferenceSubScreenBCASettingsExit() {
        const ReplyBoxBackgroundColor = ElementValue("InputReplyBoxBackgroundColor");
        const ReplyTextColor = ElementValue("InputReplyTextColor");
        if (CommonIsColor(ReplyBoxBackgroundColor)) {
            updateChatReplyBoxColors(ReplyBoxBackgroundColor, ReplyTextColor);
        }
        ElementRemove("InputReplyBoxBackgroundColor");
        ElementRemove("InputReplyTextColor");
        PreferenceSubscreenExtensionsClear();
    }
}

function updateChatReplyBoxColors(newBackgroundColor: string, newTextColor: string) {
    document.documentElement.style.setProperty('--reply-background-color', newBackgroundColor);
    Player.ExtensionSettings.BCA.settings.replyBackgroundColor = newBackgroundColor;
    document.documentElement.style.setProperty('--reply-text-color', newTextColor);
    Player.ExtensionSettings.BCA.settings.replyTextColor = newTextColor;
}

function updateInputFieldTextColor(id: string) {
    let TextColorCSS = "";
    if (CommonIsColor(ElementValue(id))) TextColorCSS = ElementValue(id);
    else TextColorCSS = Player.LabelColor;
    document.getElementById(id).style.color = TextColorCSS;
    let TextColorHSV = ColorPickerCSSToHSV(TextColorCSS);
    if (TextColorHSV.V > 0.4) {
        document.getElementById(id).style.backgroundColor = "#111111";
    } else {
        document.getElementById(id).style.backgroundColor = "#FFFFFF";
    }
}



