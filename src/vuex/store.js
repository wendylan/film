import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state =  {
    isLoading: false,
    isShowBack: false
};

const mutations =  {
    updateLoadingStatus (state, payload) {
        state.isLoading = payload.isLoading
    },
    updateBackStatus (state, payload) {
        state.isShowBack = payload.isShowBack
    }
};

export default new Vuex.Store({
    state,
    mutations,
});