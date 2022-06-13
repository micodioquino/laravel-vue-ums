<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ route.params.id ? model.title : "Create a User" }}
                </h1>

                <button
                    v-if="route.params.id"
                    type="button"
                    @click="deleteUser()"
                    class="py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red-500"
                >
                Delete User</button>
            </div>
        </template>
        <div v-if="userLoading" class="flex justify-center">Loading...</div>
        <form v-else @submit.prevent="saveUser">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div v-if="route.params.id">
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username" class="mt-1 focus:ring-gray-300 focus:border-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"  v-model="model.username" readonly>
                    </div>
                    <div>
                        <label for="firstname" class="block text-sm font-medium text-gray-700">First Name</label>
                        <input type="text" name="firstname" id="firstname" v-model="model.firstname" autocomplete="user_firstname" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <div>
                        <label for="lastname" class="block text-sm font-medium text-gray-700">Last Name</label>
                        <input type="text" name="lastname" id="lastname" v-model="model.lastname" autocomplete="user_lastname" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <div>
                        <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                        <div class="mt-1">
                            <textarea name="address" id="address" rows="3" v-model="model.address" autocomplete="user_address" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Start writing..."></textarea>
                        </div>
                    </div>

                    <div>
                        <label for="postcode">Postal Code</label>
                        <input type="number" name="postcode" id="postcode" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" v-model="model.postcode">
                    </div>

                    <div>
                        <label for="phone_number">Phone Number</label>
                        <input type="number" name="phone_number" id="phone_number" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" v-model="model.phone_number">
                    </div>

                    <div>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" v-model="model.email">
                    </div>

                    <div>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" v-model="model.password">
                    </div>
                </div>

                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                </div>

            </div>
        </form>
    </PageComponent>
</template>

<script setup>
    import store from "../store";
    import { ref, watch, computed } from "vue";
    import { useRoute, useRouter } from "vue-router";

    import PageComponent from "../components/PageComponent.vue";

    const router = useRouter();

    const route = useRoute();

    const userLoading = computed(() => store.state.currentUser.loading);

    let model = ref({
        firstname: "",
        lastname: "",
        address: null,
        postcode: null,
        phone_number: null,
        email: null,
        username: null,
        password: null,
    });

    // Watch to current user data change and when this happesn we update local model
    watch(
        () => store.state.currentUser.data,
        (newVal, oldVal) => {
            model.value = {
                ...JSON.parse(JSON.stringify(newVal)),
            };
        }
    );

    if(route.params.id){
        store.dispatch('getUser', route.params.id);
    }

    function saveUser(){
        store.dispatch("saveUser", model.value).then(({ data }) => {
            router.push({
                name: "UserView",
                params: { id: data.data.id },
            });
        });
    }

    function deleteUser(){
        if(confirm(`Are you sure you want to delete this user? Operation can't be undone!`)){
            store.dispatch("deleteUser", model.value.id).then(() => {
                router.push({
                    name: "Users",
                });
            });
        }
    }
</script>

<style>
</style>