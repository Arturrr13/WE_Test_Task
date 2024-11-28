<script setup lang="ts">
import { api } from '../../assets/js/axiosApi'
import { ref, watch, computed } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import formInput from '../../components/formInput.vue'
import { userData } from '../../../types'

const idGet = ref('')
const idDelete = ref('')
const idUpdate = ref('')

const resUser = ref<userData>()
const resAllUsers = ref<Array<userData>>()
const message = ref()
const resError = ref(false)

const flow = ref<("time" | "month" | "year" | "calendar" | "minutes" | "hours" | "seconds")[]>(['year', 'month', 'calendar'])
const date = ref()

const validation = ref<{ [key: string]: string | boolean; }>({
    fName: false,
    lName: false,
    data: false,
    email: false,
    phone: false,
    image: false
})

const emailValiError = ref(false)

const validationStatus = computed(() => {
    for(let el in validation.value) if(validation.value[el]) return true
    return false
})

const newMessage = (mes: string) => {
    message.value = mes
    setTimeout(() => {message.value = false}, 3000)
}

const changeData = (data: {type: string, value: boolean | string}) => {
    validation.value[data.type] = data.value
    if(data.type === 'email' && data.value === false) emailValiError.value = true
    else if(data.type === 'email' && typeof data.value === 'string') emailValiError.value = false
}
const checkValue = (e: Event) => {
    const input = e.target as HTMLInputElement
    // @ts-ignore
    changeData({type: input.getAttribute('validation'), value: input.value})
}

watch(date, () => {
    const day = date.value.getDate()
    const month = date.value.getMonth() + 1
    const year = date.value.getFullYear()

    validation.value.data = day+'/'+month+'/'+year
})

const sendImage = (e: Event) => {
    const target = e.target as HTMLInputElement
    const file: File = (target.files as FileList)[0]
    const reader = new FileReader()
    reader.onload = (evt: any) => validation.value.image = evt.target.result

    reader.readAsDataURL(file)
}

const createUser = () => {
    api.post(`/api/form`, {
        fName: validation.value.fName,
        lName: validation.value.lName,
        data: validation.value.data,
        email: validation.value.email,
        phone: validation.value.phone,
        image: validation.value.image
    })
    .then((res) => {
        console.log(res.data)
        resError.value = false
        newMessage(`User was created`)
    })
    .catch((err) => resError.value = err)
}

const updateUserData = () => {
    api.put(`/api/form/${idUpdate.value}`, {
        fName: validation.value.fName,
        lName: validation.value.lName,
        data: validation.value.data,
        email: validation.value.email,
        phone: validation.value.phone,
        image: validation.value.image
    })
    .then((res) => {
        console.log(res.data)
        resError.value = false
        newMessage(`User's data was updated`)
    })
    .catch((err) => {
        resError.value = err
        newMessage(`User not found`)
    })
}

const deleteUser = () => {
    api.delete(`/api/form/${idDelete.value}`)
    .then((res) => {
        console.log(res.data)
        newMessage(res.data.message)
        resError.value = false
    })
    .catch((err) => {
        resError.value = err
        newMessage(`User not found`)
    })
}

const getUser = () => {
    api.get(`/api/form/${idGet.value}`)
    .then((res) => {
        resUser.value = res.data
        resError.value = false
    })
    .catch((err) => {
        resError.value = err
        newMessage(`User not found`)
    })
}

const getAllUsers = () => {
    api.get('/api/form')
    .then((res) => {
        resAllUsers.value = res.data
        resError.value = false
    })
    .catch((err) => {
        resError.value = err
        newMessage(`Users not found`)
    })
}
</script>

