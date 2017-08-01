<!-- League.vue
     Will contain League of Legends analytics.-->

<template>
  <div class="flex-row" id="wip">
      <router-link id="wip-button" :to="{name: 'home'}">Home</router-link> 
    <span></span>
    <div class="flex-column" id="wip-text">
    <span></span>
      <h1>May be available soon!</h1>
      <p>Sorry for the inconvenience but this page isn't available yet.</p>
      <p>Maybe it will be available sometime in the near future, maybe it won't.</p>
      <p>To be honest, I'm really not sure.     -Nomad</p>
      <span></span>
    </div>
    <div class="background dim"></div>
    <span></span>
  </div>
</template>

<script>
// Replace with rest call that returns 10 posts (title, preview, bg_image, date) for that type
export default {
  name: 'wip',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#wip {
  overflow: auto;
  color: white;
  position: absolute;
  height: 100%;
  width: 100%;
}

#wip-text {
  height: 100%;
  text-align: center; 
}

#wip-button {
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

#wip-button:hover {
  border-bottom-width: 2px;
  outline: none;
}

h1 { 
  font-size: 50px; 
  margin-bottom: 75px;
}

p {
  line-height: 0px;
}

.background {
  z-index: -99;
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('https://lh3.googleusercontent.com/b8EzdeVkc71MSR7z86IMhnUJgUN2wKsopJHJukf6wRFx0hLDEtJgXQyPGQSBx9_KmD4CPZZeMmm48zlDOlJFg-tdgi2W8O56QFu9sXuC_3cIoVFv-yaWi5pCAICiT4Ij6d9C2SfuCpPI47hAzinDGrDSN6mTnERsj_Zg9AcDgmX2a-8EZDXoxAYpY_afd6TaeVp8XNiqCBp6mJiAi4-6_RWDfOd-FRfI8pzWKaKInlrUZMnPk5AuOx85UEQlZG1EpZZoWOS_0GYVYW9RKZproKkg9HBzPgRjz5CP8K_WxG-sYivc7aksZw0YNwOV4QaP_kkvVlnY7xDvaJU0xapdm7UP_rPVV_dbGX3YznfUYSZjJT74HMuvJtRioQGURqeBuwchczLbssj9ssxquVyTKUmGE9pI0IayNjtT2vpJMjjJtoXaGC7K08mAoXBX2B7WXpPFiVPQOYz6-HyzqW6xNl1aAos5ReWQqAeEDHdQR7wdZ8ArnV9oIoceCdnIa9tjS9tbqRopfZJUwFX4yhXMDUwOZMM-RCHgWkVBtBUuKahlXwUT1FEAfvxC4Sl-rAsU5ki7Ilww-Lbpo2YxXY5NhYLbZTIu5ZWN7PSYJASYuO5SKVIAs5gP53fl1-dAFY9it_m21tpaahIFFRq1UwbTsxret0zSp68-nAyuVoqiH3di_g=w2398-h1598-no');
}

.dim {
  filter: brightness(.5);
}
</style>
