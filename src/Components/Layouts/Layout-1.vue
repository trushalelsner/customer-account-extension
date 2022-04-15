<template>
    <div class="layout-1" id="layout-1">
        <aside class="sidebar--wrapper">
            <div class="sidebar">
                <ul>
                    <li>
                        <router-link to="/account">Dashboad</router-link>
                    </li>
                    <li>
                        <router-link to="/account/addresses">Address Book</router-link>
                    </li>
                    <li>
                        <router-link to="/account/orders">Orders</router-link>
                    </li>
                    <li>
                        <router-link to="/account/subscription">Subscription</router-link>
                    </li>
                    <li>
                        <router-link to="/account/profile">Profile Page</router-link>
                    </li>
                </ul>
            </div>
        </aside>
        <section class="customer-page__details">
            <div class="detail--page">
                <router-view />
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name:"Layout1"
}
</script>

<style scoped>
    #layout-1{
        display: flex;
    }
    #layout-1 section{
        margin-left: 10px;
    }
</style>