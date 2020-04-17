import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import UserData from './UserData';
import SubjectData from './SubjectData';
import VideoData from './VideoData';
export default new Vuex.Store({
    modules: {
        UserData, SubjectData, VideoData
    }
});
