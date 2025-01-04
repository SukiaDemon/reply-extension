import {defaultSettings} from "./settings";
import {customFocusColor as customFocusColorCSS} from "../css/css";
import {isReplyMode} from "../functions/reply";
import {waitFor} from "../functions/utils";
import constants from "../utils/constants";

export async function settingsPage() {

    await waitFor(() => !!PreferenceSubscreenList);

    let hideBackGroundColorPicker: boolean = true;
    let hideTextColorPicker: boolean = true;
    let hideCustomFocusColorPicker: boolean = true;

    PreferenceRegisterExtensionSetting({
        Identifier: "BCR",
        ButtonText: "BCR Settings",
        Image: undefined, // TODO: Need to find/create cool image
        load: PreferenceSubScreenBCRSettingsLoad,
        click: PreferenceSubScreenBCRSettingsClick,
        run: PreferenceSubScreenBCRSettingsRun,
        exit: PreferenceSubScreenBCRSettingsExit,
    });

    function PreferenceSubScreenBCRSettingsLoad() {
        //ReplyBoxBackgroundColor Input Field
        ElementCreateInput("InputReplyBoxBackgroundColor", "text", Player.ExtensionSettings.BCR.settings.replyBackgroundColor);
        //ReplyTextColor Input Field
        ElementCreateInput("InputReplyTextColor", "text", Player.ExtensionSettings.BCR.settings.replyTextColor);
        //CustomFocusColor Input field
        ElementCreateInput("InputCustomFocusColor", "text", Player.ExtensionSettings.BCR.settings.customFocusColor);

        hideBackGroundColorPicker = true;
        hideTextColorPicker = true;
        hideCustomFocusColorPicker = true;

    }

    function PreferenceSubScreenBCRSettingsClick() {
        if (MouseIn(1815, 75, 90, 90)) { //Exit Icon Click
            PreferenceSubScreenBCRSettingsExit();
        }

        if (MouseIn(1350, 75, 400, 90)) { //Open Source
            window.open("https://github.com/Arcsery/reply-extension/tree/gh-pages", "_blank");
        }

        if (MouseIn(1140, 215, 65, 65)) { //ReplyBoxBackgroundColor Icon Click
            hideTextColorPicker = true;
            hideCustomFocusColorPicker = true;
            ColorPickerHide();
            hideBackGroundColorPicker = !hideBackGroundColorPicker;
        }
        if (MouseIn(1140, 315, 65, 65)) { //ReplyTextColor Icon Click
            hideBackGroundColorPicker = true;
            hideCustomFocusColorPicker = true;
            ColorPickerHide();
            hideTextColorPicker = !hideTextColorPicker;
        }

        if (MouseIn(1140, 515, 65, 65)) { //ReplyTextColor Icon Click
            hideBackGroundColorPicker = true;
            hideTextColorPicker = true;
            ColorPickerHide();
            hideCustomFocusColorPicker = !hideCustomFocusColorPicker;
        }

        if (MouseIn(600, 715, 400, 90)) {
            Player.ExtensionSettings.BCR.settings.enableCustomFocusColor = defaultSettings.enableCustomFocusColor;
            ElementValue("InputReplyBoxBackgroundColor", defaultSettings.replyBackgroundColor)
            ElementValue("InputReplyTextColor", defaultSettings.replyTextColor)
            ElementValue("InputCustomFocusColor", defaultSettings.customFocusColor)
        }

        if (MouseIn(1000, 415, 64, 64)) {
            Player.ExtensionSettings.BCR.settings.enableCustomFocusColor = !Player.ExtensionSettings.BCR.settings.enableCustomFocusColor;
        }
    }

    function PreferenceSubScreenBCRSettingsRun() {
        DrawCharacter(Player, 50, 50, 0.9);
        DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png"); //Exit Icon

        DrawText("BC Reply Extension " + constants.MOD_VERSION, 1000, 130, "Black");
        DrawButton(1350, 75, 400, 90, "Open Source", "White"); //Open Source

        DrawText("Reply box background color: ", 630, 250, "Black", "Gray") //ReplyBoxBackgroundColor Label
        ElementPosition("InputReplyBoxBackgroundColor", 1000, 250, 250); //ReplyBoxBackgroundColor ColorPicker Position
        DrawButton(1140, 215, 65, 65, "", "White", "Icons/Color.png");  //ReplyBoxBackgroundColor Icon Position

        updateInputFieldTextColor("InputReplyBoxBackgroundColor")

        DrawText("Reply text color: ", 730, 350, "Black", "Gray") //ReplyTextColor Label
        ElementPosition("InputReplyTextColor", 1000, 350, 250); //ReplyTextColor ColorPicker Position
        DrawButton(1140, 315, 65, 65, "", "White", "Icons/Color.png");  //ReplyTextColor Icon Position

        updateInputFieldTextColor("InputReplyTextColor")

        addCheckBox([1000, 415, 64, 64], "Enable custom focus color", Player.ExtensionSettings.BCR.settings.enableCustomFocusColor);
        DrawText("Custom chat focus color: ", 660, 550, "Black", "Gray") //CustomFocusColor Label
        ElementPosition("InputCustomFocusColor", 1000, 550, 250); //CustomFocusColor ColorPicker Position

        DrawButton(1140, 515, 65, 65, "", "White", "Icons/Color.png");  //CustomFocusColor Icon Position

        updateInputFieldTextColor("InputCustomFocusColor")

        if (!hideBackGroundColorPicker) {
            ColorPickerDraw(1250, 185, 675, 800, document.getElementById("InputReplyBoxBackgroundColor") as HTMLInputElement);
        }

        if (!hideTextColorPicker) {
            ColorPickerDraw(1250, 185, 675, 800, document.getElementById("InputReplyTextColor") as HTMLInputElement);
        }

        if (!hideCustomFocusColorPicker) {
            ColorPickerDraw(1250, 185, 675, 800, document.getElementById("InputCustomFocusColor") as HTMLInputElement);
        }


        DrawButton(600, 715, 400, 90, "Restore to default", "White"); //Restore to default

    }

    function PreferenceSubScreenBCRSettingsExit() {
        const ReplyBoxBackgroundColor = ElementValue("InputReplyBoxBackgroundColor");
        const ReplyTextColor = ElementValue("InputReplyTextColor");
        const customFocusColor = ElementValue("InputCustomFocusColor");
        updateChatReplyBoxColors(ReplyBoxBackgroundColor, ReplyTextColor, customFocusColor);
        if (!Player.ExtensionSettings.BCR.settings.enableCustomFocusColor) {
            customFocusColorCSS.disable();
        }
        ElementRemove("InputReplyBoxBackgroundColor");
        ElementRemove("InputReplyTextColor");
        ElementRemove("InputCustomFocusColor");
        ServerPlayerExtensionSettingsSync("BCR")
        PreferenceSubscreenExtensionsClear();
    }
}

function updateChatReplyBoxColors(newBackgroundColor: string, newTextColor: string, customFocusColor: string) {
    if (CommonIsColor(newBackgroundColor) && CommonIsColor(newTextColor) && CommonIsColor(customFocusColor)) {
        document.documentElement.style.setProperty('--reply-background-color', newBackgroundColor);
        Player.ExtensionSettings.BCR.settings.replyBackgroundColor = newBackgroundColor;
        document.documentElement.style.setProperty('--reply-text-color', newTextColor);
        Player.ExtensionSettings.BCR.settings.replyTextColor = newTextColor;

        if (Player.ExtensionSettings.BCR.settings.enableCustomFocusColor) {
            Player.ExtensionSettings.BCR.settings.customFocusColor = customFocusColor
            if (isReplyMode) {
                customFocusColorCSS.enable(customFocusColor)
            }
        }
    }
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

function addCheckBox(cords: [number, number, number, number], label: string, enabled: boolean) {
    let checkImage = enabled ? "Icons/Checked.png" : "";
    DrawButton(...cords, "", "White", checkImage)
    DrawText(label, cords[0] - 250, cords[1] + 33, "Black", "Gray")
}



