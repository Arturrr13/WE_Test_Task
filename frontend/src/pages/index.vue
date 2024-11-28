<script setup>
import { useUserStore } from '../store/user'

const store = useUserStore()
</script>

<template>
    <main>
        <h1>
            H . O . M . E
        </h1>

        <div v-if="store.userData" class="name">
            <p>
                Name: <span>{{ store.userData[0].name }}</span>
            </p>
            <p>
                ID: <span>{{ store.userData[0].id }}</span>
            </p>
            <p>
                Email: <span>{{ store.userData[0].email }}</span>
            </p>
            <p>
                Date: <span>{{ store.userData[0].tstz }}</span>
            </p>
            <p>
                Account Status: <span>{{ store.userData[0].isactive }}</span>
            </p>
            <p>
                Access Token: <span>{{ store.userData[1].access_token }}</span>
            </p>
		</div>
    </main>
</template>

<style lang="scss" scoped>
main{
    @include flex(column, center, center, false);
}

h1{
    @include text(#E7A003, em(69), 700, 100%);
}

.name{
    @include flex(column, flex-start, center, em(10));
    word-break: break-all;
    width: 80vw;

    p{
        @include text(#40ff00, em(25), 700, 100%);

        span{
            color: #E7A003;
        }
    }
}
</style>