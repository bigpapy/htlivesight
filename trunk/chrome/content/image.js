htlivesight.constants.IMG_PATH = "chrome://htlivesight/content/img/";htlivesight.Image = {		  htlivesight: htlivesight.constants.IMG_PATH + "foxball_32.png",
  live: {
    on: htlivesight.constants.IMG_PATH + "wboxshade1.png",
    off: htlivesight.constants.IMG_PATH + "wboxopen1.png"
  },  
  window: {
    close: {
      on: htlivesight.constants.IMG_PATH + "wclose1.png",
      off: htlivesight.constants.IMG_PATH + "wclose0.png"
    },
    shade: {
      on: htlivesight.constants.IMG_PATH + "wshade1.png",
      off: htlivesight.constants.IMG_PATH + "wshade0.png"
    },
    minimize: {
      on: htlivesight.constants.IMG_PATH + "wmin1.png",
      off: htlivesight.constants.IMG_PATH + "wmin0.png"
    },
    maximize: {
      on: htlivesight.constants.IMG_PATH + "wmax1.png",
      off: htlivesight.constants.IMG_PATH + "wmax0.png"
    },      //added by bigpapy: icon sound on/off    sound: {        on: htlivesight.constants.IMG_PATH + "sound_on.gif",        off: htlivesight.constants.IMG_PATH + "sound_off.gif"      },   // end adding by bigpapy //added by bigpapy: icons link to match page    link: {        on: htlivesight.constants.IMG_PATH + "toHT_on.png",        off: htlivesight.constants.IMG_PATH + "toHT_off.png"      },   // end adding by bigpapy         
    info: {
      on: htlivesight.constants.IMG_PATH + "info1.png",
      off: htlivesight.constants.IMG_PATH + "info0.png"
    },
    up: {
      on: htlivesight.constants.IMG_PATH + "up1.png",
      off: htlivesight.constants.IMG_PATH + "up0.png"
    },
    down: {
      on: htlivesight.constants.IMG_PATH + "down1.png",
      off: htlivesight.constants.IMG_PATH + "down0.png"
    }
  },
  friend: {
    add: {
      on: htlivesight.constants.IMG_PATH + "add1.png",
      off: htlivesight.constants.IMG_PATH + "add0.png"
    }
  },
  weather: {
    sun: htlivesight.constants.IMG_PATH + "sun22.png",
    few_clouds: htlivesight.constants.IMG_PATH + "few_clouds22.png",    //    few_clouds_old: htlivesight.constants.IMG_PATH + "old_few_clouds22.png",
    overcast: htlivesight.constants.IMG_PATH + "overcast22.png",
    rain: htlivesight.constants.IMG_PATH + "rain22.png"
  },
  event: {
    goal: htlivesight.constants.IMG_PATH + "goal.png",
    miss: htlivesight.constants.IMG_PATH + "miss.png",
    penalty_goal: htlivesight.constants.IMG_PATH + "penalty_goal.png",
    penalty_miss: htlivesight.constants.IMG_PATH + "penalty_miss.png",
    sun: htlivesight.constants.IMG_PATH + "sun16.png",
    few_clouds: htlivesight.constants.IMG_PATH + "few_clouds16.png",        overcast: htlivesight.constants.IMG_PATH + "overcast16.png",
    rain: htlivesight.constants.IMG_PATH + "rain16.png",
    hattrick: htlivesight.constants.IMG_PATH + "star.png",
    bruised: htlivesight.constants.IMG_PATH + "bruised.png",
    injury: htlivesight.constants.IMG_PATH + "injury.png",
    yellow: htlivesight.constants.IMG_PATH + "yellow.png",
    yellow2: htlivesight.constants.IMG_PATH + "yellow2.png",
    red: htlivesight.constants.IMG_PATH + "red.png",
    pressing: htlivesight.constants.IMG_PATH + "press.png",
    substitute: htlivesight.constants.IMG_PATH + "sub.png",        swap: htlivesight.constants.IMG_PATH + "swap.png",
    info: htlivesight.constants.IMG_PATH + "info.png"
  },
  transparent: htlivesight.constants.IMG_PATH + "transparent.png"
};/** * Bigpapy:  next lines (until the end) added to have old icons available to user choice. */htlivesight.constants.IMG_PATH = "chrome://htlivesight/content/old_img/";htlivesight.ImageOld = {		  htlivesight: htlivesight.constants.IMG_PATH + "foxball_32.png",  live: {    on: htlivesight.constants.IMG_PATH + "wboxshade1.png",    off: htlivesight.constants.IMG_PATH + "wboxopen1.png"  },    window: {    close: {      on: htlivesight.constants.IMG_PATH + "wclose1.png",      off: htlivesight.constants.IMG_PATH + "wclose0.png"    },    shade: {      on: htlivesight.constants.IMG_PATH + "wshade1.png",      off: htlivesight.constants.IMG_PATH + "wshade0.png"    },    minimize: {      on: htlivesight.constants.IMG_PATH + "wmin1.png",      off: htlivesight.constants.IMG_PATH + "wmin0.png"    },    maximize: {      on: htlivesight.constants.IMG_PATH + "wmax1.png",      off: htlivesight.constants.IMG_PATH + "wmax0.png"    },      //added by bigpapy: icon sound on/off    sound: {        on: htlivesight.constants.IMG_PATH + "sound_on.gif",        off: htlivesight.constants.IMG_PATH + "sound_off.gif"      },   // end adding by bigpapy //added by bigpapy: icons link to match page    link: {        on: htlivesight.constants.IMG_PATH + "toHT_on.png",        off: htlivesight.constants.IMG_PATH + "toHT_off.png"      },   // end adding by bigpapy             info: {      on: htlivesight.constants.IMG_PATH + "info1.png",      off: htlivesight.constants.IMG_PATH + "info0.png"    },    up: {      on: htlivesight.constants.IMG_PATH + "up1.png",      off: htlivesight.constants.IMG_PATH + "up0.png"    },    down: {      on: htlivesight.constants.IMG_PATH + "down1.png",      off: htlivesight.constants.IMG_PATH + "down0.png"    }  },  friend: {    add: {      on: htlivesight.constants.IMG_PATH + "add1.png",      off: htlivesight.constants.IMG_PATH + "add0.png"    }  },  weather: {    sun: htlivesight.constants.IMG_PATH + "sun22.png",    few_clouds: htlivesight.constants.IMG_PATH + "few_clouds22.png",    //    few_clouds_old: htlivesight.constants.IMG_PATH + "old_few_clouds22.png",    overcast: htlivesight.constants.IMG_PATH + "overcast22.png",    rain: htlivesight.constants.IMG_PATH + "rain22.png"  },  event: {    goal: htlivesight.constants.IMG_PATH + "goal.png",    miss: htlivesight.constants.IMG_PATH + "miss.png",    penalty_goal: htlivesight.constants.IMG_PATH + "penalty_goal.png",    penalty_miss: htlivesight.constants.IMG_PATH + "penalty_miss.png",    sun: htlivesight.constants.IMG_PATH + "sun16.png",    few_clouds: htlivesight.constants.IMG_PATH + "few_clouds16.png",        overcast: htlivesight.constants.IMG_PATH + "overcast16.png",    rain: htlivesight.constants.IMG_PATH + "rain16.png",    hattrick: htlivesight.constants.IMG_PATH + "star.png",    bruised: htlivesight.constants.IMG_PATH + "bruised.png",    injury: htlivesight.constants.IMG_PATH + "injury.png",    yellow: htlivesight.constants.IMG_PATH + "yellow.png",    yellow2: htlivesight.constants.IMG_PATH + "yellow2.png",    red: htlivesight.constants.IMG_PATH + "red.png",    pressing: htlivesight.constants.IMG_PATH + "press.png",    substitute: htlivesight.constants.IMG_PATH + "sub.png",        swap: htlivesight.constants.IMG_PATH + "swap.png",    info: htlivesight.constants.IMG_PATH + "info.png"  },  transparent: htlivesight.constants.IMG_PATH + "transparent.png"};