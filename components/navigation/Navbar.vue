<template>
    <div>
        <nav class="nav-wrapper white z-depth-2">
            <a href="#" data-target="slide-out" class="left hide-on-large-only sidenav-trigger">
                <i class="material-icons meniu">menu</i>
            </a>
            <nuxt-link to="/" class="brand-logo">
                <span class="helper"></span>  
                <img src="~static/images/logo2_512.png" alt="Logotipas"> 
            </nuxt-link>
        </nav>        
        <Sidenav/>
    </div>
    
</template>

<style scoped>
nav{
    height: 64px;
}

.helper {
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}
img{
    max-height: 30px;
    vertical-align: middle;
    margin-left: 4rem;
}
@media (max-width: 992px){
    img{
        margin-left: 0rem;
    }
}
i{
    font-size: 2.5rem!important;
    color: #93010B;
}
@media (max-width: 600px){
    i{
        margin-top: 5px;
    }
}


</style>


<script>
import Sidenav from '~/components/navigation/Sidenav'
export default {
    components: {
        Sidenav
    }
}
</script>
