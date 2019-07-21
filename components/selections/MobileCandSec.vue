<template>
    <ul class="collapsible">
        <li>
            <div class="collapsible-header valign-wrapper" @click="onOff()">
                <h5 class="center-align mob_title"> Apie Kandidatą </h5>
                <i class="material-icons mob_arrow">{{arrow}}</i>
            </div>
            <div class="collapsible-body">
                <div class="row no_mar">
                    <ul class="nav no_mar">

                        <li 
                            class="valign-wrapper waves-effect waves-light" 
                            v-for="(sec, index) in sections" :key="index" 
                            @click.prevent="handler('close', sec.name)" :class="{active_side:showPrp == sec.name}"
                        > 
                            <div class="centr"> 
                                <a href="#" :class="{active_side:showPrp == sec.name}">
                                    <i class="material-icons" :class="{active_side:showPrp == sec.name}">{{sec.logo}}</i> 
                                    {{sec.name}} 
                                </a> 
                            </div> 
                        </li>
                        
                    </ul>
                </div>
            </div>
        </li>
    </ul>
</template>


<script>
export default {
    props: {
        showPrp: {
            type: String
        },
    },
    data: function (){
        return{
            arrow: "keyboard_arrow_down",  // mobile collapsible arrow
            sections: [
                {name: 'Darbo patirtis', logo: 'work'},
                {name: 'Išsilavinimas', logo: 'school'}, 
                {name: 'Nepolitinės veiklos', logo: 'account_balance'},
                {name: 'Pažiūros, pasisakymai', logo: 'format_quote'},
                {name: 'Deklaruotas turtas', logo: 'euro_symbol'},
                {name: 'Komanda', logo: 'people'}
            ]
        }
    },
    methods: {
        // ON MENU SELECT CHANGE ARROW DIRECTION AND CLOSE COLLAPSIBLE
        onOff(check_if){
            if (this.arrow === "keyboard_arrow_down"){
                return this.arrow = "keyboard_arrow_up"
            }
            else {
                if(check_if === 'close'){
                    const c = document.querySelector('.collapsible');
                    const instance = M.Collapsible.getInstance(c);
                    instance.close();
                }
                return this.arrow = "keyboard_arrow_down"
            }
        },
        handler(check_if, list_el){
            this.onOff(check_if);
            this.$emit('changeSection', list_el)
        },
    }
}
</script>

