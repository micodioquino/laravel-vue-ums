import {createRouter, createWebHistory} from "vue-router";

import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Users from '../views/Users.vue';
import UserView from '../views/UserView.vue';
import DefaultLayout from '../components/DefaultLayout.vue';
import AuthLayout from '../components/AuthLayout.vue';
import store from "../store";

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        component: DefaultLayout,
        meta: {requiresAuth: true},
        children: [
            {path: '/dashboard', name: 'Dashboard', component: Dashboard},
            {path: '/users', name: 'Users', component: Users},
            {path: '/users/create', name: 'UserCreate', component: UserView},
            {path: '/users/:id', name: 'UserView', component: UserView},
        ]
    },
    {
        path: '/auth',
        redirect: '/login',
        name: 'Auth',
        component: AuthLayout,
        meta: {isGuest: true},
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from , next) => {
    if(to.meta.requiresAuth && !store.state.user.token){
        next({name: 'Login'})
    } else if(store.state.user.token && (to.meta.isGuest)){
        next({name: 'Dashboard'});
    } else{
        next();
    }
})

export default router;