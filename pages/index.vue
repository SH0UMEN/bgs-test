<template>
  <v-main>
    <v-container class="fill-height">
      <v-row class="justify-center">
        <v-col cols="5">
          <v-card width="100%">
            <v-card-title class="pb-0">Авторизация</v-card-title>
            <v-form @submit.prevent="auth" v-model="isValid" class="px-4">
              <v-text-field label="Логин" hide-details="auto"
                            :rules="commonRules" v-model="login"></v-text-field>
              <v-text-field label="Пароль" hide-details="auto" type="password"
                            :rules="commonRules" v-model="password"></v-text-field>
              <v-btn class="mb-4 my-6" :disabled="!isValid || loading" width="100%"
                     color="indigo" :loading="loading" :dark="isValid && !loading" type="submit">Войти</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>

export default {
  middleware: 'isAuth',
  data() {
    return {
      login: "",
      password: "",
      isValid: null,
      loading: false,

      // Правила для всех
      commonRules: [
        v => !!v || "Обязательное поле",
        v => v.length > 5 || "Введите не менее 5 символов"
      ]
    }
  },
  methods: {
    auth() {
      this.loading = true;
      this.$store.dispatch("auth").then(()=>{
        this.loading = false;
        this.$router.push("/user");
      });
    }
  }
}
</script>
