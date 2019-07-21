<template>
  <section class="background">
    <div class="row title">
      <h4 class="center-align"> Kandidatai į prezidentus</h4>
    </div>

    <section class="content">

      <CandList></CandList>
      
      <no-ssr><Bio 
        :birthday="currentBio.birthday"
        :cand_id="currentBio.cand_id"
        :education="currentBio.education"
        :family="currentBio.family"
        :image="currentBio.img"
        :lang="currentBio.languages"
        :name="currentBio.name"
        :party="currentBio.party"
        :position="currentBio.position"
        :website="currentBio.website"
      /></no-ssr>
       
      
      <section class="sec2">
        <div class="sec_bord">

          <CandSections :showPrp='show' @changeSection="section(`${$event}`)"></CandSections>

          <MobileCandSec :showPrp='show' @changeSection="section(`${$event}`)"></MobileCandSec>

          <div class="row details no_mar">

            <h5> {{show}} </h5>
            <a class="btn-floating btn-large waves-effect waves-light red right modal-trigger" href="#modal1"><i class="material-icons">add</i></a>
            <!-- Modal Structure -->
            <div id="modal1" class="modal">
              <Modal 
                :candName="currentBio.name" 
                :section="show"
                @submitForm="closeModal($event)"
                ref="modal"
                />
            </div>

            <h5 v-if="currentCards == undefined">Informacijos šioje skiltyje nėra, palikite pirmą įrašą!</h5>
            <Cards
              v-else 
              v-for="(card, index) in currentCards" :key="index"
              :title="card.title"
              :content="card.content"
              :imgLink="card.downloadLink"
              :id="card.id"
              @openModal="openModal($event)"
              @delCard="deleteCard($event)"
            />
            
          </div>

        </div>

      </section>

    </section>    

  </section>
</template>


<script>

// COMPONENTS
import Bio from '~/components/bio/Bio'
import Cards from '~/components/details/Cards'
import Modal from '~/components/details/Modal'
import CandList from '~/components/selections/CandList'
import CandSections from '~/components/selections/CandSections'
import MobileCandSec from '~/components/selections/MobileCandSec'

// MIXINS
import { activeCand } from '~/assets/mixins/activeCand'
// CUSTOM PLUGINS
import { eventBus } from '~/plugins/bus'

export default {
  mixins: [activeCand],
  components: {
    Bio,
    Cards,
    Modal,
    CandList,
    CandSections,
    MobileCandSec
  },
  methods: {
    // Change current section name and fetch new cards
    section(secName) {
      let name = this.currentBio.name;
      eventBus.$emit('changeSec', secName);
      this.$store.dispatch('getCandidatesCards', [name, secName]);
      return this.show = secName;
    },
    // Get data on load
    loadData(){
      this.$store.dispatch('getCandidatesBio');
      this.$store.dispatch('getCandidatesCards');
    },
    closeModal(){
      var elem = document.getElementById('modal1');
      var instance = M.Modal.getInstance(elem);
      instance.close();
    },    
    openModal(id){
      var elem = document.getElementById('modal1');
      var instance = M.Modal.getInstance(elem);
      this.$refs.modal.loadFields(id);
      instance.open();
      
    },
    deleteCard(id){
      let cardID = id;
      let docRef = "/candidates/" + this.act + "/info/" + this.show;
      console.log("deleteCard docRef: " + docRef);

      this.$store.dispatch('deleteCard', {
        cardID: id,
        docRef: docRef
      })

      // Load updated cards object
      this.$store.dispatch('getCandidatesCards', [this.act, this.show]);
    }

  },

  computed: {
    currentBio(){
      return this.$store.getters.currentBio;
    },
    currentCards(){
      return this.$store.getters.currentCards;
    },

  },

  // Before creating DOM, getting first candidate data
  beforeMount(){
    this.loadData();
  },

  mounted(){
    M.AutoInit();
  },

  head(){
      return{
        link:[
            {rel:"stylesheet", href:"/styles/main.css"},
        ]
      }
  }

}
</script>

<style scoped>
@media only screen and (max-width: 500px) {
  .modal {
      width: 100% !important;
  }
}
</style>

