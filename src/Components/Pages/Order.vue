<template>
  <div class="order-page__wrapper" dat-page="order">
    <div class="page--header">
      <div class="header-info">
        <h2>Order {{ order?.name }}</h2>
        <p>order Date : {{ order?.createdAt }}</p>
      </div>
      <div class="cta-action">
        <!-- when order is not delivered -->
        <button>Cancle</button>
        <!-- after delivering    -->
        <button>Return</button>
        <!-- after delivering -->
        <button>Refund</button>
        <!-- after delivering an order -->
        <button>Download Invoice</button>
      </div>
    </div>
    <div class="page-content">
      <div class="content--wrapper">
        <div class="order--content">
          <!-- line-items -->
          <div class="order-item" v-for="(lineItem,index) in order?.lineItems.edges" :key="index">
            <div class="order-box__wrapper">
              <div class="item__image">
                <img :src="lineItem?.node.image.url" :alt="lineItem?.node.title">
              </div>
              <div class="item_info">
                <h5>{{ lineItem?.node.title }}</h5>
                <div class="lineitem__options" v-for="(option, index) in lineItem?.node.variant?.selectedOptions" :key="index">
                  <p>{{ option.name }} :</p> <span>{{ option.value }}</span>
                </div>
              </div>
              <div class="item-pricing">
                <span class="item--price">{{ lineItem?.node.variant?.price }}</span>
                <span class="item--qty">{{ lineItem?.node.quantity }}</span>
                <span class="item--total">{{ lineItem?.node.originalTotalSet?.shopMoney.amount }}</span>
              </div>
            </div>
          </div>

          <!-- order-summary && shipping information -->
          <div class="order-summary-delivery__wrapper">
            <div class="summary--info">
              <h5>Summary</h5>
              <div class="info--row">
                <p>Subtotal</p>
                <span>{{ order?.subtotalPriceSet.shopMoney.amount }}</span>
              </div>
              <div class="info--row discount">
                <p>Discount</p>
                <span>{{ order?.discountCode }}</span>
                <span>{{ order?.totalDiscountsSet.shopMoney.amount }}</span>
              </div>
              <div class="info--row">
                <p>TaxLine</p>
                <span>{{ order?.totalTaxSet.shopMoney.amount }}</span>
              </div>
              <div class="info--row">
                <p>Total</p>
                <span>{{ order?.totalPriceSet.shopMoney.amount }}</span>
              </div>
            </div>
            <div class="delivery--info">
              <h5>Shipping</h5>
              <button>View Carrier Details</button>
            </div>
          </div>
        </div>
        <div class="order--info">
          <div class="contact--card">
            <div><span>Phone:</span><p>{{ order?.phone }}</p></div>
            <div><span>Email:</span><p>{{ order?.email }}</p></div>
          </div>
          <div class="addresses">
            <div v-if="order?.shippingAddress.length != 0" class="shipping--address__wrapper">
              <p v-if="order?.shippingAddress.address1 != null ">{{ order?.shippingAddress.address1 }}</p>
              <p v-if="order?.shippingAddress.address2 != null ">{{ order?.shippingAddress.address2 }}</p>
              <p v-if="order?.shippingAddress.company != null ">{{ order?.shippingAddress.company }}</p>
              <p v-if="order?.shippingAddress.city != null ">{{ order?.shippingAddress.city }} </p>
              <p v-if="order?.shippingAddress.zip != null ">{{ order?.shippingAddress.zip }} </p>
              <p v-if="order?.shippingAddress.country != null ">{{ order?.shippingAddress.country }} </p>
              <p v-if="order?.shippingAddress.province != null ">{{ order?.shippingAddress.province }} </p>
            </div>
            <div v-if="order?.billingAddress.length != 0" class="billing--address__wrapper">
              <p v-if="order?.billingAddress.address1 != null">{{ order?.billingAddress.address1 }}</p>
              <p v-if=" order?.billingAddress.address2 != null">{{ order?.billingAddress.address2 }}</p>
              <p v-if="order?.billingAddress.company != null">{{ order?.billingAddress.company }}</p>
              <p v-if="order?.billingAddress.city != null">{{ order?.billingAddress.city }} </p>
              <p v-if="order?.billingAddress.zip != null">{{ order?.billingAddress.zip }} </p>
              <p v-if="order?.billingAddress.country !=null">{{ order?.billingAddress.country }} </p>
              <p v-if="order?.billingAddress.province !=null">{{ order?.billingAddress.province }} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted,ref } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
export default {
  name:"Order",
  setup: () => {
    const route = useRoute();
    const orderId = ref(route.params.orderId);
    const order = ref(null);

    onMounted(()=>{
      getOrder()
    });

    const getOrder = async() =>{
      const getReq = await fetch(`https://elsnerapps.apps.elsner.com/CustomerAccount/App/api/customer/${__st.cid}/orders/${orderId.value}?shop=${Shopify.shop}`);
      const json = await getReq.json();
      console.log(json);
      order.value = json.data.order;
      console.log(order.value);

    }
    return {
      route,
      order,
      orderId
    }
  }
}
</script>