<template>
    <main>
        <div class="message" :class="{ error: resError }" v-if="message">
            <span>
                {{ message }}
            </span>
        </div>
        <div class="createUser block">
            <form class="form" method="post" action="/api/user" @submit.prevent="createUser">
                <input type="text" name="first name" validation="fName" @input="checkValue" placeholder="First name">
                <input type="text" name="last name" validation="lName" @input="checkValue" placeholder="Last name">
                <VueDatePicker v-model="date" :flow="flow" :dark="true" :enable-time-picker="false"></VueDatePicker>
                <form-input 
                    :type="'email'" :inputmode="'email'" :name="'email'" :placeholder="'Email'" :err="'Invalid email'"
                    @email-valid="changeData" 
                />
                <input type="text" name="phone" validation="phone" @input="checkValue" placeholder="Phone number">
                <div class="form__logo">
                    <input 
                        type="file" 
                        accept=".jpg, .jpeg, .png"
                        @change="sendImage"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                        <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z"/>
                    </svg>
                </div>

                <div class="form__image" v-if="typeof validation.image === 'string'">
                    <img :src="validation.image" alt="Message">
                </div>

                <button type="submit" class="form__submitBtn" :disabled="!validationStatus || emailValiError">
                    Create new user
                </button>
            </form>

            <form class="form" method="post" action="/api/user" @submit.prevent="updateUserData">
                <input type="text" name="name" v-model="idUpdate" placeholder="User ID">

                <button type="submit" class="form__submitBtn" :disabled="idUpdate.length < 1">
                    Update user data
                </button>
            </form>
        </div>


        <div class="deleteUser block">
            <form class="form" method="delete" action="/api/user" @submit.prevent="deleteUser">
                <input type="text" name="id" v-model="idDelete" placeholder="User ID">

                <button type="submit" class="form__submitBtn" :disabled="idDelete.length < 1">
                    Delete user
                </button>
            </form>
        </div>

        <div class="getUser block">
            <form class="form" method="get" action="/api/user" @submit.prevent="getUser">
                <input type="text" name="name" v-model="idGet" placeholder="User ID">

                <button type="submit" class="form__submitBtn" :disabled="idGet.length < 1">
                    Get user
                </button>
            </form>

            <div class="getUser__item" v-if="resUser">
                <p>
                    Name: <span>{{ resUser.firstname }} {{ resUser.lastname }}</span>
                </p>
                <p>
                    ID: <span>{{ resUser.id }}</span>
                </p>
                <p>
                    Email: <span>{{ resUser.email }}</span>
                </p>
                <p>
                    Date: <span>{{ resUser.dateofbirth }}</span>
                </p>
                <p>
                    Phone number: <span>{{ resUser.phone }}</span>
                </p>
                <div class="form__image">
                    <img :src="resUser.logo" alt="Message">
                </div>
            </div>
        </div>

        <div class="getAllUser block">
            <form class="form" method="get" action="/api/users" @submit.prevent="getAllUsers">
                <button type="submit">
                    Get all users
                </button>
            </form>

            <div class="getAllUser__list" v-if="resAllUsers">
                <div class="getAllUser__list--item" v-for="item in resAllUsers" :key="item.id">
                    <p>
                        Name: <span>{{ item.firstname }} {{ item.lastname }}</span>
                    </p>
                    <p>
                        ID: <span>{{ item.id }}</span>
                    </p>
                    <p>
                        Email: <span>{{ item.email }}</span>
                    </p>
                    <p>
                        Date: <span>{{ item.dateofbirth }}</span>
                    </p>
                    <p>
                        Phone number: <span>{{ item.phone }}</span>
                    </p>
                    <div class="form__image">
                        <img :src="item.logo" alt="Message">
                    </div>
                </div>
            </div>
        </div>

        <span v-if="resError" class="errorDB">
            {{ resError}}
        </span>
    </main>
</template>

<style lang="scss" scoped>
main{
    @include flex(column, center, false, em(20));
    padding: em(30) 0;
    position: relative;
    overflow: hidden;
}

.block{
    padding: em(20) em(30);
    border: em(2) solid #E7A003;
    border-radius: em(15);
    max-width: em(600);
    width: 100%;
    @include flex(column, center, false, em(30));

    &__result{
        @include text(#ffffff, em(20), 400, 115%);
    }
}

.errorDB{
    @include text(#ff0000, em(25), 400, 115%);
}

.form{
    @include flex(column, center, false, em(10));

    &__image{
        width: 100%;
        height: em(220);
    }
}

.form__logo{
    position: relative;
    @include flex(false, center, center, false);
    width: em(50);
    height: em(50);
    border-radius: 50%;
    border: em(1) solid #A4A4A4;
    background: transparent;

    input[type=file]{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }

    svg{
        height: em(23);
        path{
            fill: #A4A4A4;
        }
    }

    &:hover{
        border: em(1) solid #2CFA6F;
        svg path{
            fill: #2CFA6F;
        }
    }
}

.getUser__item, .getAllUser__list--item{
    @include text(#ffffff, em(24), 400, 115%);
}

.message{
    @include text(#ffffff, em(28), 400, 115%);
    padding: em(10) em(20);
    border-radius: em(10);
    background: #26ff00c6;
    position: fixed;
    top: em(20);
    right: em(20);

    animation: messageAnim 3s ease-in-out infinite alternate;

    &.error{
        background: #ff0000c6;
    }
}

@keyframes messageAnim {
    0% {
        opacity: 0; transform: translateX(200%);
    }
    10% {
        opacity: 1; transform: translateX(0);
    }
    90% {
        opacity: 1; transform: translateX(0);
    }
    100% {
        opacity: 0; transform: translateX(200%);
    }
}
</style>