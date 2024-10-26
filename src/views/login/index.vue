<template>
  <div class="flex justify-center flex-content-center w-full h-full flex-items-center">
    <div>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="loginForm"
        status-icon
        :rules="rules"
        label-width="auto"
        size="small"
        class="demo-ruleForm"
      >
        <el-form-item label="Name" prop="username">
          <el-input v-model.number="loginForm.username" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="loginForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"> Submit </el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { loginApi } from "@/api/modules/login";
import { useUserStore } from "@/store/modules/user";
import { useRouter } from "vue-router";
import { HOME_URL } from "@/config";
const router = useRouter();
const ruleFormRef = ref<FormInstance>();
const userStore = useUserStore();
const loginForm = reactive({
  password: "",
  username: "",
});

const rules = reactive<FormRules<typeof loginForm>>({
  password: [{ trigger: "blur" }],
  username: [{ trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (!valid) return;
    try {
      // 1.执行登录接口
      const { data } = await loginApi({ ...loginForm });
      userStore.setToken(data.token);
      // 4.跳转到首页
      router.push(HOME_URL);
    } finally {
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
