import { createWebHistory,createRouter } from 'vue-router';
import Dashboard from './Components/Pages/Dashboard.vue';
import Address from './Components/Pages/Address.vue';
import Orders from './Components/Pages/Orders.vue';
import Order from './Components/Pages/Order.vue';
import Subscription from './Components/Pages/Subscription.vue';
import Profile from './Components/Pages/Profile.vue';



const routes = [
    {
        path:"/account",
        name:"Dashboard",
        component:Dashboard
    },
    {
        path:"/account/addresses",
        name:"Addresses",
        component:Address
    },
    {
        path:"/account/orders",
        name:"Orders",
        component:Orders
    },
    {
        path:"/account/orders/{:id}",
        name:"Order",
        component:Order
    },
    {
        path:"/account/subscription",
        name:"Subscription",
        component:Subscription
    },
    {
        path:"/account/profile",
        name:"Profile",
        component:Profile
    }

];

const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router;

