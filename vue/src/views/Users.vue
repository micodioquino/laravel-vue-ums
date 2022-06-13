<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-900">Users</h1>
                <router-link
                    :to="{ name: 'UserCreate' }"
                    class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emeral-600"
                >
                    Add New User
                </router-link>
            </div>
        </template>

        <div>
            

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table
                    class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                >
                    <thead
                        class="text-xs uppercase bg-gray-800"
                    >
                        <tr>
                            <th scope="col" class="px-6 py-3">Full Name</th>
                            <th scope="col" class="px-6 py-3">Username</th>
                            <th scope="col" class="px-6 py-3">Email</th>
                            <th scope="col" class="px-6 py-3">Address</th>
                            <th scope="col" class="px-6 py-3">Phone Number</th>
                            <th scope="col" class="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <UserListItem 
                          v-for="user in users" 
                          :key="user.id" 
                          :user="user"
                          @delete="deleteUser(user)"
                        />
                    </tbody>
                </table>
            </div>
        </div>
    </PageComponent>
</template>

<script setup>
import store from "../store";
import { computed } from "vue";
import { useRouter } from "vue-router";
import PageComponent from "../components/PageComponent.vue";
import UserListItem from "../components/UserListItem.vue";

const users = computed(() => store.state.users.data);

const router = useRouter();

store.dispatch("getUsers");

function deleteUser(user) {
    if (confirm(`Are you sure you want to delete this user? Operation can't be undone!`)) {
       store.dispatch("deleteUser", user.id).then(() => {
            store.dispatch('getUsers');
        });
    }
}
</script>

<style scoped></style>
