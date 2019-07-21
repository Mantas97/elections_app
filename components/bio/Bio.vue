<template>
<div>      
  <div class="row profilis">
    <h5> {{name}}</h5>
    <div class="col">
      <img class="responsive-img" v-bind:src="image" :alt="name">
    </div>
    <div class="col">
      <p class="info"><i class="material-icons">work</i>{{position}}</p>
      <p class="info"><i class="material-icons">school</i>{{education}}</p>
      <p class="info"><i class="material-icons">translate</i>{{lang}}</p>
      <p v-show="website !== '' " class="info"><i class="material-icons">public</i>{{website}}</p>
    </div>
    <div class="col">
      <p class="info"><i class="material-icons">cake</i> {{birthday}} </p>
      <p class="info"><i class="material-icons">group</i> {{family}} </p>
      <p class="info"><i class="material-icons">translate</i> {{party}}</p>
    </div>
  </div>
</div>
</template>


<script>
export default {
  props: ['birthday', 'cand_id', 'education', 'family', 'image', 'lang', 'name', 'party', 'position', 'website'],
}
</script>
