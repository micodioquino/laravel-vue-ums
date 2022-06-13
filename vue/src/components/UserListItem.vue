<template>

        <tr
            class="bg-white border-b"
        >
            <th
                scope="row"
                class="px-6 py-4 font-medium whitespace-nowrap"
            >
                {{ upperCaseFirst(user.firstname) + ' ' + upperCaseFirst(user.lastname) }}
            </th>
            <td class="px-6 py-4">{{ user.username }}</td>
            <td class="px-6 py-4">{{ user.email }}</td>
            <td class="px-6 py-4">{{ user.address ? upperCaseFirst(user.address) + ', ' + user.postcode : '-' }}</td>
            <td class="px-6 py-4">{{ user.phone_number ? user.phone_number : '-' }}</td>
            <td class="px-6 py-4 text-right flex items-center justify-between">
                <router-link
                    :to="{ name: 'UserView', params: { id: user.id } }"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                Edit
                </router-link>
                <span class="text-gray-300">|</span>
                <button
                    v-if="user.id"
                    type="button"
                    @click="emit('delete', user)"
                    class="font-medium h-8 w-8 flex items-center justify-center rounded-full border border-transparent text-sm text-red-500 hover:underline"
                >
                    Delete
                </button>
            </td>
        </tr>
    
</template>

<script setup>
    const {user} = defineProps({
        user: Object
    });

    const emit = defineEmits(['delete']);

    function upperCaseFirst(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
</script>

<style>


</style>