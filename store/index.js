import Vuex from 'vuex'
import {fireDb} from '~/plugins/firebase.js'
import firebase from 'firebase/app'

const createStore = () => {
    return new Vuex.Store({
        state: {
            bio: undefined, // ALL candidates bio
            currentBio:{}, 
            cards: undefined,
            editCard: undefined
        },
        mutations: {
            changeCurrentBio(state, payload){
                let newCurrentBio = state.bio.find(x => x.name == payload);
                state.currentBio = newCurrentBio;
            },
            // Runs only when page is reloaded
            setCandidatesBio(state, payload){
                state.bio = payload;
                state.currentBio = state.bio.find(x => x.name == "Ingrida Šimonytė");
            },
            setCurrentCards(state, payload){
                state.cards = payload;
            },
            setActiveCandidate(state, payload){
                state.act = payload;
            },
            setActiveSection(state, payload){
                state.sec = payload;
            },
            setEditCard(state, payload){
                // undefined is returned when edited card is saved
                if (payload == undefined){
                    state.editCard = undefined
                }
                else{
                    const cards = Object.values(state.cards);
                    const editCard = cards.find(x => x.id == payload);
                    state.editCard = editCard;
                }
            }
        },
        actions: {          
            // FETCHING ALL 7 CANDIDATES INFO ON LOAD
            getCandidatesBio({commit}){

                const docRef = fireDb.collection("candidates").orderBy('name');
                docRef.get().then( callback => {
                        // console.log("Candidates collection data: ", callback);
                        const cand = [];
                        callback.docs.forEach( doc => {
                            cand.push(doc.data())
                        })
                        commit('setCandidatesBio', cand);

                }).catch(error =>  {
                    console.log("Error getting document:", error);
                });
            },

            //  LOADING NEW CANDIDATE @CLICK
            setCurrentBio({commit}, payload){
                commit('changeCurrentBio', payload);
            },

            //  LOADING CANDIDATE CARDS ONLOAD OR @CLICK
            getCandidatesCards( {commit}, payload = ['Ingrida Šimonytė', 'Darbo patirtis'] ){
                let docRef = fireDb.collection("candidates").doc(payload[0]).collection('info').doc(payload[1]);
    
                docRef.get().then( callback => {
                    // console.log("Candidates info document data: ", callback.data());
                    let cards = callback.data();

                    // Check if any cards exist in that section
                    if (Object.entries(cards).length === 0 && cards.constructor === Object){
                        cards = undefined;
                    }

                    commit('setCurrentCards', cards);

                }).catch(error =>  {
                    console.log("Error getting document:", error);
                });
            },

            addCard({commit, dispatch}, payload){
                // Generate unique id without creating new document
                const ref = fireDb.collection("candidates").doc();
                let id = ref.id;
                // Map's (firestore DB datatype == object) name will be unique id and same id will be stored inside map(object), 
                // because that's the only way to find map inside the firestore document
                payload.id = id;

                const name = payload.docRef.split('/')[2];
                const section = payload.docRef.split('/')[4];

                fireDb.doc(payload.docRef).set({
                    [id]: payload       
                }, { merge: true })
                .then(() => {
                    console.log("Document successfully written!");
                    dispatch('getCandidatesCards', [name, section]);
                })
                .catch(error =>  {
                    console.error("Error writing document: ", error);
                });
            },

            deleteCard({commit}, payload){
                let cardID = payload.cardID;
                // console.log("Store function id: " + cardID);

                fireDb.doc(payload.docRef).update({
                    [cardID]: firebase.firestore.FieldValue.delete()
                })
                .then(() => {
                    console.log("Card successfully deleted!");
                })
                .catch(error => {
                    console.error("Error deleting a card: ", error);
                });
            },

            getEditCard({commit}, payload){
                commit('setEditCard', payload);
            },

            updateCard({commit, dispatch}, payload){

                const name = payload.docRef.split('/')[2];
                const section = payload.docRef.split('/')[4];

                fireDb.doc(payload.docRef).update({
                    [payload.id]: payload       
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    commit('setEditCard', undefined);
                    dispatch('getCandidatesCards', [name, section]);
                })
                .catch(error =>  {
                    console.error("Error writing document: ", error);
                });
            }

        },
        getters: {
            currentBio(state){
                return state.currentBio;
            },
            currentCards(state){
                return state.cards;
            },
            currentEditCard(state){
                return state.editCard;
            }
            
        }
    })
}


export default createStore;