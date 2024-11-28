<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../store/user'
import formInput from '../components/formInput.vue'

const store = useUserStore()

const validation = ref<{ [key: string]: string | boolean; }>({
    email: false,
    password: false
})

const changeData = (data: {type: string, value: boolean | string}) => validation.value[data.type] = data.value

const login = () => {
    if(typeof validation.value.email === 'string' && typeof validation.value.password === 'string'){
        store.getUserData('/api/auth/login', {
            email: validation.value.email, 
            password: validation.value.password
        })
    }
}
</script>

<template>
    <main>
        <form class="form" method="post" action="/api/auth/login" @submit.prevent="login">
            <form-input 
                :type="'email'" :inputmode="'email'" :name="'email'" :placeholder="'Enter your email'" :err="'Invalid email'"
                @email-valid="changeData" 
            />
            <form-input 
                :type="'password'" :name="'password'" :placeholder="'Enter your password'" :err="'Invalid password'"
                @password-valid="changeData" 
            />

            <button class="form__submitBtn" type="submit" :disabled="!validation.email || !validation.password">
                Login
            </button>
        </form>

        <p v-if="store.errorData" class="errorDB">
            {{ store.errorData }}
        </p>
    </main>
</template>

<style lang="scss" scoped>
.form{
    @include flex(column, center, center, em(10));
    max-width: 25%;
    padding: em(30) 0;
    margin: 0 auto;
}

svg{
    width: em(28);
    height: em(28);
}

button{
    @include flex(false, center, center, em(10));
}

.errorDB{
    @include text(#ff0000, em(25), 400, 115%);
    text-align: center;
    padding-top: em(20);
}
</style>