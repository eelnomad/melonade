import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Blog from '@/components/blog/Blog'
import BlogPost from '@/components/blog/BlogPost'
import PhotoGallery from '@/components/photoGallery/PhotoGallery'
import ShowerThoughts from '@/components/showerThoughts/ShowerThoughts'
import SmallProjects from '@/components/smallProjects/SmallProjects'
// import League from '@/components/League'
import Sudoku from '@/components/sudoku/Sudoku'
import About from '@/components/about/About'
import WIP from '@/components/WIP'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog,
      display_name: 'My Blog',
      level: 'home',
      background_image: 'https://lh3.googleusercontent.com/9sPGU35bYAUlVVS7awmiJ3ye9QJ74T0E_SyTqKAP6NI0cLmMwq3XfZHhE5XwXzAWxIAFLNGNdpFR5oR1nVOX7eTNZ7Ssx-44CX0GDsDHw_yOZjAhGCb3cHdPj8Vw4x614z52wkObt5gJwqRe8hT58CkYSnF0hzre4RcpSgfcC7IQ5Gw7Y67bkYtX5nejlkw0EAIKbGkPIiwBy9lYPvUxcnDWv7Muto_wAGd_g-zuux8aMCCihvY44l9ph-gxymyscMG5KuxfNeo_usRUQYbB2pI6gtDp6pnt_mODKmMSv18ozVjHFmNvkw-9_D0F_Bq9_VRN8kbNyYUV8TnlAQLa4kbvMFK4G9QN01Eq3tHqyyBW_ipGfzR3t68q_RXpGT283DLxSYvs1fPP_2BdGaZpAOfGbUsijMPSRYJAo1TWRLvWaWd1fn_6yFeJPIVSykpioCuoKlkZmxNFyfg967MF5wp9RwbYUuLGHcSJ76LEQKitRUm7p5iPLn5vbtfLAtc-7iOF6ex3NH1g7WGGu6Cr52VzvViCc0QQ-1609kIZ2PMoRdxTMOkt-GgMQS_QeSLI9UYXMkkRfALO6iykcqN2TE6evbMFNJOALwLb1s8Xy683k7w8ashPsMuiITZq0ClW2a8lFisvWQyLCdUZ7xAP6E9NPLNREceSzSxUEhAfqgW4zg=w1425-h950-no?.jpg'
    },
    {
      path: '/blog/:post_id',
      name: 'blogPost',
      component: BlogPost
    },
    {
      path: '/photos',
      name: 'photos',
      component: PhotoGallery,
      display_name: 'Photo Gallery',
      level: 'home',
      background_image: 'https://lh3.googleusercontent.com/Y2wYl6KgubHSz3Zvh0GXN7a8_grOTse9fqbFUlwVliu3tk6HEIZNTGl-b5Z0-GYcRZoq9i_s3nFB6mEiHjxKMoaYjrOUNjBgO1GgNXDfKskM-4XB1zTGOFWRYVMOr4AvKWmxr7yRMWMzkakRrzaZe4xIqipojah7CMnY8EZO8V19yGjbdi7pLFWm7GM5fmgBU_HqS-Fu3X_Cmzf_cB6LmgaJLrYElcCEHEIsquzZKOygnR1l_Tuk475BDR-MYKXv9Tj_QQV12utkH9Klgp-D9ugxw2ur_zGEo94LeE8rw7eT-K0eFv2nEs5lCszioDyO2bgioSLMO116eraXtJK3G5FqeXRs5nb5j6Zx9bUtUBXOjq2_mn6y3REG8XxSYy6qpT31aRxM4P-yrjbTJazPMpDLgXAOkGFUy3NwTq2I9Kioil61rouKUqyvxpQda-eJkwl5j794GQhKcSmJA67Tt4Lf6mf9GPWZPdRH6CpQazB2AIP_5Q9oYzU94kritAi3m5tV_CRewOizz29auJ7A9aWJrWKQqFTh1vK-AMPpw0tt9Tf7uoC1wOQm5gPnEsn3UpPNERKVvwnlB611qJ6oyO_tjI-cr98aQybVIqOPmWH_FgmWuMZ9biQlhVkGu_0miBw6o9JXiMyr4mymuz6-B-vKtQOSTYZl4LEDIXgUxrY8KQ=w1425-h950-no?.jpg'
    },
    {
      path: '/showerthoughts',
      name: 'showerthoughts',
      component: ShowerThoughts,
      display_name: 'Shower Thoughts',
      level: 'home',
      background_image: 'https://lh3.googleusercontent.com/kZZ3Em_o77SevGgkc3kk20uwcI9bXSnJ8k8wFFbn8o0Sjojx8WwbywNKH90Q-8C39qXhXXSMvcJJx-SAKmasI4Yg69MVe0qVW2L6IFS5UxvCJ8O5hlBye__8BA0u0ghNNpy7TACdP_O3fC8-l2EZID4nnUa-gFt4WN9cPq8Q4Z5Sc7iZJNTjeCe8oxDumA5HX4KErXne20wPXEJa3zOyt0-1SaZy36sRFkE0jlhZa7wrXGzAnh92dWydExUBQhGM9ej4xCZxYecy40XZhoz2t964IbaYt3CLjK0k-2iqUMhMCPlUPCCqw2i5vPXYao4adqijtYyHhcd2rrVrGrQPEAOzCOhkzQWv-rfcks9f0UrfAeXqCpdaoI97TtggNgpJp-R_QsEDNDpKFvC7R8LqwzUsQQH0GOUk8MUISktZwIr1g2sKmVoZuKi-yNL6lWl7zQrwlQKJo9SMPqzwRIBiIlzfxNXkz645zFDWriJ56ae-R-rf_RHw2lefAB4wL9tjOX2esKIKEFoCp3XBM5frTf35s7oPsiwIONvM-bTNCrUs9XgCHFLNSohq-U8cfL0JcMEiHKHR1OkfpLZqtQ2v1RJpHYxnC38RoKlO6pUe3DaO9SFa2MZpEGp68NUwxPqNws4Nyw932I_u3vhwlEu5_UyvpwitaXJ_HFhoNKF4c2AxgA=w1425-h950-no?.jpg'
    },
    {
      path: '/smallprojects',
      name: 'smallprojects',
      component: SmallProjects,
      display_name: 'Small Projects',
      level: 'home',
      background_image: 'https://lh3.googleusercontent.com/N5imive56r3ZdacQC-lWcKX7yXN32IaJRpbFkLQN3jkI4vAO1aG3yvn3qLSj9b8fgjVpHatOZY1I7KxOa3Alt2Dot3K3XijSQ2WSLqVCbslxKJi4zYVBzs40Blv-OsTHyl-3MwaTPGHPJ3DpAsPtXpJ0D7MkAGEb7prwGEhD7s5W6DvjfpIUvt_hoS3uh25rsDF8dOWQUlCMtV5yuqmNWhuyLEVF-tpOny4x_n_ztxLc31ysvnOt0L73BlvybI2FLco-tymeDz-fSv7UBZ8nPSUF4ySUSJjMO59AtFSjVhezyTw6oXC1p2k-Lc-0kioaoToCajxp74rTSR1ApVdMVyN6w1HuhfVDQGDBF2oN2rTcdQTnMCwaCxfiEOzdG8J53l2at3zhimmZYqW0YBrqriOT1V8NCKGVAAksBbUdXsglt37pvKIFfKAGyVm-EdgKhXrllCi4wqtqcDi8qnFk4sEyWlYDc3dGNlYgAcJh1RgdZP3sJ6-ZsFilFneJffRk-4lYQ2YwZqrkYAcjSYpRmf11hxjHv1mrPXYt0k__l9o3UVHFVS9moSjJZ2Tlf9D59ALDGNS4TVe9BPGM4lYrq2y2Sc01xE33_w7fxm1K4WCH5TrltqCchO-v3lGQZqRs6I4c9sQ0OC_53lc95zvPmuNAD5Zb2iIHcCWkPJz4agSbfA=w1425-h950-no?.jpg'
    },
    {
      path: '/sudoku',
      name: 'sudoku',
      component: Sudoku,
      display_name: 'Sudoku Solver',
      level: 'smallProjects',
      background_image: 'https://lh3.googleusercontent.com/WQm-pdhZW3d2-Xa7y_9PR8O2zo95PuUa3-b89GMB30jOd5BfYIccNy-FsfwtozkqVYwOlaX0Zgn1I2_EQbDHc9T5jcIrNfCQwEvgx2k4b5_lyAHN7F1ZGoXsPjFXdpAhfyKzUkazpU5iGPQSvB-J3WJQlh5g7Gz9zn1nqVuQzs5TbMYsenPQbcTyr0pXCws5My3DdMCpnO2iug8MfCikwqzq_KRXBrq7Q0Dpj6JhdwRZXlKvd8xJukF-igT4Wd6XgLlqjdqVNIx2VOuSjh6ovyNMnc7HSCxdl40o7OQ3nWXgpFx1prjSPz0fIef6WK1OQrBLJJmxXhDOQC1_MjYdrVWW72dCVsnraLu_QrRj5febmmdiBGDUKPhgkzprVZcvFksRgcWfANcX-QmEykPclqZ4hwNhQM8lTakO4i8abi_C0_5eivgohSYyUz3mD_ag5SOxgv8i_6G81yqrx0GX0MYe-RIn_pvv3diPwoWrJ-QPhhK-L-Uswq1TbvyrrsU7QwHEuucMnTisqbOlo6WBRN91Bk1tD6g3Z7_8ub1x2P8Vqo6PE4R473gYKel18jmB2-Nn_h6ODr6jGzBADnTenL8BkVsesfltDKDzJRmpBUcc-LGK613xS22z9tFABzJeQUatHzVN3PK4RaEadR1jo4QTkCJTsMsIaA8uIy291HVxXg=w1980-h1320-no?.jpg'
    },
    {
      path: '/league',
      name: 'league',
      component: WIP,
      display_name: 'League of Legends Analysis',
      level: 'smallProjects',
      background_image: 'https://lh3.googleusercontent.com/P1PXPK7xqcsrYr8zwD9p3J6b52p9eHfG6IHAe4MukaPochLA-DFjsbineCTyEQBeB5s7KfJLAqasPwXmSTUZ1HIUCY-s_SlR6T-aLpFTkxeu34rqFii69YDd6dryIvxQjgOVk3mwIH_vIUb9Cugt0ANIwf9fz-Oku5u6S1SmpbuMj10CEylhUWvvgs2XmCjeogzchZW8PiG-SCQfTD5w71CMR8czwIiGbRe76OgCNZhwc1prQwVVyHihzZllLsqR_Bd3uCnzHXXb_IzNdEwpecaVvsTl_C5G4qVtpSbpDH5uOiKvtSXiSOQLpqr3_tE0xY2HSNlHGecyDOAwYNSljWh0LWUlmH2KF-JlgH1yh0mJE42nTef_2Jmn8zTDg-ZBxt5KQ-uJCLdlYQESPtuq4WOuxJ5YZ5jRRqNZuUivE15CPATih-Cxjpti10ETDIKcGO6RtALo_ehJnnNLgDY4l0kCws98YqO9PtLmYZEg2hLo2UfFkvsC29ZFoQYmKsgY8F5gY-iX0ltNrHhFLhqLui76ZpFJKJ8tTFSy2KkST56bkXvWCuzoWyM67MVEC5NCsVVMZboA9cxini-8cupuS6Ayx82rw2QeKlCaysy4zltnwDyrGcGZzdZBQwM4oyToLqscEzDLrvhhhOmlyvrao_H9BCKcXWR5YbU=w1980-h1320-no?.jpg'
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      display_name: 'About me!',
      level: 'home',
      background_image: 'https://lh3.googleusercontent.com/0WM9gJhSWFEJcxNpfB-vzUVlN9IjnFpKLKfOvdvHRXWSV9jNcHpLa0vuERLHl5gKFA3_V-MDN06BIIjcR9mIvyCFQXAuXlx6_5hH902JwrR7IaSNkgk4-eCbjN_UuVgWs8_Kksz-WycM2MNjSPACkdk78ruwJEmAQ7s2swKDiEpLvLQTIAOVOIQm2tEG6Q5ssjxRHuc97mt2PXl3YOhtmePN3PMVA0E3sOaztQibC3deMudGYa7NZFzOQ7UP8BHnVgb2DSvKZxp_BdNmVaFAYD-w3Wy-_i6Cqyq8DKbiQswIhfj7flvu5TaVsqujFDDRy6xVHTXkHiK9kifcSc4AzCk5ymrfIBrKcfhtfCEmKAQlW3Rec8hooRVXcp6sIlB9eT9rpvY2Fmj2Gk2Wjbe3MBs2sWMcghh2fng2Os4uYoOpq1ysbAX2v5FZG8YidBD087FGm0niKTP7SFUH-tuAzY_2vrGdtWYNOlbvQQjlGH06RfvB3623d-Y17-yzKYUCGB0wy102A2OWI6rBNh0OaEX4u0efT4sHDm6RZidcd8f5r-0UhU1c-3Voy3wBsKslCdxrhlUUOLWOEuRBVvIAc9PJj_lODmyqlwN8ZW6rC7VXE7At3MzhRqEIK70wBBkFu4nY8VZ92tUUssWAqED8OQ7urHg7Ev_eWyBiz1_AXXyOoA=w1425-h950-no?.jpg'
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
