<script setup>
import { useAuthStore } from "@/stores/auth";
import BreadCrumbs from "@/ui/BreadCrumbs.vue";
import FormField from "@/ui/FormField.vue";
import RegistrationLayout from "@/ui/RegistrationLayout.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const breadcrumbs = [
  {
    path: "/",
    label: "Home",
  },
  {
    label: "Account",
  },
];

const email = ref("test@example.com");
const password = ref("password123");

async function handleLogin() {
  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    });
    console.log("logged in");
    router.push({ name: "home" });
  } catch (err) {
    console.error(err.message);
  }
}
</script>

<template>
  <BreadCrumbs :breadcrumbs="breadcrumbs" />
  <main>
    <RegistrationLayout
      :handleFormSubmit="handleLogin"
      header="Login"
      description="Please login using account detail below."
      buttonText="Login"
      other-page-path="/account/forgot-password"
      other-page-text="Forgot your password?"
      below-button-text="Create account"
      below-button-path="/account/register"
    >
      <div class="space-y-5">
        <FormField inputType="text" placeholder="Email" id="email" v-model="email" />
        <FormField
          inputType="text"
          placeholder="Password"
          type="password"
          id="password"
          v-model="password"
        />
      </div>
    </RegistrationLayout>
  </main>
</template>

<style lang="scss" scoped></style>
