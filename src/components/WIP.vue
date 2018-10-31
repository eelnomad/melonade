<!-- League.vue
     Will contain League of Legends analytics.-->

<template>
  <div class="flex-row dim" id="wip">
    <router-link id="home-button" to="/">Home</router-link>
    <span></span>
    <div class="flex-column" id="wip-text">
      <span></span>
      <h1>May be available soon!</h1>
      <p>Sorry for the inconvenience but this page isn't available yet.</p>
      <p>Maybe it will be available sometime in the near future, maybe it won't.</p>
      <p>To be honest, I'm really not sure. -Nomad</p>
      <span></span>
    </div>
    <span></span>
  </div>
</template>

<script>
  // Replace with rest call that returns 10 posts (title, preview, bg_image, date) for that type
  export default {
    name: 'wip',
    data () {
      return {}
    },
    created () {
      this.$store.dispatch('hideHeader')
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #wip {
    color: white;
    position: absolute;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('https://lh3.googleusercontent.com/pgY8k0ee8T3pTe_qN8IhZfoisanvOleNXeT3MSAkVxJeyixkzhNKGPBfr_uYL6warS4QXAVVXi9BPg4bfJ78Vl5ugwxue6nF1Nc8A1aSMLOYBt4DoQ1ULH4bFz4sjjQzCMuWkD379lA_GXLEjqPw1rKJafuYJnwjHLSfD5lO-clJXz_QJ5nqltJBNk9R3Dt-RiBjLnft1VyMX0xGeC2pN-yYvpXNIsjwHQ1-y4s2Yd32Ql-E-lBH2V8pzrMgZ7JLF4I3MVZ3_dB2PuZpOY21rlaQkJNnAYSOIvv6-UMX4i9daSow3K3Tx8wPivBu_qyb_7zjejRHELxMpl0Pz6cu6zXt3uwj3KbEjoe3gFNMyX3y9QkWS-VeS3LtKbO1dsOEtm3Lbbk325fGRGGoaNhpaC_1w4ggglbLKuCQSN_vg9feDh77yQYJO70Pr12eCn0FsyIzdc6iho-f2RUOwblCDhpBNI_Vfo-4kwZA8iyZNTNpPJ1MLgpC--fStD3huFjecR1OtdWfvHjRf7975batFmP-hfYkd16jz1JDwEd8poLsexbK71p_nK5ozv9HBTUcLh30VBnTvZcEs8-JlMOofqWqvOUuhoj0tMIjBMZo8WQjF9qH9SmRL8pQ8_SOKqPWAGrFj6qhq4ShrfPtVyzJPMfFhB-xP1k_MrkQ2famQFjfVQ=w1425-h950-no?.jpg');
  }

  #wip-text {
    height: 100%;
    text-align: center;
    z-index: 1;
  }

  #home-button {
    bottom: 0;
    right: 0;
    margin: 20px 50px;
    padding: 10px 20px;
    position: absolute;
    background-color: transparent;
    background-repeat: no-repeat;
    border-style: solid;
    border-width: 1px;
    border-bottom-width: 3px;
    border-color: white;
    color: white;
    float: right;
    outline-width: 1px;
    outline-color: white;
    cursor: pointer;
    z-index: 2;
  }

  #home-button:hover {
    border-bottom-width: 2px;
    outline: none;
  }

  h1 {
    font-size: 5vw;
    margin-bottom: 6vw;
  }

  p {
    font-size: 1.2vw;
    line-height: 0px;
  }
</style>
