<template>
  <div class="flex justify-center flex-content-center w-full h-full flex-items-center">
    <div>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        size="small"
        class="demo-ruleForm"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model.number="ruleForm.name" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
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

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  password: "",
  name: "",
});

const rules = reactive<FormRules<typeof ruleForm>>({
  password: [{ trigger: "blur" }],
  name: [{ trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
