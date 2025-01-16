<template>
  <div class="ranking-container">
    <a-card>
      <!-- 筛选器区域 -->
      <a-space size="large" class="filter-section">
        <a-select
          v-model="timeRange"
          placeholder="时间范围"
          style="width: 120px"
        >
          <a-option v-for="item in timeRanges" :key="item.value" :value="item.value">
            {{ item.label }}
          </a-option>
        </a-select>

        <a-select
          v-model="sortType"
          placeholder="排序方式"
          style="width: 120px"
        >
          <a-option v-for="item in sortTypes" :key="item.value" :value="item.value">
            {{ item.label }}
          </a-option>
        </a-select>

        <a-select
          v-model="primaryClass"
          placeholder="主分类"
          style="width: 120px"
          allow-clear
        >
          <a-option v-for="item in primaryClasses" :key="item.value" :value="item.value">
            {{ item.label }}
          </a-option>
        </a-select>
      </a-space>

      <!-- 修改表格部分 -->
      <a-table
        :data="rankingData"
        :loading="loading"
        :pagination="pagination"
        @page-change="onPageChange"
        @page-size-change="onPageSizeChange"
      >
        <template #columns>
          <a-table-column title="排名" data-index="rank" width="80" />
          <a-table-column title="商品信息" data-index="name">
            <template #cell="{ record }">
              <a-space>
                <a-image
                  :src="record.pre_pic"
                  :width="40"
                  height="40"
                  fit="contain"
                />
                <span>{{ record.name }}</span>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="当前价格" data-index="current_price">
            <template #cell="{ record }">
              {{ formatPrice(record.current_price) }}
            </template>
          </a-table-column>
          <a-table-column title="价格变化" data-index="price_change">
            <template #cell="{ record }">
              <span :class="record.price_change >= 0 ? 'price-up' : 'price-down'">
                {{ formatChange(record.price_change) }}
                ({{ record.price_change_percent }}%)
              </span>
            </template>
          </a-table-column>
          <a-table-column title="分类" data-index="second_class_cn" />
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import axios from 'axios'
import { Message } from '@arco-design/web-vue'

// 状态定义
const loading = ref(false)
const timeRange = ref('day')
const sortType = ref('price_up')
const primaryClass = ref('')
const rankingData = ref([])
const pagination = reactive({
  current: 1,
  pageSize: 8,
  total: 0,
  showTotal: true,
  showPageSize: true,
  pageSizeOptions: [8, 16, 24, 32]
})

// 选项配置
const timeRanges = [
  { label: '小时榜', value: 'hour' },
  { label: '日榜', value: 'day' },
  { label: '周榜', value: 'week' },
  { label: '月榜', value: 'month' }
]

const sortTypes = [
  { label: '价格降序', value: 'current_price' },
  { label: '价格升序', value: 'current_price_asc' },
  { label: '涨价榜', value: 'price_up' },
  { label: '降价榜', value: 'price_down' }
]

const primaryClasses = [
  { label: '武器', value: 'weapon' },
  { label: '刀具', value: 'knife' }
]

// 获取数据方法
const fetchData = async () => {
  loading.value = true
  try {
    const response = await axios.get('index.php/api/v1.rankings/getRankings', {
      params: {
        time_range: timeRange.value,
        sort_type: sortType.value,
        primary_class: primaryClass.value,
        page: pagination.current,
        page_size: pagination.pageSize
      }
    })

    if (response.data?.code === 1 && response.data?.data?.list) {
      rankingData.value = response.data.data.list
      pagination.total = response.data.data.total
    } else {
      rankingData.value = []
      pagination.total = 0
      Message.warning('数据格式不正确')
    }
  } catch (error) {
    console.error('API请求错误:', error)
    rankingData.value = []
    pagination.total = 0
    Message.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

// 格式化价格
const formatPrice = (price) => {
  return `¥${Number(price).toLocaleString('zh-CN', { minimumFractionDigits: 2 })}`
}

// 格式化变化量
const formatChange = (change) => {
  const prefix = change >= 0 ? '+' : ''
  return `${prefix}${Number(change).toLocaleString('zh-CN', { minimumFractionDigits: 2 })}`
}

// 页面事件处理
const onPageChange = (current) => {
  pagination.current = current
  fetchData()
}

const onPageSizeChange = (pageSize) => {
  pagination.pageSize = pageSize
  pagination.current = 1
  fetchData()
}

// 监听筛选条件变化
watch([timeRange, sortType, primaryClass], () => {
  pagination.current = 1
  fetchData()
})

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.ranking-container {
  padding: 20px;
}

.filter-section {
  margin-bottom: 16px;
}

.price-up {
  color: rgb(var(--success-6));
  font-weight: bold;
}

.price-down {
  color: rgb(var(--danger-6));
  font-weight: bold;
}

.arco-table-cell {
  vertical-align: middle;
}
</style>