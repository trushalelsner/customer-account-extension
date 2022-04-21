<template>
	<div>
		<!-- cancle modal -->
		<div class="cancle-modal__wrapper">
			<div class="modal--content">
				<div class="modal-header">
					<h3>Cancle Order</h3>
					<button class="close btn" @click="closeCanclemodal">
						<span>close</span>
					</button>
				</div>
				<div class="modal-body">
					<h5>Your Transaction Details</h5>
					<span>Your Order Amount Will refund to below Transaction Details</span>
					<div class="payments-details__wrapper">
						<div class="payment-method--icon">
							<img :src="payment?.paymentIcon.url" :alt="payment?.gateway">
						</div>
						<div class="payment-details">
							<p class="payment-gateway">{{ payment?.formattedGateway }}</p>
							<p class="account">{{ payment?.accountNumber }}</p>
						</div>
						<span class="money">{{ payment?.amountSet.shopMoney.amount }}</span>
					</div>
					<div class="separate-line"></div>
					<div class="reason-box">
						<textarea name="reason" id="reason" cols="30" rows="10" v-model="process.reason"></textarea>
					</div>
				</div>
				<div class="modal-footer">
					<button @click="closeModal">close</button>
					<button class="btn danger" id="cancleorder" @click="cancle">Cancle Order</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { onMounted, reactive, ref } from '@vue/runtime-core'
export default {
	name:"Cancle",
	props:{
		orderId:String
	},
	setup:(props) =>{
		const payment = ref(null);
		const process = reactive({'reason':""});
		onMounted(()=>{
			orderPaymentStatus();
		});

		const orderPaymentStatus = async()=>{
			const paymentReq = await fetch(`https://elsnerapps.apps.elsner.com/CustomerAccount/App/api/customer/${__st.cid}/orders/${props.orderId}/payment?shop=${Shopify.shop}`);
			let json = await paymentReq.json();
			payment.value = json.data.order.transactions[0]
		}

		const cancle = async() =>{
			const cancleReq = await fetch(`https://elsnerapps.apps.elsner.com/CustomerAccount/App/api/customer/${__st.cid}/orders/${props.orderId}/cancle?shop=${Shopify.shop}`,{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method:'POST',
				body:JSON.stringify(process)
			});
			const json = cancleReq.json();
			console.log(json);
		}

		return {
			payment,
			cancle,
			process
		}
	}
}
</script>

<style>

</style>