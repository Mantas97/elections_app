<template>
    <div class="selection row no_mar hide-on-med-and-down">
        <div 
            v-for="name of names" :key="name" 
            class="but col valign-wrapper" 
            :class="{wht_but:act == name }"
            @click="active(name)" 
        > 
            <h6 class="center-align name"> {{name}} </h6> 
        </div> 
    </div>
</template>

<script>
// MIXINS
import { activeCand } from '~/assets/mixins/activeCand';
import { eventBus } from '~/plugins/bus';

export default {
    mixins: [activeCand],
    data(){
        return{
            names: [
                'Ingrida Šimonytė',
                'Gitanas Nausėda',
                'Mindaugas Puidokas',
                'Saulius Skvernelis',
                'Arvydas Juozaitis',
                'Vytenis Andriukaitis',
                'Valentinas Mazuronis'
            ]
        }
    },
    // Listening if active candidate was changed in Sidenav component
    created(){
        eventBus.$on('changeAct', (name) => {
            this.act = name;
        })
    }

}
</script>

