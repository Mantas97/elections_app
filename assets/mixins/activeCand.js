import { eventBus } from '~/plugins/bus'
export const activeCand = {
    data(){
        return {
          act: "Ingrida Šimonytė",
          show: 'Darbo patirtis',
        }
    },
    methods: {
      active(name){
        this.$store.dispatch('setCurrentBio', name); //loading selected candidate bio
        this.act = name
        eventBus.$emit('changeAct', name); //emiting event so that CandList & SideNav components could listen
        
        let secName = this.show; 
        this.$store.dispatch('getCandidatesCards', [name, secName]); //load currently selected section
      }
    },
    // Listening if section was changed on main page
    created(){
        eventBus.$on('changeSec', (secName) => {
            this.show = secName;
        });
        eventBus.$on('changeAct', (name) => {
          this.act = name;
      });
    },
}