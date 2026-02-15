import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProjectsPage from '../views/ProjectsPage.vue'
import ContactView from '../views/ContactView.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView,
        },
        {
            path: "/About",
            component: AboutView,
        },

        {
            path: "/Projects",
            component: ProjectsPage
        },
        {
            path: "/contact",
            component: ContactView
        }
    ],
})

export default router
