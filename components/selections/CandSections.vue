<template>
    <div class="selection2 row no_mar">        
        <div 
            v-for="sec in sections" :key="sec" 
            class="but col valign-wrapper" 
            :class="{wht_but:showPrp == sec}"
            @click="sectionC(sec)" 
        > 
            <h6 class="center-align name"> {{sec}} </h6> 
        </div>
        <div 
            class="but col valign-wrapper no_bor" 
            :class="{wht_but:showPrp == 'Komanda'}"
            @click="sectionC('Komanda')" 
        > 
            <h6 class="center-align name"> Komanda </h6> 
        </div>
    </div>
</template>
<script>
export default {
    props: {
        showPrp: {
            type: String
        }
    },
    data(){
        return{
            sections: [
                'Darbo patirtis',
                'Išsilavinimas',
                'Nepolitinės veiklos',
                'Pažiūros, pasisakymai',
                'Deklaruotas turtas'
            ]
        }
    },
    methods: {
        sectionC(sec) {
            this.$emit('changeSection', sec);
        }
    }
}
</script>
