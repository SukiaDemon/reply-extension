import commands from "functions/commands";
import reply from "functions/reply";
import {loadCss} from "./css/css";
import {settingsPage} from "./settings/settingsPage";
import {settings} from "./settings/settings";

settings();
settingsPage()
loadCss();
commands();
reply();
