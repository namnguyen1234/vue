import authorized from "../middlewares/authorized";
import unauthorized from "../middlewares/unauthorized";
import { h, resolveComponent } from "vue";

export default [
    {
        path: '/login',
        name: 'Login',
        component: () => import("../pages/Login.vue"),
        meta: {
            middleware: [unauthorized]
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import("../pages/Register.vue"),
        meta: {
            middleware: [unauthorized]
        },
    },

    {
        path: "/",
        component: { render: () => h(resolveComponent("RouterView")) },
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import("../pages/Home.vue"),
                meta: {
                    middleware: [authorized]
                }
            },
            {    
                path: 'edit/:id',
                name: 'Edit',
                component: () => import("../pages/Edit.vue"),
                meta: {
                    middleware: [authorized]
                }
            },
            {    
                path: 'create',
                name: 'Create',
                component: () => import("../pages/Create.vue"),
                meta: {
                    middleware: [authorized]
                }
            },
        
        ]
    },
];
