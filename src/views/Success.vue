<template>
    <div class="success">
        <div class="d-flex success-checkout align-items-center justify-content-center">
            <div class="col col-lg-4 text-center">
                <img src="img/success-buy.png" alt width="294" />
                <h3 class="mt-4">Sukses Melakukan Transaksi!</h3>
                <p class="mt-2">
                    Silahkan lakukan konfirmasi kepada admin dan
                    Silakan tunggu update terbaru dari kami via email yang sudah Anda daftarkan sebelumnya.
                </p>
                <router-link to="/" class="primary-btn pd-cart mt-3">Back to Home</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Success",
    mounted() {},
    beforeRouteEnter(to, from, next) {
        if (localStorage.getItem("checkoutType") != "success")
            next({ name: "Home" });
        else next();
    }
};
</script>