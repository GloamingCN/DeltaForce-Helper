<template>
  <a-layout class="layout-a">
    <a-layout-header style="padding-left: 20px;">
      Header
    </a-layout-header>
    <a-layout>
      <a-layout-sider collapsible breakpoint="xl" :width="250">
        <div class="logo" />
        <a-menu :default-open-keys="['1']" :selected-keys="[selectedKey]" :style="{ width: '100%' }">
          <RouterLink to="/">
            <a-menu-item key="0_1">
              <IconHome></IconHome>
              主页
            </a-menu-item>
          </RouterLink>
          <RouterLink to="/ranking">
            <a-menu-item key="0_2">
              <IconCalendar></IconCalendar>
              当日涨幅TOP10
            </a-menu-item>
          </RouterLink>

          <a-sub-menu key="1">
            <template #title>
              <IconCalendar></IconCalendar> 武器
            </template>
            <a-menu-item key="1_1">冲锋枪</a-menu-item>
            <a-menu-item key="1_2">手枪</a-menu-item>
            <a-menu-item key="1_3">步枪</a-menu-item>
            <a-menu-item key="1_4">狙击步枪</a-menu-item>
            <a-menu-item key="1_5">精准射手步枪</a-menu-item>
            <a-menu-item key="1_6">轻机枪</a-menu-item>
            <a-menu-item key="1_7">霰弹枪</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="2">
            <template #title>
              <IconCalendar></IconCalendar> 装备
            </template>
            <a-menu-item key="2_1">头盔</a-menu-item>
            <a-menu-item key="2_2">护甲</a-menu-item>
            <a-menu-item key="2_3">背包</a-menu-item>
            <a-menu-item key="2_4">胸挂</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="3">
            <template #title>
              <IconCalendar></IconCalendar> 道具
            </template>
            <a-menu-item key="3_1">收集品</a-menu-item>
            <a-menu-item key="3_2">曼德尔砖</a-menu-item>
            <a-menu-item key="3_3">消耗品</a-menu-item>
            <a-menu-item key="3_4">钥匙</a-menu-item>
          </a-sub-menu>
        </a-menu>
        <!-- trigger -->
        <template #trigger="{ collapsed }">
          <IconCaretRight v-if="collapsed"></IconCaretRight>
          <IconCaretLeft v-else></IconCaretLeft>
        </template>
      </a-layout-sider>
      <RouterView />
    </a-layout>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';
import {
  IconCaretRight,
  IconCaretLeft,
  IconHome,
  IconCalendar,
} from '@arco-design/web-vue/es/icon';
const route = useRoute();

const selectedKey = computed(() => {
  switch (route.path) {
    case '/':
      return '0_1';
    case '/ranking':
      return '0_2';
    // 添加其他路由对应的key
    default:
      return '0_1';
  }
});
</script>

<style scoped>
.layout-a {
  height: 100vh;
  background: var(--color-fill-2);
}

.layout-a :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}

.layout-a :deep(.arco-layout-sider-light) .logo {
  background: var(--color-fill-2);
}

.layout-a :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}

.layout-a :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
</style>