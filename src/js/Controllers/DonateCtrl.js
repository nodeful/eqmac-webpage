/**
 * Created by romanskisils on 16/02/2017.
 */
(function () {
	var DonateCtrl = function (
		RemoteDataService,
	    $window,
	    CONST,
	    Utils
	) {
		var c = this;

		var Stripe = null;
		c.stripeLoaded = false;
		c.paypalLoaded = false;
		c.loading = false;
		c.fail = false;
		c.success = false;

		c.slider = {
			value: 20,
			options: {
				floor: 1,
				ceil: 100,
				translate: function(value) {
					var result;
					if(value >  0) result = value + ' &#x1F642';
					if(value >  3) result = value + ' &#x1F60A';
					if(value >  5) result = value + ' &#x1F60F';
					if(value >  8) result = value + ' &#x1F603';
					if(value > 10) result = value + ' &#x1F604';
					if(value > 20) result = value + ' &#x1F606';
					if(value > 30) result = value + ' &#x1F60E';
					if(value > 50) result = value + ' &#x1F61D';
					if(value > 70) result = value + ' &#x1F628';
					if(value > 85) result = value + ' &#x1F631';
					if(value > 95) result = value + ' &#x1F924';
					if(value != c.slider.value) result = value;
					return '$' + result;
				}
			}
		};

		function loadStripe (){
			if(!Utils.globalObjectExists('StripeCheckout')){
				Utils.injectScript('https://checkout.stripe.com/checkout.js')
					.then(function(){
						c.stripeLoaded = true;
						loadStripe();
					})
			}else{
				Stripe = StripeCheckout.configure({
					key: CONST.STRIPE_PUBLIC_KEY,
					image: 'https://bitgapp.com/img/bitgapp.png',
					name: 'Bitgapp',
					zipCode: false,
					panelLabel: 'Donate'
				});

				$window.addEventListener('popstate', function() {
					Stripe.close();
				});
			}
		}

		function setupPayPalDonation(){
			// Set up the payment here, when the buyer clicks on the button
			var env    = this.props.env;
			var client = this.props.client;
			var amount = c.slider.value.toString();

			return paypal.rest.payment.create(env, client, {
				transactions: [
					{
						amount: {
							total: amount,
							currency: 'USD'
						},
						description: "eqMac2 Donation",
						soft_descriptor: "eqMac2 Donation",
						item_list: {
							items: [
								{
									"name": "eqMac2 Donation",
									"description": "eqMac2 Donation",
									"quantity": "1",
									"price": amount,
									"currency": "USD"
								}
							]
						}
					}
				],
				experience_profile_id: 'XP-5D4S-6ZNG-XS4F-7UYR',
				note_to_payer: "eqMac2 Donation"
			});
		}



		function loadPayPal (){
			if(!Utils.globalObjectExists('paypal')){
				Utils.injectScript('https://www.paypalobjects.com/api/checkout.js')
					.then(function () {
						paypal.config.logLevel = 'error';
						c.paypalLoaded = true;
						loadPayPal();
					});
			}else{
				paypal.Button.render({

					env: 'production',
					client:{
						production: CONST.PAYPAL_PRODUCT_KEY
					},
					style: {
						size: 'medium',
						color: 'blue',
						shape: 'rect'
					},
					payment: setupPayPalDonation,
					commit: true,
					onAuthorize: processPayPalDonation,
					onError: donationFailed
				}, '#paypal-button');
			}
		}

		(function onEnter() {
			loadStripe();
			loadPayPal();
		})();

		var donationSuccess = function () {
			c.loading = false;
			c.success = true;
		};

		var donationFailed = function () {
			c.loading = false;
			c.fail = true;
		};


		c.donateWithStripe = function () {
			if(Stripe){
				var amount = c.slider.value * 100;
				Stripe.open({
					description: 'eqMac2 Donation',
					amount: amount,
					token: function(token) {
						token.amount = amount;
						c.loading = true;
						RemoteDataService.processStripeDonation(token)
							.then(function (resp) {
								if(!resp.error){
									donationSuccess();
								}else{
									donationFailed();
								}
							}, donationFailed)
					}
				})
			}else{
				loadStripe();
			}
		};

		function processPayPalDonation(token) {
			c.loading = true;
			RemoteDataService.processPayPalDonation(token)
				.then(function (resp) {
					if(!resp.error){
						donationSuccess();
					}else{
						donationFailed();
					}
				}, donationFailed)
		}


	};

	angular.module('eqMac')
		.controller('DonateCtrl', [
			'RemoteDataService',
			'$window',
			'CONST',
			'Utils',
			DonateCtrl
		])
})();
