import axios from "axios";
import {createStore} from "vuex";
import axiosClient from "../axios";

const store = createStore({
    
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        },
        currentUser: {
            loading: false,
            data: {}
        },
        users: {
            loading: false,
            data: []
        }
    },
    getters: {},
    actions: {
        getUser({commit}, id){
            commit("setCurrentUserLoading", true);
            return axiosClient
                .get(`/user/${id}`)
                .then((res) => {
                    commit("setCurrentUser", res.data);
                    commit("setCurrentUserLoading", false);
                    return res;
                })
                .catch((err) => {
                    commit("setCurrentUserLoading", false);
                    throw err;
                })
        },
        getUsers({commit}){
            commit('setUsersLoading', true);
            return axiosClient.get("/user").then((res) => {
                commit('setUsersLoading', false);
                commit('setUsers', res.data);
                return res;
            });
        },
        saveUser({ commit }, user){
            delete user.image_url;
            let response;
            if(user.id){
                response = axiosClient
                    .put(`/user/${user.id}`, user)
                    .then((res) => {
                        commit("setCurrentUser", res.data);
                        return res;
                    });
            }else{
                response = axiosClient.post("/user", user).then((res) => {
                    commit("setCurrentUser", res.data);
                    return res;
                });
            }

            return response;
        },
        deleteUser({}, id){
            return axiosClient.delete(`/user/${id}`);
        },
        register({ commit }, user) {
            return axiosClient.post('/register', user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
                })
        }, 
        login({ commit }, user) {
            return axiosClient.post('/login', user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
                })
        }, 
        logout({commit}){
            return axiosClient.post('/logout')
                .then(response => {
                    commit('logout')
                    return response;
                })
        }
    },
    mutations: {
        setCurrentUserLoading: (state, loading) => {
            state.currentUser.loading = loading;
        },
        setUsersLoading: (state, loading) => {
            state.users.loading = loading;
        },
        setCurrentUser: (state, user) => {
            state.currentUser.data = user.data;
        },
        setUsers: (state, users) => {
            state.users.data = users.data;
        },
        logout: (state) => {
            state.user.data = {};
            state.user.token = sessionStorage.removeItem("TOKEN");
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token);
        }
    },
    modules: {}

})

export default store;