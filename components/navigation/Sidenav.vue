<template>
    <div id="slide-out" class="sidenav mobile-nav">
        <h5>Kandidatai į prezidentus:</h5>
        <ul class="sidenav_buttons">
            <li v-for="name of names" :key="name" @click="active(name)" ><a :class="{selected:act == name}"> {{name}} </a></li>
        </ul>
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
    // Listening if active candidate was changed in CandList component
    created(){
        eventBus.$on('changeAct', (name) => {
            this.act = name;
        });
    },
    mounted(){
        M.AutoInit();
    }
}
</script>



<style scoped>
/* mobile meniu */
.sidenav{
    width: 320px!important;
    padding-top: 4rem;
}
.mobile-nav{
    background-color: #fafafa!important;
}
h5{
    font-family: 'Raleway', sans-serif;
    font-weight: 900;
    font-size: 1.7rem;
    background-color: #93010B;
    color: white;
    line-height: 4rem;
    padding-left: 2rem;
    
}
ul.sidenav_buttons li a{
    font-family: 'RisingSunRegular';
    font-size: 1.3rem;
    font-weight: 500;
    color: #757575;
    border-bottom: 1px solid #e6e4e4;
    padding: 0 2rem;
    cursor: pointer;
}
ul.sidenav_buttons li a:hover{
    color:#93010B;
}
.selected{
    color: #93010B !important;
    background-color: rgba(0, 0, 0, 0.05);
}
@media (max-width: 420px){
    .sidenav{
        width: 80%!important;
    }
    h5{
        font-size: 5vw;
    }
    ul.sidenav_buttons li a{
        font-size: 4vw;
    }
}

</style>


