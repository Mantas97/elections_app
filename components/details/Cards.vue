<template>
    <div class="card post_card">
        <div class="image">
            <img :src="imgLink" alt="image">
        </div>
        <div class="cont">
            <h6 class="row">{{title}}</h6>
            <p>{{content}}</p>
        </div>
        <a @click="edit(id)" class="btn-floating btn-small waves-effect waves-light red right edit" ><i class="material-icons">edit</i></a>
        <a @click="del(id)" class="btn-floating btn-small waves-effect waves-light red right delete"><i class="material-icons">delete</i></a>
    </div>
</template>


<script>
export default {
    props: ['title', 'content', 'imgLink', 'id'],

    methods: {
        edit(id){
            this.$emit('openModal', id)
        },
        del(id){
            this.$emit('delCard', id)
        }
    }
}
</script>

