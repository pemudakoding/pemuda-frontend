<template>
    <!-- Header Section Begin -->
    <header class="header-section">
        <div class="header-top">
            <div class="container">
                <div class="ht-left">
                    <div class="mail-service">
                        <i class="fa fa-envelope"></i>
                        {{webInformation.email}}
                    </div>
                    <div class="phone-service">
                        <i class="fa fa-phone"></i>
                        {{webInformation.number}}
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="inner-header">
                <div class="row align-items-center">
                    <div class="col-lg-2 col-md-2">
                        <div class="logo">
                            <router-link to="/">
                                <img v-bind:src="webInformation.logo" alt />
                            </router-link>
                        </div>
                    </div>
                    <div class="col-lg-7 col-md-7">
                        <div class="input-group add-on">
                            <input
                                class="form-control"
                                placeholder="Cari Produk"
                                name="srch-term"
                                id="srch-term"
                                type="text"
                                v-model="search"
                            />
                            <div class="input-group-btn">
                                <button
                                    class="btn btn-warning text-light"
                                    style="padding:5px 30px 5px 30px; border-radius:0;"
                                    type="submit"
                                    @click="searchProduct()"
                                >Cari</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 text-right col-md-3 d-sm-flex justify-content-sm-center">
                        <ul class="nav-right">
                            <li class="cart-icon">
                                Keranjang Belanja &nbsp;
                                <a href="#">
                                    <i class="icon_bag_alt"></i>
                                    <span>{{userCart.length}}</span>
                                </a>
                                <div class="cart-hover">
                                    <div class="select-items">
                                        <table>
                                            <tbody v-if="userCart.length > 0">
                                                <tr
                                                    v-for="(cart,index) in userCart"
                                                    v-bind:key="cart.id"
                                                >
                                                    <td class="si-pic">
                                                        <img
                                                            class="photo-item"
                                                            v-bind:src="cart.photo"
                                                            alt
                                                        />
                                                    </td>
                                                    <td class="si-text">
                                                        <div class="product-selected">
                                                            <p>{{idrPrice(cart.price)}} x 1</p>
                                                            <h6>{{cart.name}}</h6>
                                                        </div>
                                                    </td>
                                                    <td
                                                        v-on:click="removeItem(index)"
                                                        class="si-close"
                                                    >
                                                        <i class="ti-close"></i>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tbody v-else>
                                                <tr>
                                                    <td>Keranjang Belanja Kosong</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="select-total">
                                        <span>total:</span>
                                        <h5>{{totalPrice}}</h5>
                                    </div>
                                    <div class="select-button">
                                        <router-link to="/cart" class="primary-btn checkout-btn">
                                            <a href="#" class="text-light">Checkout</a>
                                        </router-link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- Header End -->
</template>

<script>
import idrCurrency from "@/instance/idrCurrency.js";

export default {
    name: "HeaderShayna",
    data: function() {
        return {
            search: "",
            userCart: []
        };
    },
    methods: {
        removeItem(index) {
            this.userCart.splice(index, 1);
            const parsed = JSON.stringify(this.userCart);
            localStorage.setItem("userCart", parsed);

            window.location.reload();
        },
        idrPrice(price) {
            return idrCurrency.convert(price);
        },
        searchProduct() {
            let params = this.search;
            if (!this.$route.params.search) {
                this.$router.push({
                    name: "ProductSearch",
                    params: { search: params }
                });
            } else {
                this.$router.replace({
                    name: "ProductSearch",
                    params: { search: params }
                });
            }
        }
    },
    mounted: function() {
        if (localStorage.getItem("userCart")) {
            try {
                this.userCart = JSON.parse(localStorage.getItem("userCart"));
            } catch (e) {
                localStorage.removeItem("userCart");
            }
        }
    },
    computed: {
        totalPrice() {
            if (this.userCart.length > 0) {
                return idrCurrency.convert(
                    this.userCart.reduce(
                        (items, data) => items + parseFloat(data.price),
                        0
                    )
                );
            } else {
                return "0";
            }
        }
    },
    props: ["webInformation"]
};
</script>

<style scoped>
.photo-item {
    width: 80px;
    height: 80px;
    object-fit: cover;
}
</style>