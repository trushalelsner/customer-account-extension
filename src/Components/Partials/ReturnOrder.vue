<template>
  <div class="return--order__wrapper" id="return-order">
    <div class="return-container">
      <div class="modal--content">
        <div class="modal-header">
          <h3>Return Order</h3>
					<button class="close btn">
						<span>close</span>
					</button>
        </div>

        <div class="modal-body">
          <p>please select your order items to return process.</p>
          <div class="retun-items__wrapper">
            <div class="lineitem" v-for="(lineItem,index) in lineItems.lineitems" :key="index" :data-id="lineItem?.node.id">
              <div class="item--container">
                <div class="item-info">
                  <img :src="lineItem?.node.image.url" :alt="lineItem?.node.title" />
                  <div class="item-titles">
                    <h5>{{ lineItem?.node.title }}</h5>
                    <p>{{ lineItem?.node.variantTitle }}</p>
                    <span class="price">{{ lineItem?.node.variant.price }}</span>
                  </div>
                </div>
                <div class="item">
                  <button @click="addItem(lineItem?.node.id)">+</button>
                  <input type="number" min="0" :max="lineItem?.node.quantity" value="0" :data-input="lineItem?.node.id"/>
                  <button @click="removeItem(lineItem?.node.id)">-</button>
                </div>
              </div> 
              <div class="reason-box" >
                <textarea name="reason" id="" cols="30" rows="10" :data-reason="lineItem?.node.id" style="display:none"></textarea>
              </div>
            </div>
          </div>
          <!-- attachments -->
          <p>Please add attachments as a proof</p>
          <input type="file" name="proof" />
        </div>
        <div class="modal-footer">
          <button class="btn" id="returncancle">Cancle</button>
          <button class="btn" id="retunbtn" >Return</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from '@vue/runtime-core';
export default {
  name:"ReturnOrder",
  props:{
    orderId:String
  },
  setup:(props) => {
    const itemsList =[];
    const lineItems = reactive({'lineitems':{}});

    const getOrderDetails = async() => {
      if (props.orderId != undefined) {
        console.log(props.orderId);
        const fetchOrder = await fetch(`https://elsnerapps.apps.elsner.com/CustomerAccount/App/api/customer/${__st.cid}/orders/${props.orderId}?shop=${Shopify.shop}`);
        const json = await fetchOrder.json();
        lineItems.lineitems = json.data.order.lineItems.edges;
      }
    }

    const addItem = (id) =>{
      let returnQty= parseInt(document.querySelector(`.item input[data-input='${id}']`).value);
      returnQty++;
      if (returnQty > 0) {
        document.querySelector(`.reason-box textarea[data-reason='${id}']`).style.display = 'block';
      }
    }

    const removeItem = (id) =>{
      debugger;
      let returnQty= parseInt(document.querySelector(`.item input[data-input='${id}']`).value);
      returnQty--
      if (returnQty === 0) {
        document.querySelector(`.reason-box textarea[data-reason='${id}']`).style.display = 'none';
      }
    }

    const returnSubmit = () =>{
      let targets = document.querySelectorAll('.modal-body .lineitem');

      targets.forEach(target =>{
        let id = target.getAttribute('data-id');
        let returnQty = parseInt(target.querySelector("input[type='number']").value);
        if (returnQty > 0) {
          let returnMsg = target.querySelector(".reason-box textarea[name='reason']").value;

        }
      });

    }

    

    onMounted(()=>{
      getOrderDetails();
    })

    return{
      lineItems,
      addItem,
      removeItem,
      itemsList
    }
  }
}
</script>

<style scoped>
  #return-order{
    display: block !important;
  }
  
</style>