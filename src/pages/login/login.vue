<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo">
          <img src="~@/assets/images/account-logo.png" alt="" />
        </div>
        <div class="view-account-top-desc">Wowjoy Admin中台前端解决方案</div>
      </div>
      <div class="view-account-form">
        <n-form
          ref="formRef"
          label-placement="left"
          size="large"
          :model="formInline"
          :rules="rules"
        >
          <n-form-item path="username">
            <n-input
              v-model:value="formInline.username"
              placeholder="请输入用户名"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <PersonOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="formInline.password"
              type="password"
              show-password-toggle
              placeholder="请输入密码"
            >
            </n-input>
          </n-form-item>
          <n-form-item class="default-color">
            <div class="flex justify-between">
              <div class="flex-initial">
                <n-checkbox v-model:checked="autoLogin">自动登录</n-checkbox>
              </div>
              <!-- <div class="flex-initial order-last">
                <a href="javascript:">忘记密码</a>
              </div> -->
            </div>
          </n-form-item>
          <n-form-item>
            <n-button
              type="primary"
              @click="handleSubmit"
              size="large"
              :loading="loading"
              block
            >
              登录
            </n-button>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, Events, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { useMessage } from "wowjoy-vui";
import { ResultEnum } from "@/enums/httpEnum";
import {
  PersonOutline,
  LockClosedOutline,
  LogoGithub,
  LogoFacebook,
} from "@vicons/ionicons5";

// import logo from "@/assets/images/logo.png";

interface FormState {
  username: string;
  password: string;
}

const formRef = ref();
const message = useMessage();
const loading = ref(false);
const autoLogin = ref(true);

const formInline = reactive({
  // username: "admin",
  // password: "123456",
  // isCaptcha: false,
  username: "",
  password: "",
  grant_type: "password",
  mdid: "fcc8bcc148617e3baa440a57acd3b666",
});

const rules = {
  username: { required: true, message: "请输入用户名", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
};

const userStore = useUserStore();

const router = useRouter();
const route = useRoute();

const handleSubmit = (e: any) => {
  e.preventDefault();
  formRef.value.validate(async (errors) => {
    if (!errors) {
      const { username, password } = formInline;
      message.loading("登录中...");
      loading.value = true;

      const params: FormState = {
        username,
        password,
      };

      const res = await userStore.login(formInline);
      if (res) {
        const toPath = decodeURIComponent(
          (route.query?.redirect || "/") as string
        );
        message.success("登录成功！");
        router.replace(toPath).then((_) => {
          if (route.name == "login") {
            router.replace("/");
          }
        });
      } else {
        message.info("登录失败");
        setTimeout(() => {
          loading.value = false;
        }, 3000);
      }
    } else {
      message.error("请填写完整信息，并且进行验证码校验");
    }
  });
};

// const onAuthCode = () => {
//   formInline.isCaptcha = true;
// };
</script>

<style lang="scss" scoped>
.view-account {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;

  &-container {
    flex: 1;
    padding: 32px 0;
    width: 384px;
    margin: 0 auto;
  }

  &-top {
    padding: 32px 0;
    text-align: center;

    &-desc {
      font-size: 14px;
      color: #808695;
    }
  }

  &-other {
    width: 100%;
  }

  .default-color {
    color: #515a6e;

    .ant-checkbox-wrapper {
      color: #515a6e;
    }
  }
}

@media (min-width: 768px) {
  .view-account {
    // background-image: url("../../assets/banner.png");
    background-repeat: no-repeat;
    // background-position: 30%;
    background-size: 100%;
  }

  .page-account-container {
    padding: 32px 0 24px 0;
  }
}
</style>
