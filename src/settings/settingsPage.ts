export function settingsPage() {

    let hideBackGroundColorPicker: boolean = true;

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
        //ChatBoxBackgroundColor Input Field
        ElementCreateInput("InputReplyBoxBackgroundColor", "text", Player.ExtensionSettings.BCA.settings.replyBackgroundColor);
        hideBackGroundColorPicker = true;
    }

    function PreferenceSubScreenBCASettingsClick() {
        if (MouseIn(1815, 75, 90, 90)) { //Exit Icon Click
            PreferenceSubScreenBCASettingsExit();
        }
        if (MouseIn(1140, 215, 65, 65)) { //ChatBoxBackgroundColor Icon Click
            hideBackGroundColorPicker = !hideBackGroundColorPicker
        }
    }

    function PreferenceSubScreenBCASettingsRun() {
        DrawCharacter(Player, 50, 50, 0.9);
        DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png"); //Exit Icon
        DrawText("Reply box background color: ", 630, 250, "Black", "Gray") //ReplyBoxBackgroundColor Label
        ElementPosition("InputReplyBoxBackgroundColor", 1000, 250, 250); //ReplyBoxBackgroundColor ColorPicker Position
        DrawButton(1140, 215, 65, 65, "", "White", "Icons/Color.png");  //ReplyBoxBackgroundColor Icon Position

        if (hideBackGroundColorPicker) {
            ColorPickerHide();
        } else {
            ColorPickerDraw(1250, 185, 675, 800, (document.getElementById("InputReplyBoxBackgroundColor") as HTMLInputElement));
        }

    }

    function PreferenceSubScreenBCASettingsExit() {
        const ReplyBoxBackgroundColor = ElementValue("InputReplyBoxBackgroundColor");
        if (CommonIsColor(ReplyBoxBackgroundColor)) {
            updateChatReplyBoxColors(ReplyBoxBackgroundColor, ReplyBoxBackgroundColor);
        }
        ElementRemove("InputReplyBoxBackgroundColor");
        PreferenceSubscreenExtensionsClear();
    }
}

function updateChatReplyBoxColors(newBackgroundColor: string, newTextColor: string) {
    document.documentElement.style.setProperty('--reply-background-color', newBackgroundColor);
    Player.ExtensionSettings.BCA.settings.replyBackgroundColor = newBackgroundColor;
    //document.documentElement.style.setProperty('--reply-text-color', newTextColor);
}



