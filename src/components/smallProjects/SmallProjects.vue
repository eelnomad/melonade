<!-- SmallProjects.vue
   A hub for routing to smaller projects.-->
<template>
    <div id="small-projects">
        <div id="banner" class="f-center f-col pB-l">
            <div class="f-col f-center f-grow w-100">
                <div class="fadeInLeft f-row f-main-start w-100">
                    <p class="f-cross-start mH-xl t-center">EXPLORING CODE</p>
                </div>
                <div class="spacer"></div>
                <div class="fadeInRight f-row f-main-end w-100">
                    <p class="f-cross-end mH-xl t-center">EMBRACING FUN</p>
                </div>
            </div>
            <v-icon class="breathe mB-l" name="fa-chevron-down" scale="5" />
        </div>
        <div class="content pT-xxl" id="small-projects-list">
            <small-projects-card v-for="route in routes" :key="route.path" :route="route" class="card"></small-projects-card>
        </div>
    </div>
</template>
<script>
import SmallProjectsCard from '@/components/smallProjects/SmallProjectsCard.vue'

export default {
    name: 'small-projects',
    data() {
        return {}
    },
    created() {},
    mounted() {},
    methods: {},
    computed: {
        routes() {
            return this.$route.matched[0].children.filter(route => route.path != '')
        }
    },
    components: {
        SmallProjectsCard
    }
}
</script>
<style>
#small-projects {}

#small-projects-list {
    display: grid;
    grid-template-columns: 1fr fit-content(600px) 1fr;
    grid-auto-flow: column;
    grid-auto-rows: 200px;
    background-color: whitesmoke;
    color: black;
}

.main {
    height: 100vh;
}

.card {
    grid-column: 2;

}

.content {
    min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

#banner {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://lh3.googleusercontent.com/Y2wYl6KgubHSz3Zvh0GXN7a8_grOTse9fqbFUlwVliu3tk6HEIZNTGl-b5Z0-GYcRZoq9i_s3nFB6mEiHjxKMoaYjrOUNjBgO1GgNXDfKskM-4XB1zTGOFWRYVMOr4AvKWmxr7yRMWMzkakRrzaZe4xIqipojah7CMnY8EZO8V19yGjbdi7pLFWm7GM5fmgBU_HqS-Fu3X_Cmzf_cB6LmgaJLrYElcCEHEIsquzZKOygnR1l_Tuk475BDR-MYKXv9Tj_QQV12utkH9Klgp-D9ugxw2ur_zGEo94LeE8rw7eT-K0eFv2nEs5lCszioDyO2bgioSLMO116eraXtJK3G5FqeXRs5nb5j6Zx9bUtUBXOjq2_mn6y3REG8XxSYy6qpT31aRxM4P-yrjbTJazPMpDLgXAOkGFUy3NwTq2I9Kioil61rouKUqyvxpQda-eJkwl5j794GQhKcSmJA67Tt4Lf6mf9GPWZPdRH6CpQazB2AIP_5Q9oYzU94kritAi3m5tV_CRewOizz29auJ7A9aWJrWKQqFTh1vK-AMPpw0tt9Tf7uoC1wOQm5gPnEsn3UpPNERKVvwnlB611qJ6oyO_tjI-cr98aQybVIqOPmWH_FgmWuMZ9biQlhVkGu_0miBw6o9JXiMyr4mymuz6-B-vKtQOSTYZl4LEDIXgUxrY8KQ=w1500-h1500-no?.jpg);
    height: 101vh;
    overflow-x: hidden;
}

.breathe {
    animation: breathe 4s ease 5s infinite;
    animation-fill-mode: both;
}

.fadeInLeft {
    animation: fadeInLeft 3s ease-in-out 0.5s;
    animation-fill-mode: both;
}

.fadeInRight {
    animation: fadeInRight 3s ease-in-out 3s;
    animation-fill-mode: both;
}

.spacer {
    height: 10%;
}

@keyframes fadeInLeft {
    0% {
        opacity: 0;
        transform: translateX(20px);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeInRight {
    0% {
        opacity: 0;
        transform: translateX(-20px);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes breathe {
    0% {
        opacity: 0;
    }

    70% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

p {
    font-size: 10vw;
    color: rgba(255, 255, 255, .8);
}
</style>