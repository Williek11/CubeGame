const menu = {
    back: {
        selectToSelector: ()=>{const back = $D[1]("back");back.removeEventListener("click",menu.back.selectToSelector);back.style="display:none";$D[1]("selector").style.display = "none";$D[1]("select").style.display = "block";},
        selectToLevel: ()=>{const back = $D[1]("back");back.removeEventListener("click",menu.back.selectToLevel);back.addEventListener("click",menu.back.selectToSelector);$D[1]("menu").style.display = "block";$D[1]("selector").style.display = "block";$D[1]("levelSelector").style = "display:none";},
        typeOfLevelToCustomizedLevels: ()=>{
            const back = $D[1]("back");
        back.removeEventListener("click",menu.back.typeOfLevelToCustomizedLevels);
        back.addEventListener("click",menu.back.selectToSelector);
        $D[1]("typeOfLevel").style="display:block";
        $D[1]("customizedLevels").style = "display:none";
        },

        selectToSettings: ()=>{const back = $D[1]("back");back.style = "display:none";back.removeEventListener("click",menu.back.selectToSettings);$D[1]("select").style.display = "block";$D[1]("settings").style.display = "none";},
        settingsToCustomize: ()=>{const back = $D[1]("back");back.addEventListener("click",menu.back.selectToSettings);back.removeEventListener("click",menu.back.settingsToCustomize);$D[1]("settings_menu").style="display:block";$D[1]("customize_menu").style = "display:none";},

        /* Unused
        customizeToCustomizeMenu: ()=>{const back = $D[1]("back");back.addEventListener("click",menu.back.settingsToCustomize);back.removeEventListener("click",menu.back.customizeToCustomizeMenu);$D[1]("customize_menu").style="display:block";$D[1]("customization").style = "display:none";},
        customizeMenuToMenuCustomization: ()=>{menu.templateRemove("customize_menu2","customizeMenuToMenuCustomization","customizeToCustomizeMenu")} */
    },
    selectToSelector: ()=>{
        const back = $D[1]("back");
        back.style = "display:block";
        back.addEventListener("click",menu.back.selectToSelector)
        $D[1]("select").style.display = "none";
        $D[1]("selector").style.display = "block";
    },
    typeOfLevelToCustomizedLevels: ()=>{
        const back = $D[1]("back");
        back.removeEventListener("click",menu.back.selectToSelector);
        back.addEventListener("click",menu.back.typeOfLevelToCustomizedLevels);
        $D[1]("typeOfLevel").style="display:none";
        $D[1]("customizedLevels").style = "display:block";
    },
    selectToLevel: ()=>{
        const back = $D[1]("back");
        back.removeEventListener("click",menu.back.selectToSelector);
        back.addEventListener("click",menu.back.selectToLevel)
        $D[1]("menu").style.display = "none";
        $D[1]("selector").style.display = "none";
        $D[1]("levelSelector").style = "display:block";
    },
    levels: ()=>{
        const levels = $D[1]("levels");
        levels.style="display:block;animation:appear 1 750ms";
    },

    selectToSettings: ()=>{
        const back = $D[1]("back");
        back.style = "display:block";
        back.addEventListener("click",menu.back.selectToSettings)
        $D[1]("select").style.display = "none";
        $D[1]("settings").style.display = "block";
    },
    settingsToCustomize: ()=>{
        const back = $D[1]("back");
        back.removeEventListener("click",menu.back.selectToSettings);
        back.addEventListener("click",menu.back.settingsToCustomize);
        $D[1]("settings_menu").style="display:none";
        $D[1]("customize_menu").style = "display:block";
    },
    customizeToCustomizeMenu: ()=>{
        const back = $D[1]("back");
        back.removeEventListener("click",menu.back.settingsToCustomize);
        back.addEventListener("click",menu.back.customizeToCustomizeMenu);
        $D[1]("customize_menu").style="display:none";
        $D[1]("customization").style = "display:block";
    },

    /* Unused 
    templateCustomize: (show, remove, add)=>{
        const back = $D[1]("back");
        back.removeEventListener("click", menu.back[remove])
        back.addEventListener("click", menu.back[add])
        $D[1](show).style = "display:block"
        $D[1]("customization").style = "display:none"
    },
    templateRemove: (hide, remove, add)=>{
        const back = $D[1]("back");
        back.removeEventListener("click", menu.back[remove])
        back.addEventListener("click", menu.back[add])
        $D[1]("customization").style = "display:block"
        $D[1](hide).style = "display:none"
    },
    customizeMenuToMenuCustomization: ()=>{
        menu.templateCustomize("customize_menu2","customizeToCustomizeMenu", "customizeMenuToMenuCustomization")
    } */
};