<template>
  <div class="address-page__wrapper" data-page="address">
    <div class="address-page--header">
      <h3>Address Book</h3>
    </div>
    <div class="act-btn">
      <button class="add-new-btn" @click="openModal" data-trigger="addrss-modal">Add New Address</button>
    </div>

    <!-- MOdal -->
    <div class="address-modal" id="address-modal">
      <div class="modal--wrapper">
        <!-- modal head -->
        <div class="modal-header">
          <h4>Address</h4>
          <button class="btn close-btn">
            <span>close</span>
          </button>
        </div>
        <!-- modal body -->
        <div class="modal-body">
          <div class="form-group">
            <div class="form-field-half">
              <label for="firstname"></label>
              <input type="text" id="firstname" name="firstname" class="field" />
            </div>
            <div class="form-field-half">
              <label for="lastname"></label>
              <input type="text" id="lastname" name="lastname" class="field" />
            </div>
          </div>
        </div>

        <!-- modal footer -->
      </div>


    </div>

    <div class="addresses--wrapper">
      <div class="address-box__wrapper" v-for="(address, index) in addresses" :key="index">
        <div class="box-header">
          <h5>{{ address.firstname }} {{ address.lastname }}</h5>
          <div class="action-btns">
            <button class="editBtn">
              <span>Edit</span>
            </button>
            <button class="delBtn">
              <span>Delete</span>
            </button>
          </div>
        </div>
        <div class="box-content">
          <p v-if="address.address1 != null">{{ address.address1 }}</p>
          <p v-if="address.address2 != null">{{ address.address1 }}</p>
          <p v-if="address.company != null">{{ address.address1 }}</p>
          <p v-if="address.city != null">{{ address.address1 }}</p>
          <p v-if="address.zip != null">{{ address.address1 }}</p>
          <p v-if="address.country != null">{{ address.address1 }}</p>
          <p v-if="address.provience != null">{{ address.address1 }}</p>

        </div>
        <div class="box-footer">

        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { ref,reactive, onMounted } from "vue";
export default {
  name:"Address",

  setup(){
    const address_id=ref('');
    const addresses = reactive({'addresses':{}});
    const form = reactive({
      'firstname':'',
      'lastname':'',
      'phone':'',
      'address1':'',
      'address2':'',
      'company':'',
      'city':'',
      'zip':'',
      'country':'',
      'provience':''
    })

    onMounted(()=>{
      getAddresses();
    });

    const getAddresses = async()=>{

      const req = await fetch(` https://elsnerapps.apps.elsner.com/CustomerAccount/App/api/getAddresses?shop=${Shopify.shop}&c_id=${__st.cid}`);
      const json = await req.json();
      addresses.addresses = json.data.customer.addresses;
      console.log(json);
    }

    //resetform 

    const resetform = () =>{
      form.firstname = '',
      form.lastname='',
      form.phone='',
      form.address1='',
      form.address2='',
      form.company='',
      form.city='',
      form.zip='',
      form.country='',
      form.provience=''
    }
    return{
      address_id,
      form,
      resetform,
    }
  }
}
</script>