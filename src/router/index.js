import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Blog from '@/components/Blog'
import BlogPost from '@/components/BlogPost'
// import League from '@/components/League'
// import About from '@/components/About'
import WIP from '@/components/WIP'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      description: 'You are Home!'
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog,
      display_name: 'My Blog',
      description: 'Here is my blog!',
      level: 'home',
      background_image: 'https://lh3.googleusercontent.com/9sPGU35bYAUlVVS7awmiJ3ye9QJ74T0E_SyTqKAP6NI0cLmMwq3XfZHhE5XwXzAWxIAFLNGNdpFR5oR1nVOX7eTNZ7Ssx-44CX0GDsDHw_yOZjAhGCb3cHdPj8Vw4x614z52wkObt5gJwqRe8hT58CkYSnF0hzre4RcpSgfcC7IQ5Gw7Y67bkYtX5nejlkw0EAIKbGkPIiwBy9lYPvUxcnDWv7Muto_wAGd_g-zuux8aMCCihvY44l9ph-gxymyscMG5KuxfNeo_usRUQYbB2pI6gtDp6pnt_mODKmMSv18ozVjHFmNvkw-9_D0F_Bq9_VRN8kbNyYUV8TnlAQLa4kbvMFK4G9QN01Eq3tHqyyBW_ipGfzR3t68q_RXpGT283DLxSYvs1fPP_2BdGaZpAOfGbUsijMPSRYJAo1TWRLvWaWd1fn_6yFeJPIVSykpioCuoKlkZmxNFyfg967MF5wp9RwbYUuLGHcSJ76LEQKitRUm7p5iPLn5vbtfLAtc-7iOF6ex3NH1g7WGGu6Cr52VzvViCc0QQ-1609kIZ2PMoRdxTMOkt-GgMQS_QeSLI9UYXMkkRfALO6iykcqN2TE6evbMFNJOALwLb1s8Xy683k7w8ashPsMuiITZq0ClW2a8lFisvWQyLCdUZ7xAP6E9NPLNREceSzSxUEhAfqgW4zg=w1425-h950-no'
    },
    {
      path: '/blog/:post_id',
      name: 'blogPost',
      component: BlogPost
    },
    {
      path: '/league',
      name: 'league',
      component: WIP,
      display_name: 'League of Legends Analysis',
      description: 'Hopefully some fancy league of legends analytics',
      level: 'home',
      background_image: 'https://lh3.googleusercontent.com/N5imive56r3ZdacQC-lWcKX7yXN32IaJRpbFkLQN3jkI4vAO1aG3yvn3qLSj9b8fgjVpHatOZY1I7KxOa3Alt2Dot3K3XijSQ2WSLqVCbslxKJi4zYVBzs40Blv-OsTHyl-3MwaTPGHPJ3DpAsPtXpJ0D7MkAGEb7prwGEhD7s5W6DvjfpIUvt_hoS3uh25rsDF8dOWQUlCMtV5yuqmNWhuyLEVF-tpOny4x_n_ztxLc31ysvnOt0L73BlvybI2FLco-tymeDz-fSv7UBZ8nPSUF4ySUSJjMO59AtFSjVhezyTw6oXC1p2k-Lc-0kioaoToCajxp74rTSR1ApVdMVyN6w1HuhfVDQGDBF2oN2rTcdQTnMCwaCxfiEOzdG8J53l2at3zhimmZYqW0YBrqriOT1V8NCKGVAAksBbUdXsglt37pvKIFfKAGyVm-EdgKhXrllCi4wqtqcDi8qnFk4sEyWlYDc3dGNlYgAcJh1RgdZP3sJ6-ZsFilFneJffRk-4lYQ2YwZqrkYAcjSYpRmf11hxjHv1mrPXYt0k__l9o3UVHFVS9moSjJZ2Tlf9D59ALDGNS4TVe9BPGM4lYrq2y2Sc01xE33_w7fxm1K4WCH5TrltqCchO-v3lGQZqRs6I4c9sQ0OC_53lc95zvPmuNAD5Zb2iIHcCWkPJz4agSbfA=w1425-h950-no'
    },
    {
      path: '/about',
      name: 'about',
      component: WIP,
      display_name: 'About me!',
      description: 'About me!',
      level: 'home',
      background_image: 'https://lh3.googleusercontent.com/0WM9gJhSWFEJcxNpfB-vzUVlN9IjnFpKLKfOvdvHRXWSV9jNcHpLa0vuERLHl5gKFA3_V-MDN06BIIjcR9mIvyCFQXAuXlx6_5hH902JwrR7IaSNkgk4-eCbjN_UuVgWs8_Kksz-WycM2MNjSPACkdk78ruwJEmAQ7s2swKDiEpLvLQTIAOVOIQm2tEG6Q5ssjxRHuc97mt2PXl3YOhtmePN3PMVA0E3sOaztQibC3deMudGYa7NZFzOQ7UP8BHnVgb2DSvKZxp_BdNmVaFAYD-w3Wy-_i6Cqyq8DKbiQswIhfj7flvu5TaVsqujFDDRy6xVHTXkHiK9kifcSc4AzCk5ymrfIBrKcfhtfCEmKAQlW3Rec8hooRVXcp6sIlB9eT9rpvY2Fmj2Gk2Wjbe3MBs2sWMcghh2fng2Os4uYoOpq1ysbAX2v5FZG8YidBD087FGm0niKTP7SFUH-tuAzY_2vrGdtWYNOlbvQQjlGH06RfvB3623d-Y17-yzKYUCGB0wy102A2OWI6rBNh0OaEX4u0efT4sHDm6RZidcd8f5r-0UhU1c-3Voy3wBsKslCdxrhlUUOLWOEuRBVvIAc9PJj_lODmyqlwN8ZW6rC7VXE7At3MzhRqEIK70wBBkFu4nY8VZ92tUUssWAqED8OQ7urHg7Ev_eWyBiz1_AXXyOoA=w1425-h950-no'
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
