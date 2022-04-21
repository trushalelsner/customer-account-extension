<template>
  <div class="return--order__wrapper" id="return-order" >
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
          <input type="file" name="proof" class="proof-file" accept="image/*"/>
        </div>
        <div class="modal-footer">
          <button class="btn" id="returncancle">Cancle</button>
          <button class="btn" id="retunbtn" @click="returnSubmit">Return</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive , onMounted } from 'vue';
export default {
  name:"ReturnOrder",
  props:{
    orderId:String
  },

 /*  methods:{
    addItem(id) {
      let returnQty= parseInt(document.querySelector(`.item input[data-input='${id}']`).value);
      returnQty++;
      document.querySelector(`.item input[data-input='${id}']`).value = returnQty; 
      if (returnQty > 0) {
        document.querySelector(`.reason-box textarea[data-reason='${id}']`).style.display = 'block';
      }
    },

    removeItem(id){
      let returnQty= parseInt(document.querySelector(`.item input[data-input='${id}']`).value);
      returnQty--
      document.querySelector(`.item input[data-input='${id}']`).value = returnQty; 
      if (returnQty === 0) {
        document.querySelector(`.reason-box textarea[data-reason='${id}']`).style.display = 'none';
      }
    },

    returnSubmit(){
      let targets = document.querySelectorAll('.modal-body .lineitem');

      targets.forEach(target =>{
        let id = target.getAttribute('data-id');
        let returnQty = parseInt(target.querySelector("input[type='number']").value);
        if (returnQty > 0) {
          let returnMsg = target.querySelector(".reason-box textarea[name='reason']").value;

        }
      });
    }

  },

  mounted(){
    debugger;
    console.log('orderId'+this.orderId, 'lineItems'+this.lineitems, 'showreturns'+this.showReturn);
  },
  beforeUpdate(){
    console.log('orderId'+this.orderId, 'lineItems'+this.lineitems, 'showreturns'+this.showReturn);
  } */

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
      document.querySelector(`.item input[data-input='${id}']`).value = returnQty; 
      if (returnQty > 0) {
        document.querySelector(`.reason-box textarea[data-reason='${id}']`).style.display = 'block';
      }
    }

    const removeItem = (id) =>{
      let returnQty= parseInt(document.querySelector(`.item input[data-input='${id}']`).value);
      returnQty--
      document.querySelector(`.item input[data-input='${id}']`).value = returnQty; 
      if (returnQty === 0) {
        document.querySelector(`.reason-box textarea[data-reason='${id}']`).style.display = 'none';
      }
    }

    const returnSubmit = async() =>{
      let targets = document.querySelectorAll('.modal-body .lineitem');
      targets.forEach(target =>{
        let id = target.getAttribute('data-id');
        let returnQty = parseInt(target.querySelector("input[type='number']").value);
        if (returnQty > 0) {
          let returnMsg = target.querySelector(".reason-box textarea[name='reason']").value;
          /* find the value is exist or not */
          var index = itemsList.findIndex(item => item.lineItemId==id);
          if(index === -1){
            itemsList.push({'lineItemId':id,'returnQty':returnQty,'message':returnMsg});
          } else {
            itemsList[index].lineItemId = id;
            itemsList[index].returnQty = returnQty;
            itemsList[index].message = returnMsg;
          }
        }
        /* target files */
      });

      if (targets.length > 0) {
        let file = document.querySelector(".modal-body input[type='file']");
        console.log(itemsList);
        let data = new FormData();
        data.append('itemsList',JSON.stringify(itemsList));
        data.append('file', file.files[0], file.files[0].name);
        console.log(data);
        debugger;
        const submitReturnreq = await fetch(`https://elsnerapps.apps.elsner.com/CustomerAccount/App/api/customer/${__st.cid}/orders/${props.orderId}/return?shop=${Shopify.shop}`,{
          method:"POST",
          headers: {
            'Accept':'application/json',
          },
          body:data
        });
        const json = await submitReturnreq.json();
        
        console.log(json);
      }
    }

    onMounted(()=>{
      getOrderDetails();
    })

    return{
      lineItems,
      addItem,
      removeItem,
      itemsList,
      returnSubmit
    }
  } 
}
</script>

<style scoped>
  #return-order{
    display: block !important;
  }
  
</style>