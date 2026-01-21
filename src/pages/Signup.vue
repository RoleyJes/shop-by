<script setup>
import BreadCrumbs from "@/ui/BreadCrumbs.vue"
import FormField from "@/ui/FormField.vue"
import RegistrationLayout from "@/ui/RegistrationLayout.vue"

const breadcrumbs = [
  {
    path: "/",
    label: "Home",
  },
  {
    label: "Account",
  },
]
</script>

<template>
  <BreadCrumbs :breadcrumbs="breadcrumbs" />
  <main>
    <RegistrationLayout
      header="Create Account"
      description="Please register using account detail below."
      buttonText="Create"
      below-button-text="Return to Store"
      below-button-path="/"
    >
      <div class="space-y-5">
        <FormField
          inputType="text"
          placeholder="First Name"
          label="First Name"
          inputId="firstName"
        />
        <FormField inputType="text" placeholder="Last Name" label="Last Name" inputId="lastName" />
        <FormField inputType="text" placeholder="Email" label="Email" inputId="email" />
        <FormField inputType="text" placeholder="Password" label="Password" inputId="password" />
      </div>
    </RegistrationLayout>
  </main>
</template>

<style lang="scss" scoped></style>
