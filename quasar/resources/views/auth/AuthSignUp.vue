<template>
  <div
    class="AuthSignUp flex row"
    :class="{ 'started': started }"
  >
    <div class="AuthSignUp__left shadow-3 col-xs-12 col-sm-12 col-md-5 col-lg-4">
      <div class="AuthSignUp__left__header">
        <img
          alt="logo"
          class="AuthSignUp__logo"
          :src="$static('/logo-horizontal.png')"
        >
      </div>

      <form
        class="AuthSignUp__left__form"
        @submit.prevent="attempt"
      >
        <div class="row">
          <div class="col-12 q-pa-sm">
            <QInput
              :label="$lang('auth.register.name')"
              outlined
              v-model="record.name"
              :error="$v.record.name.$error"
              :error-message="$lang('validation.required')"
            >
              <template v-slot:prepend>
                <QIcon name="person" />
              </template>
            </QInput>
          </div>
          <div class="col-12 q-pa-sm">
            <QInput
              :label="$lang('auth.register.username')"
              outlined
              v-model="record.username"
              :error="$v.record.username.$error"
              :error-message="$lang('validation.email')"
            >
              <template v-slot:prepend>
                <QIcon name="email" />
              </template>
            </QInput>
          </div>

          <div class="col-12 q-pa-sm q-pb-md">
            <QInput
              :label="$lang('auth.register.password')"
              :type="isPassword ? 'password' : 'text'"
              outlined
              v-model="record.password"
              :error="$v.record.password.$error"
              :error-message="$lang('validation.required')"
            >
              <template v-slot:prepend>
                <QIcon :name="record.password ? 'vpn_key' : 'lock'" />
              </template>
              <template v-slot:append>
                <QIcon
                  :name="isPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPassword = !isPassword"
                />
              </template>
            </QInput>
          </div>

          <div class="col-12 q-pa-sm q-pb-md">
            <QInput
              :label="$lang('auth.register.confirmPassword')"
              :type="isPasswordConfirm ? 'password' : 'text'"
              outlined
              v-model="record.confirmPassword"
              :error="$v.record.confirmPassword.$error"
              :error-message="$lang('auth.register.confirmation')"
            >
              <template v-slot:prepend>
                <QIcon :name="record.confirmPassword ? 'vpn_key' : 'lock'" />
              </template>
              <template v-slot:append>
                <QIcon
                  :name="isPasswordConfirm ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPasswordConfirm = !isPasswordConfirm"
                />
              </template>
            </QInput>
          </div>
        </div>

        <hr>
        <div class="q-pa-sm">
          <QBtn
            class="AuthSignUp__button full-width"
            color="primary"
            size="lg"
            :label="$lang('auth.register.createAccount')"
            type="submit"
            :loading="loading"
          />
          <q-btn
            unelevated
            :ripple="false"
            class="AuthIndex__button"
            text-color="light-blue-7"
            to="/"
            :label="$lang('auth.register.backToLogin')"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script type="text/javascript">
import { QBtn, QIcon, QInput } from 'quasar'
// https://chancejs.com/index.html
import chance from 'chance'
import { email, required, sameAs } from 'vuelidate/lib/validators'
import AuthAttempt from 'source/modules/Auth/AuthAttempt'
import { dashboard } from 'routes/dashboard'
import { otherwise } from 'src/router'

export default {
  name: 'AuthSignUp',
  /**
   */
  mixins: [
    AuthAttempt
  ],
  /**
   */
  components: { QInput, QIcon, QBtn },
  /**
   */
  data () {
    const generator = chance.Chance()
    return {
      started: false,
      isPassword: true,
      isPasswordConfirm: true,
      record: {
        name: `${generator.name()} ${generator.last()}`,
        username: generator.email(),
        password: 'aq1sw2de3',
        confirmPassword: 'aq1sw2de3'
      }
    }
  },
  /**
   */
  validations () {
    return {
      record: {
        name: { required },
        username: { required, email },
        password: { required },
        confirmPassword: { required, sameAsPassword: sameAs('password') }
      }
    }
  },
  /**
   */
  methods: {
    /**
     */
    attemptFail () {
      this.$message.warning(this.$lang('auth.register.error'))
    },
    /**
     */
    attempting () {
      return this.$service.register(this.record)
    },
    /**
     */
    attemptSuccess () {
      this.$message.success(this.$lang('auth.register.success'))
      this.$store
        .dispatch('app/setClipboard', { username: this.record.username, password: this.record.password })
        .then(() => this.$browse(otherwise))
    },
    /**
     */
    attemptError () {
      this.$message.error(this.$lang('auth.register.error'))
    },
    /**
     */
    /**
     */
    openDashboard () {
      let target = dashboard
      if (this.$route.query.current) {
        target = this.$route.query.current
      }
      this.$browse(target)
      window.setTimeout(() => this.$q.loading.hide(), 2000)
    }
  },
  mounted () {
    window.setTimeout(() => { this.started = true }, 1000)
  }
  /**
   */
}
</script>

<style lang="stylus">
@import '~src/css/quasar.variables.styl'

.AuthSignUp {
  height 100vh
  overflow-x hidden
  opacity 0.3
  transition opacity 0.15s

  &.started {
    opacity 1
  }

  > .AuthSignUp__left {
    padding 0 6vw
    background-color white
    min-width 320px

    > .AuthSignUp__left__header {
      margin 10vh 0 0 0
      padding 3vh 3vw
      display flex
      justify-content center
    }
  }

  > .AuthSignUp__left__form {
    margin 10vh 0 0 0
  }

  .AuthSignUp__logo {
    max-height 100px
    max-width 100%
    user-select none
  }

  .AuthSignUp__button {
    min-height 42px
  }
}

.q-field__label
  color #c5d2d1
</style>
