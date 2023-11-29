<!-- League.vue
     Will contain League of Legends analytics.-->
<template>
    <div id="wip" class="pT-xl">
        <span></span>
        <span class="g-center">
            <h1 class="pB-l">May be available soon!</h1>
            <p class="pT-l">This page isn't available yet. Maybe it will be available sometime in the near future, maybe it won't. To be honest, I'm really not sure.</p>
            <p>-Nomad</p>
        </span>
        <span></span>
    </div>
</template>
<script>
export default {
    name: 'wip',
    data() {
        return {}
    },
    created() {},
    methods: {
        back: function() {
            this.$router.go(-1)
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#wip {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://lh3.googleusercontent.com/pgY8k0ee8T3pTe_qN8IhZfoisanvOleNXeT3MSAkVxJeyixkzhNKGPBfr_uYL6warS4QXAVVXi9BPg4bfJ78Vl5ugwxue6nF1Nc8A1aSMLOYBt4DoQ1ULH4bFz4sjjQzCMuWkD379lA_GXLEjqPw1rKJafuYJnwjHLSfD5lO-clJXz_QJ5nqltJBNk9R3Dt-RiBjLnft1VyMX0xGeC2pN-yYvpXNIsjwHQ1-y4s2Yd32Ql-E-lBH2V8pzrMgZ7JLF4I3MVZ3_dB2PuZpOY21rlaQkJNnAYSOIvv6-UMX4i9daSow3K3Tx8wPivBu_qyb_7zjejRHELxMpl0Pz6cu6zXt3uwj3KbEjoe3gFNMyX3y9QkWS-VeS3LtKbO1dsOEtm3Lbbk325fGRGGoaNhpaC_1w4ggglbLKuCQSN_vg9feDh77yQYJO70Pr12eCn0FsyIzdc6iho-f2RUOwblCDhpBNI_Vfo-4kwZA8iyZNTNpPJ1MLgpC--fStD3huFjecR1OtdWfvHjRf7975batFmP-hfYkd16jz1JDwEd8poLsexbK71p_nK5ozv9HBTUcLh30VBnTvZcEs8-JlMOofqWqvOUuhoj0tMIjBMZo8WQjF9qH9SmRL8pQ8_SOKqPWAGrFj6qhq4ShrfPtVyzJPMfFhB-xP1k_MrkQ2famQFjfVQ=w1500-h1500-no?.jpg);
    display: grid;
    grid-template-columns: 1fr fit-content(800px) 1fr;
    text-align: center;
}

h1 {
  font-size: 3em;
}

p {
  font-size: 2em;
}
</style>