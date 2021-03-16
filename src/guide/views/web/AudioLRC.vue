<template>
    <el-main>
        <audio ref="audio" controls autoplay></audio>
        <div ref="wrapper" class="wrapper"></div>
    </el-main>
</template>
<script>
import LRC from "./../../plugins/SimpleLRC";
export default {
    name: "AudioLRC",
    data() {
        return {
            lrc: null,
        };
    },
    mounted() {
        this.init({
            url: "assets/medias/xnbsw.mp3",
            lrc: "assets/medias/xnbsw.lrc",
        });
    },
    methods: {
        init(item) {
            const audio = this.$refs.audio;
            audio.src = item.url;
            audio.play();
            console.log(this.$refs.wrapper);
            this.lrc = new LRC({
                el: this.$refs.wrapper,
                url: item.lrc,
                row: 7, // 歌词行数
                lineHeight: 40, //每行歌词的高度
                delay: 0, // 延迟秒数，如果歌词文件不同步可以启用这个参数
                currentPlayTime: function () {
                    return audio.currentTime || 0;
                },
            });
        },
    },
};
</script>
<style lang="stylus" scoped>
.el-main {
    background: url('./../../assets/bg_lrc.jpg') no-repeat center;

    audio {
        position: absolute;
        width: 720px;
        bottom: 20%;
        left: 50%;
        margin-left: -360px;
    }

    .wrapper {
        position: absolute;
        width: 720px;
        height: 300px;
        left: 50%;
        top: 30%;
        margin-left: -360px;
        // background: rgba(0, 0, 0, 0.47);
        border-radius: 5px;
        color: #FFF;
        font-size: 20px;
        text-align: center;
        overflow: hidden;

        >>> ul {
            margin: 0;
            padding: 0;
            position: relative;
            top: 0px;
            -webkit-transition: all 0.3s;
            transition: all 0.3s;
            list-style: none;

            li {
                height: 40px;
                line-height: 40px;
                // 歌词换行会导致计算不准确，暂时忽略之
                white-space: nowrap;
                -webkit-transition: color 0.3s;
                transition: color 0.3s;
                font-size: 16px;

                &.current {
                    font-size: 22px;
                    color: #FF8939;
                    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.35);
                }
            }
        }
    }
}
</style>
