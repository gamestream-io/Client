import Menu from "./Menu";

import file from './menus/file';
import edit from './menus/edit';

export default function initMenu(): { [name: string]: Menu } {
    return {
        File: file,
        Edit: edit
    }
}
