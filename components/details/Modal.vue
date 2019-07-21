



<template>
    <div>

        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat" @click="clearFields">Išjungti</a>
        </div>
        <div class="modal-content">
            <h4>Įrašo įkėlimas</h4>

            <div class="input-field col s12 m8 offset-m2 l8 offset-l2">
                <input id="title" type="text" class="validate" v-model="title">
                <label for="title" :class="{active:edit == true}" >Antraštė</label>
            </div>

            <div class="input-field col s12 m8 offset-m2 l8 offset-l2">
                <textarea id="description" class="materialize-textarea" maxlength="120" v-model="content"></textarea>
                <label for="description" :class="{active:edit == true}" >Turinys</label>
            </div>

            <div class="file-field input-field col s12 m8 offset-m2 l8 offset-l2">
                <div class="btn">
                    <span>Nuotrauka</span>
                    <input type="file" @change="upload" ref="imageUploader" @click="resetImageUploader">
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text"  id="ikelimas" >
                    <div class="uploader"> 
                        <progress :value="prog" max="100"></progress>
                    </div> 
                    <i class="material-icons delete_img" v-show="prog == 100" @click="deleteUpload">close</i>
                </div>
            </div>
            
            <div class="input-field col s12 m8 offset-m2 l8 offset-l2" v-if="error">
                <h6 v-if="errorMsg"> 
                    <i class="material-icons error_icon">error_outline</i> 
                    Palaukite kol įkels paveikslėlį ({{Math.round(prog)}}%) arba užpildykite visus laukus
                </h6>
                <h6 v-else>
                    <i class="material-icons good_icon">check</i> 
                    Laukai užpildyti
                </h6>
            </div>

            <div class="input-field col s12 m8 offset-m2 l8 offset-l2">
                <div v-if="edit == true" class="button" @click="submitForm"> Atnaujinti </div>
                <div v-else class="button" @click="submitForm"> Įkelti </div>
            </div>

        </div>
    </div>
</template>


<script>
import {storage} from '~/plugins/firebase.js'
export default {
    props: ['candName', 'section'],
    data(){
        return{
            prog: 0,
            imageRef: undefined,
            title: undefined,
            content: undefined,
            downloadLink: undefined,
            error: false,
            edit: false,
            editID: undefined
        }
    },
    methods: {
        //clears the value so that the same image could be selected again
        resetImageUploader() {
            this.$refs.imageUploader.value = '';
        },
        // IMAGE UPLOAD
        upload(e){
            console.log("Upload pasileido");
            // Inside the uploadTask function there's no access to 'this', so vm is needed
            var vm = this;
            vm.progress = 0;


            // Check if file is selected
            var file = e.target.files || e.dataTransfer.files;
            if (!file.length)
                return alert('Pasirinkite teisingą failą');
            
            // File name and file reference path in database
            let filename = file[0].name;
            var imgRef = '/posted_images/' + this.candName + '/' + this.section + '/' + filename;
            vm.imageRef = imgRef; //for deleting

            var uploadTask = storage.ref(imgRef).put(file[0]);
            uploadTask.on('state_changed', 
                snapshot => {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    vm.prog = progress;
                    if(vm.prog == 100){
                        vm.prog = 99;
                    }
                    console.log('Upload is ' + vm.prog + '% done');
                }, 
                error => {
                    console.log('Error while uploading image: ' + error);
                }, 
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        vm.prog = 100;
                        console.log('Upload is ' + vm.prog + '% done');
                        vm.downloadLink = downloadURL;
                        return;
                    });
                }
            );
        },

        deleteUpload(){
            var vm = this;
            storage.ref(this.imageRef).delete()
            .then(() => {
                console.log("File deleted successfully");
                vm.prog = 0;
                vm.downloadLink = undefined;
                document.getElementById("ikelimas").value = '';
            }).catch(error => {
                console.log("Error while deleting file" + error);
            });
        },

        submitForm(){
            // If fields are empty error message shows up
            if(this.prog==100 && this.content!=undefined && this.imageRef!=undefined && this.downloadLink!=undefined){

                let docRef = "/candidates/" + this.candName + "/info/" + this.section;

                // Edit card
                if (this.edit === true){
                    this.$store.dispatch('updateCard', {
                        title: this.title,
                        content: this.content,
                        imageRef: this.imageRef,
                        downloadLink: this.downloadLink,
                        docRef: docRef,
                        id: this.editID
                    })
                }
                //New Card
                else{
                    this.$store.dispatch('addCard', {
                        title: this.title,
                        content: this.content,
                        imageRef: this.imageRef,
                        downloadLink: this.downloadLink,
                        docRef: docRef,
                    })
                }
                // Closes modal
                this.$emit('submitForm');
                this.clearFields();
            }
            else
                this.error = true;
        },

        // Clears fields on modal close or after upload
        clearFields(){
            this.prog = 0;
            this.imageRef = undefined;
            this.title = undefined;
            this.content = undefined;
            this.downloadLink = undefined;
            this.error = false;
            this.edit = false;
            this.editID = undefined;
            document.getElementById("ikelimas").value = '';
        },

        // Load fields for card editing
        loadFields(id){
            this.$store.dispatch('getEditCard', id);
            const editCard = this.$store.getters.currentEditCard;
            
            this.edit = true;
            this.editID = id;
            this.title = editCard.title;
            this.content = editCard.content;
            this.imageRef = editCard.imageRef;
            this.downloadLink = editCard.downloadLink;
            this.prog = 100;

            let path = editCard.imageRef.split('/');
            let imageName = path[path.length - 1];
            document.getElementById("ikelimas").value = imageName;
        }
    },

    computed: {
        errorMsg(){
            if(this.error = true){
                if(this.title == undefined || this.content == undefined || this.prog != 100){
                    return true;
                }
                else
                    return false
            }
        }
    }
}
</script>

