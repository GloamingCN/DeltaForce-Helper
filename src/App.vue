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
              全部类别
            </a-menu-item>
          </RouterLink>
          <a-sub-menu key="1">
            <template #title>
              <IconCalendar></IconCalendar> 装备
            </template>
            <a-sub-menu key="2" title="腰带">
              <a-menu-item key="2_1">【白石神殿】赛季</a-menu-item>
              <!-- <a-sub-menu key="2_1" title="【白石神殿】赛季">
                <RouterLink to="/yaodai"><a-menu-item key="2_1_1">凝霜带</a-menu-item></RouterLink>
                <a-menu-item key="2_1_2">虎啸带</a-menu-item>
                <a-menu-item key="2_1_3">残云带</a-menu-item>
              </a-sub-menu> -->
              <a-menu-item key="2_2">【决战舞阳】赛季</a-menu-item>
              <!-- <a-sub-menu key="2_2" title="【决战舞阳】赛季">
                <a-menu-item key="2_2_1">醉仙带</a-menu-item>
                <a-menu-item key="2_2_2">火药库宝带</a-menu-item>
                <a-menu-item key="2_2_3">燃烧带</a-menu-item>
                <a-menu-item key="2_2_4">血纹带</a-menu-item>
                <a-menu-item key="2_2_5">黑魔带</a-menu-item>
              </a-sub-menu> -->
            </a-sub-menu>
            <a-sub-menu key="3" title="鞋子">
              <a-sub-menu key="3_1" title="【白石神殿】赛季">
                <a-menu-item key="3_1_1">万毒履</a-menu-item>
                <a-menu-item key="3_1_2">霜落履</a-menu-item>
                <a-menu-item key="3_1_3">月影履</a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="3_2" title="【决战舞阳】赛季">
                <a-menu-item key="3_2_1">飞云履</a-menu-item>
                <a-menu-item key="3_2_2">透支履</a-menu-item>
                <a-menu-item key="3_2_3">温柔履</a-menu-item>
                <a-menu-item key="3_2_4">寒冰履</a-menu-item>
                <a-menu-item key="3_2_5">雪灵履</a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
            <a-sub-menu key="4" title="装备匣">
              <a-sub-menu key="4_1" title="【江湖重启】赛季">
                <a-menu-item key="4_1_1">传世神武令宝箱</a-menu-item>
                <a-menu-item key="4_1_2">侠骨神兵匣·护腕</a-menu-item>
                <a-menu-item key="4_1_3">侠骨神兵匣·武器</a-menu-item>
                <a-menu-item key="4_1_4">忘虚装备匣</a-menu-item>
                <a-menu-item key="4_1_5">逸尘装备匣</a-menu-item>
                <a-menu-item key="4_1_6">风语装备匣</a-menu-item>
                <a-menu-item key="4_1_7">楚歌装备匣</a-menu-item>
                <a-menu-item key="4_1_8">重渊装备匣</a-menu-item>
                <a-menu-item key="4_1_9">修罗装备匣</a-menu-item>
                <a-menu-item key="4_1_10">蜃楼装备匣</a-menu-item>
                <a-menu-item key="4_1_11">玉京装备匣</a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="4_2" title="【白石神殿】赛季">
                <a-menu-item key="4_2_1">挽云装备匣</a-menu-item>
                <a-menu-item key="4_2_2">太虚装备匣</a-menu-item>
                <a-menu-item key="4_2_3">仙陵装备匣</a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="4_3" title="【决战舞阳】赛季">
                <a-menu-item key="4_3_1">30级紫色装备匣</a-menu-item>
                <a-menu-item key="4_3_2">40级紫色装备匣</a-menu-item>
                <a-menu-item key="4_3_3">50级紫色装备匣</a-menu-item>
                <a-menu-item key="4_3_4">60级紫色装备匣</a-menu-item>
                <a-menu-item key="4_3_5">凤舞装备匣</a-menu-item>
                <a-menu-item key="4_3_6">天魔装备匣</a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
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