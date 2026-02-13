import Blog from "@/pages/Blog.vue";
import Cart from "@/pages/Cart.vue";
import Checkout from "@/pages/Checkout.vue";
import ForgotPassword from "@/pages/auth/ForgotPassword.vue";
import Home from "@/pages/Home.vue";
import Login from "@/pages/auth/Login.vue";
import Signup from "@/pages/auth/Signup.vue";
import Wishlist from "@/pages/Wishlist.vue";
import CollectionsView from "@/ui/CollectionsView.vue";
import GeneralLayout from "@/ui/GeneralLayout.vue";
import { createRouter, createWebHistory } from "vue-router";
import Account from "@/pages/Account.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: GeneralLayout,
      children: [
        {
          path: "",
          name: "home",
          component: Home,
        },
        {
          path: "collections",
          redirect: "collections/all",
        },
        {
          path: "collections/:collection",
          name: "collections",
          component: CollectionsView,
        },
        {
          path: "blog",
          component: Blog,
        },
        // {
        //   path: 'products/:id',
        //   name: 'product-details',
        //   // component: ProductDetail,
        //   component: PiniaProductDetail,
        // },
        {
          path: "wishlist",
          component: Wishlist,
          meta: { requiresAuth: true },
        },
        {
          path: "cart",
          name: "cart",
          component: Cart,
          meta: { requiresAuth: true },
        },
        {
          path: "checkout",
          name: "checkout",
          component: Checkout,
          meta: { requiresAuth: true },
        },

        {
          path: "account",
          name: "account",
          meta: { requiresAuth: true },
          component: Account,
        },
        {
          path: "account/login",
          name: "login",
          meta: { requiresGuests: true },
          component: Login,
        },
        {
          path: "account/register",
          name: "signup",
          meta: { requiresGuests: true },
          component: Signup,
        },
        {
          path: "account/forgot-password",
          name: "forgot-password",
          meta: { requiresGuests: true },
          component: ForgotPassword,
        },

        // {
        //   path: 'account',
        //   redirect: 'account/profile',
        //   component: AccountLayout,
        //   meta: { requiresAuth: true },
        //   children: [
        //     {
        //       path: 'profile',
        //       name: 'profile',
        //       component: Profile,
        //     },
        //     {
        //       path: 'address',
        //       name: 'address',
        //       component: UserAddress,
        //     },
        //   ],
        // },

        // {
        //   path: 'auth',
        //   component: AuthLayout,
        //   name: 'auth',
        //   redirect: '/auth/login',
        //   meta: { requiresGuests: true },
        //   children: [
        //     {
        //       path: 'login',
        //       name: 'login',
        //       component: LogIn,
        //     },
        //     {
        //       path: 'signup',
        //       component: SignUp,
        //     },
        //   ],
        // },
      ],
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    // back/forward button
    if (savedPosition) {
      return savedPosition;
    }

    // default: scroll to top
    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: "login" };
  }

  if (to.meta.requiresGuests && authStore.isAuthenticated) {
    return { name: "home" };
  }
});

export default router;
