<template>
    <router-view></router-view>
</template>
<script>
export default {
    name: 'app',
    data() {
        return {}
    },
    created() {
        if (!localStorage.getItem('melonade_device_id')) {
            var d = Date.now()
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random() * 16) % 16 | 0
                d = d / 16 | 0
                return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16)
            })
            localStorage.setItem('melonade_device_id', uuid)
        }
    },
    components: {},
    computed: {}
}
</script>
<style lang="scss">
// imports
@import url('https://fonts.googleapis.com/css?family=Sacramento|Fredericka+the+Great|Quicksand');

// general 
* {
    color: dimgrey;
    margin: 0;
    padding: 0;
    font-family: 'Quicksand', sans-serif;
    font-size: 1em;
    font-style: normal;
    font-variant: normal;
}

body {
    height: 100vh;
    width: 100vw;
}

span {
    flex: 99 1 auto;
}

a {
    text-decoration: none;
}

// flex classes 
.f-center {
    justify-content: center;
    align-items: center;
}

.f-col {
    display: flex;
    flex-direction: column;
}

.f-grow {
    flex: 99 1 auto;
}

.f-row {
    display: flex;
    flex-direction: row;
}

.f-wrap {
    flex-wrap: wrap;
}

// margin + padding
$directions: ('T': 'top',
'B': 'bottom',
'L': 'left',
'R': 'right'
);
$sizes: ('s': .33em,
'm': .66em,
'l': 1em,
);

@each $sizeName,
$sizeVal in $sizes {
    .m-#{$sizeName} {
        margin: $sizeVal
    }
    .p-#{$sizeName} {
        margin: $sizeVal
    }
    @each $directionShort, $directionLong in $directions {
        .m#{$directionShort}-#{$sizeName} {
            margin-#{$directionLong}: $sizeVal
        }
        .p#{$directionShort}-#{$sizeName} {
            margin-#{$directionLong}: $sizeVal
        }
    }
}

// scrollbar
</style>