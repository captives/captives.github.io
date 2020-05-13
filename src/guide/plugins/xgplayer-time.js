import Player from 'xgplayer';
let time = function () {
    let player = this;
    let util = Player.util;
    let format = util.format;
    let handle = function () {
        let curtime = player.controls.querySelector('.xgplayer-time');
        if (player.videoConfig.mediaType !== 'audio' || !player.isProgressMoving || !player.dash) {
            if (curtime)
                curtime.innerHTML = `<span> -$- ${format(player.currentTime || 0)}</span><em>${format(player.duration)}`;
        }
    }

    player.on('durationchange', handle)
    player.on('timeupdate', handle)

    function destroyFunc() {
        player.off('durationchange', handle)
        player.off('timeupdate', handle)
        player.off('destroy', destroyFunc)
    }

    player.once('destroy', destroyFunc);
}


let progress = function () {
    let player = this
    let util = Player.util
    let container = null;//util.createDom('xg-progress', '<xg-outer class="xgplayer-progress-outer"><xg-cache class="xgplayer-progress-cache"></xg-cache><xg-played class="xgplayer-progress-played"></xgplayer-played><xg-progress-btn class="xgplayer-progress-btn"></xg-progress-btn><xg-point class="xgplayer-progress-point xgplayer-tips"></xg-point><xg-thumbnail class="xgplayer-progress-thumbnail xgplayer-tips"></xg-thumbnail></xg-outer>', { tabindex: 1 }, 'xgplayer-progress')
    let root = player.controls

    container = root.querySelector('.xgplayer-progress');

    const handleTimeUpdate = function () {
        console.log(player.currentTime, player.currentTime >= 1200, player.duration);
        if (player.currentTime < 1200) {
            player.currentTime = 1200;
        }
        // player.currentTime = player.currentTime >= 1200 ? 0 : player.currentTime;
    }

    player.on('timeupdate', handleTimeUpdate);
}

Player.install('time', time);

Player.install('progress', progress)