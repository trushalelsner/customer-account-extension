<template>
  <div class="address-page__wrapper" data-page="address">
    <div class="address-page--header">
      <h3>Address Book</h3>
    </div>
    <div class="act-btn">
      <button class="add-new-btn" @click="resetform" data-trigger="addrss-modal">Add New Address</button>
    </div>

    <!-- MOdal -->
    <div class="address-modal" id="address-modal">
      <div class="modal--wrapper">
        <!-- modal head -->
        <div class="modal-header">
          <h4>Address</h4>
          <button class="btn close-btn" @click="resetform">
            <span>close</span>
          </button>
        </div>
        <!-- modal body -->
        <div class="modal-body">
          <div class="form-group">
            <div class="form-field-half">
              <label for="firstname">FirstName</label>
              <input type="text" id="firstname" name="firstname" class="field"  v-model="form.firstname"/>
            </div>
            <div class="form-field-half">
              <label for="lastname">LastName</label>
              <input type="text" id="lastname" name="lastname" class="field" v-model="form.lastname" />
            </div>
          </div>
          <div class="form-group">
            <div class="form-field">
              <label for="phone">Phone</label>
              <input type="tel" id="phone" name="phone" class="field" v-model="form.phone"/>
            </div>
          </div>
          
          <div class="form-group">
            <div class="form-field">
              <label for="address1">Address Line1</label>
              <input type="text" id="address1" name="address1" class="field" v-model="form.address1"/>
            </div>
          </div>
          <div class="form-group">
            <div class="form-field">
              <label for="address2">Address Line2</label>
              <input type="text" id="address2" name="address2" class="field" v-model="form.address2"/>
            </div>
          </div>
          <div class="form-group">
            <div class="form-field">
              <label for="company">Company</label>
              <input type="text" id="company" name="company" class="field" v-model="form.company" />
            </div>
          </div>
          <div class="form-group">
            <div class="form-field">
              <label for="city">City</label>
              <input type="text" id="city" name="city" class="field" v-model="form.city" />
            </div>
            <div class="form-field">
              <label for="zip">Zip</label>
              <input type="text" id="zip" name="zip" class="field" v-model="form.zip" />
            </div>
          </div>

          <div class="form-group">
            <div class="form-field">
              <label for="country">Country</label>
              <input type="text" id="country" name="country" class="field" v-model="form.country" />
            </div>
            <div class="form-field">
              <label for="provience">Provience</label>
              <input type="text" id="provience" name="provience" class="field" v-model="form.provience"/>
            </div>
          </div>

        </div>

        <!-- modal footer -->
        <div class="modal-footer">
          <div class="act-btns">
            <button class="btn cancle-btn" id="cancle-btn" @click="resetform">Cancle</button>
            <button v-if="address_id == '' " class="btn save-btn" id="save-btn" @click="storeAddress">Save</button>
            <button v-else class="btn update-btn" id="update-btn" @click="updateAddress">Update</button>
          </div>
        </div>
      </div>
    </div>

    <div class="addresses--wrapper">
      <div class="address-box__wrapper" v-for="(address, index) in addresses.addresses" :key="index">
        <div class="box-header">
          <h5>{{ address.firstName }} {{ address.lastName }}</h5>
          <div class="action-btns">
            <button class="editBtn" @click="editAddress(address)">
              <span>Edit</span>
            </button>
            <button class="delBtn" @click="deleteAdress(address.id)">
              <span>Delete</span>
            </button>
          </div>
        </div>
        <div class="box-content">
          <p v-if="address.address1 != null">{{ address.address1 }}</p>
          <p v-if="address.address2 != null">{{ address.address2 }}</p>
          <p v-if="address.company != null">{{ address.company }}</p>
          <p v-if="address.city != null">{{ address.city }}</p>
          <p v-if="address.zip != null">{{ address.zip }}</p>
          <p v-if="address.country != null">{{ address.country }}</p>
          <p v-if="address.provience != null">{{ address.provience }}</p>

        </div>
        <div class="box-footer">
          <div class="switch-box"><p>Switch to default</p><span>switch</span></div>
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
      const req = await fetch(`https://elsnerapps.apps.elsner.com/CustomerAccount/App/api/getAddresses?shop=${Shopify.shop}&c_id=${__st.cid}`);
      const json = await req.json();
      addresses.addresses = json.data.customer.addresses;
      console.log(json);
    }

    const storeAddress = async()=>{
      console.log('store'+form.value);
      const req = await fetch(`https://elsnerapps.apps.elsner.com/CustomerAccount/App/api/storeAddress?shop=${Shopify.shop}&c_id=${__st.cid}`,{
        method:'POST',
        headers: {
          'content-type': 'application/json'
        }, 
        body:JSON.stringify({form})
        }
      );
      const json = await req.json();
      resetform();
      getAddresses();
    }

    const updateAddress = async(id)=>{

      const req = await fetch(`https://elsnerapps.apps.elsner.com/CustomerAccount/App/api/updateAddress?shop=${Shopify.shop}&c_id=${__st.cid}`,{ 
        method:'POST',
        headers: {
          'content-type': 'application/json'
        },
        body:JSON.stringify({form,address_id})
        }
      );
      const json = await req.json();
      resetform();
      getAddresses();
    }

    const deleteAddress = async(id)=>{
      const req = await fetch(`https://elsnerapps.apps.elsner.com/CustomerAccount/App/api/deleteAddress?shop=${Shopify.shop}&c_id=${__st.cid}`,{method:'POST',body:JSON.stringify({form,address_id})});
      const json = await req.json();
      resetform();
      getAddresses();
    }

    const editAddress = (address) =>{
      address_id.value=address.id;
      form.firstname=address.firstName;
      form.lastname=address.lastName;
      form.phone=address.phone;
      form.address1=address.address1;
      form.address2=address.address2;
      form.company=address.company;
      form.city=address.city;
      form.zip=address.zip;
      form.country=address.country;
      form.provience=address.provience;
    }

    //resetform 
    const resetform = () =>{
      address_id.value='',
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
      addresses,
      form,
      storeAddress,
      updateAddress,
      editAddress,
      deleteAddress,
      resetform,
    }
  }
}
</script>