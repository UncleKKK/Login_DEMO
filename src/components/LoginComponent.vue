<template lang="pug">  
block content
    .input-container(:class = 'is_show_input_container ? "input-container-show":"" ')
        InputBox(inputType = 'username' :input_value = 'data_value')
        InputBox(inputType = 'password' :input_value = 'data_value')
        LoadingButton(button_text = 'Login' @login_button_tap_action_call_back = 'login_button_tap_action' :is_loading = 'styleRef.is_loading')
        a
            span.forget-password(@click = 'to_forget_password_tap_action') Forget Password
            span.register(@click = 'to_register_tap_action') Register
        text.state-message(:class = 'styleRef.is_show_state_message ? "state-message-show":"state-message-hide" ') {{ dataRef.state_message }}
</template>

<script>
import { reactive, ref ,toRefs ,onMounted } from 'vue'
import InputBox from '@/components/InputBox.vue'
import LoadingButton from '@/components/LoadingButton.vue'
import { reqeust_manger_post } from '@/utils/httpManger'
import { set_storage_for_token } from '@/utils/storage'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginComponent',
  components: {
    InputBox,
    LoadingButton
  },
  props:{
    is_show_input_container:{
        type:Boolean
    },
    data_value:{},
    to_forget_password_tap_action_call_back:{
        type:Function
    },
    to_register_tap_action_call_back:{
        type:Function
    }
  },
  setup (props,{ emit }){
    // -- router
    const router = useRouter()
    const router_to_home = () => {
        router.push({
            name:'Home'
        })
    }
    // -- refs
    const styleRef = reactive({
      is_show_state_message:false,
      is_loading:false,
    })
    const dataRef = reactive({
        state_message:'',
    })
    // -- show state_message
    const set_show_state_message_animation_state = (state_message) => {
        if(styleRef.is_show_state_message){ styleRef.is_show_state_message = false }
        dataRef.state_message = state_message
        styleRef.is_show_state_message = true
        setTimeout(() =>{ styleRef.is_show_state_message = false },4000)
    }
    // -- tap action
    const to_forget_password_tap_action = () =>{
        emit('to_forget_password_tap_action_call_back')
    }
    const to_register_tap_action = () =>{
        emit('to_register_tap_action_call_back')
    }
    const login_button_tap_action = () =>{
        if(styleRef.is_loading) return
        if(props.data_value.username.length === 0){
          set_show_state_message_animation_state('请输入用户名')
        }else if (props.data_value.password.length === 0){
          set_show_state_message_animation_state('请输入密码')
        }else{
          styleRef.is_loading = true
          request_login(props.data_value.username,props.data_value.password)
          .then(res => {
              styleRef.is_loading = false
              set_storage_for_token(res)
              set_show_state_message_animation_state('登录成功')
          })
          .catch(err => {
              styleRef.is_loading = false
              set_show_state_message_animation_state(err)
          })
      }
    }
    // -- request
    const request_login = (email,password) =>{
        return new Promise((resolve, reject) =>{
            reqeust_manger_post('/login',{
                email,
                password
            })
            .then((res) => {
                resolve(res)
            })
            .catch((err) => reject(err))
        })
    }
    return{
        styleRef,
        dataRef,
        login_button_tap_action,
        to_forget_password_tap_action,
        to_register_tap_action,
    }
  }
}
</script>
<style scoped src="../assets/style/login.css"></style>
