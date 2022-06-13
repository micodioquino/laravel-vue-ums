<template>
  <div>
    <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
      alt="Workflow" />
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Register for free</h2>
    <p class="mt-2 text-center text-sm text-gray-600">
        Or
        {{ ' ' }}
        <router-link :to="{name: 'Login'}" class="font-medium text-indigo-600 hover:text-indigo-500"> Login to your account </router-link>
      </p>
  </div>
  <form class="mt-8 space-y-6" @submit="register">
    <div v-if="errorMsg" class="py-3 px-5 bg-red-500 text-white rounded">
      <div v-for="(err, index) in errorMsg">
          {{ err }}
      </div>
    </div>
    <input type="hidden" name="remember" value="true" />
    <div class="rounded-md shadow-sm -space-y-px">
      <div>
        <label for="firstname" class="sr-only">First Name</label>
        <input id="firstname" name="firstname" type="text" autocomplete="firstname" required="" v-model="user.firstname"
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="First Name" />
      </div>
      <div>
        <label for="lastname" class="sr-only">Last Name</label>
        <input id="lastname" name="lastname" type="text" autocomplete="lastname" required="" v-model="user.lastname"
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Last Name" />
      </div>
      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input id="email-address" name="email" type="email" autocomplete="email" required="" v-model="user.email"
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Email address" />
      </div>
      <div>
        <label for="password" class="sr-only">Password</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required="" v-model="user.password"
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Password" />
      </div>
      <div>
        <label for="password_confirmation" class="sr-only">Password</label>
        <input id="password_confirmation" name="password_confirmation" type="password" autocomplete="current-password_confirmation" required="" v-model="user.password_confirmation"
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Password Confirmation" />
      </div>
    </div>

    <div>
      <button type="submit"
        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
        </span>
        Sign up
      </button>
    </div>
  </form>
</template>

<script setup>
import { LockClosedIcon } from '@heroicons/vue/solid';
import store from '../store'
import { useRouter } from 'vue-router';
import { ref } from "vue";

const router = useRouter();

const user = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirmation: ''
};

let errorMsg = ref('');

function register(ev) {
  ev.preventDefault();
  store
      .dispatch('register', user)
      .then((res) => {
        router.push({
          name: 'Dashboard'
        })
      })
      .catch(err => {
            errorMsg.value = err.response.data.errors.password
      })
}

</script>