import commands from "functions/commands";
import reply from "functions/reply";
import {loadCss} from "./css/css";
import {settingsPage} from "./settings/settingsPage";
import {settings} from "./settings/settings";
import {waitFor} from "./functions/utils";


BCAStart().catch(
    (error) => {
        console.log(error)
    }
)

async function BCAStart() {

    // @ts-ignore
    await waitFor(() => ServerIsConnected && ServerSocket);

    await waitFor(() => !!!!Player?.AccountName);

    // @ts-ignore
    if (!window.BCA_VERSION) {
        settings();
        await settingsPage()
        loadCss();
        commands();
        reply();
        console.log("BCA loaded!")
    } else {
        console.log("BCA is already loaded!")
    }
}
