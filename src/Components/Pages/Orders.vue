<template>
  <div class="orders-page__wrapper" data-page="orders">
    <div class="header">
      <h3>Order History</h3>
      <p>Check the status of Recent Orders , manage returns , and download the invoices.</p>
    </div>
    <div class="orders-box__wrapper">
      <div class="order_box" v-for="(order,index) in orders.orders" :key="index">
        <div class="box_wrapper">
          <div class="order-header">
            <div class="order-info">
              <div class="info"><p>Order Number</p><span>{{ order.node.name }}</span></div>
              <div class="info"><p>Date Placed</p><span>{{ order.node.createdAt }}</span></div>
              <div class="info"><p>Total Amount</p><span>{{ order.node.totalPriceSet.shopMoney.amount }}</span></div>
            </div>
            <div class="order-actions">
              <button class="btn" @click="returnorder(order.node.id)">Return</button>
              <button class="btn" @click="download(order.node.id)">Download Invoice</button>
              <button class="btn">View Order</button>
            </div>
          </div>
          <div class="order-content">
            <div class="order-shipment-status">

            </div>
            <div class="order-items__wrapper">
              <div class="order-item" v-for="(lineitem , index) in order.node.lineItems.edges" :key="index">
                
                <div class="item_box">
                  <div class="item-image">
                    <img :src="lineitem.node.image.originalSrc" :alt="lineitem.node.title">
                  </div>
                  <div class="item-headings">
                    <h5>{{ lineitem.node.title }}</h5>
                    <span>{{ lineitem.node.variantTitle }}</span>
                  </div>
                  <div class="item-info">
                    <span class="product-price">{{ lineitem.node.variant.price }} *</span><span class="quantity">{{ lineitem.node.quantity }}</span><span class="total">{{ lineitem.node.originalTotalSet.shopMoney.amount }}</span>
                  </div>
                </div>
              </div>
              <div v-if="order.node.lineItems.edges.length <= 3">
                <router-link :to="{ name:'Order' , params:{orderId:order.node.id.split('/')[4] } }">(+{{ order.node.lineItems.edges.length }}) items</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
export default {
  name:"Orders",
  setup:()=>{
    const orders = reactive({"orders":{}});

    onMounted(()=>{getOrders()});

    const getOrders = async() =>{
      let fetchOrders = await fetch(`https://elsnerapps.apps.elsner.com/CustomerAccount/App/api/customer/${__st.cid}/orders?shop=${Shopify.shop}`);
      let json = await fetchOrders.json();
      orders.orders = json.data.customer.orders.edges;
    }
    return {
      orders
    }
  }
}
</script>

<style>

</style>