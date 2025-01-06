<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { IconArrowRise } from '@arco-design/web-vue/es/icon';

interface TableColumn {
    title: string;
    dataIndex: string;
    slotName?: string;
    align?: 'left' | 'center' | 'right';
    width?: number;
}

interface RankingData {
    pre_pic: string;
    object_name: string;
    current_price: number;
    compare_price: number;
    price_change: number;
    price_change_percent: string;
}

interface QueryParams {
    time_range: string;
    sort_type: string;
    page: number;
    page_size: number;
}

interface ApiResponse {
    code: number;
    msg: string;
    data: {
        list: RankingData[];
        total: number;
    };
    time: number;
}

const loading = ref<boolean>(false);
const showheader = ref<boolean>(true);
const data = ref<RankingData[]>([]);
const total = ref<number>(0);
const queryParams = ref<QueryParams>({
    time_range: 'day',
    sort_type: 'change',
    page: 1,
    page_size: 10
});

const fetchData = async (params: QueryParams) => {
    loading.value = true;
    showheader.value = false;
    try {
        const response = await axios.get<ApiResponse>('index.php/api/ranking/dataRanking', {
            params: params
        });
        if (response.data.code === 1) {
            const list = response.data.data.list.map(item => {
                item.current_price = Number(item.current_price.toString().replace(/,/g, ''));
                item.compare_price = Number(item.compare_price.toString().replace(/,/g, ''));
                item.price_change = Number(item.price_change.toString().replace(/,/g, ''));
                item.price_change_percent = item.compare_price !== 0 ? ((item.price_change / item.compare_price) * 100).toFixed(2) : '0.00';
                return {
                    ...item,
                };
            });
            data.value = list;
            total.value = response.data.data.total;
        } else {
            console.error('接口请求失败:', response.data.msg);
            data.value = [];
            total.value = 0;
        }
    } catch (error) {
        console.error('获取数据失败:', error);
        data.value = [];
        total.value = 0;
    } finally {
        loading.value = false;
        showheader.value = true;
    }
};

onMounted(() => {
    fetchData(queryParams.value);
});

const columns = ref<TableColumn[]>([
    {
        title: '缩略图',
        dataIndex: 'pre_pic',
        slotName: 'image',
        align: 'center',
        width: 150
    },
    {
        title: '物品名称',
        dataIndex: 'object_name',
        slotName: 'object_name',
        align: 'center',
        width: 300,
    },
    {
        title: '当前价格',
        dataIndex: 'current_price',
        slotName: 'current_price',
        align: 'center'
    },
    {
        title: '昨日价格',
        dataIndex: 'compare_price',
        slotName: 'compare_price',
        align: 'center'
    },
    {
        title: '价格变化',
        dataIndex: 'price_change',
        slotName: 'price_change',
        align: 'center'
    },
    {
        title: '价格变化百分比',
        dataIndex: 'price_change_percent',
        slotName: 'price_change_percent',
        align: 'center'
    }
]);
</script>

<template>
    <a-layout style="padding: 0 24px;" class="layout-b">
        <a-breadcrumb :style="{ margin: '16px 0' }">
            <a-breadcrumb-item>主页</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content>
            <a-table :columns="columns" :data="data" :pagination="false" :loading="loading" :show-header="showheader">

                <template #image="{ record }">
                    <a-image :src="record.pre_pic" :width="50" alt="预览图" />
                </template>
                <template #object_name="{ record }">
                    <span class="object-name">{{ record.object_name }}</span>
                </template>
                <template #current_price="{ record }">
                    <a-statistic :value="record.current_price" show-group-separator />
                </template>
                <template #compare_price="{ record }">
                    <a-statistic :value="record.compare_price" show-group-separator />
                </template>
                <template #price_change="{ record }">
                    <a-statistic :value="record.price_change" show-group-separator />
                </template>
                <template #price_change_percent="{ record }">
                    <a-statistic :value="Number(record.price_change_percent)" :precision="2"
                        :value-style="{ color: '#0fbf60' }">
                        <template #prefix>
                            <icon-arrow-rise />
                        </template>
                        <template #suffix>%</template>
                    </a-statistic>
                </template>

            </a-table>
        </a-layout-content>
    </a-layout>
</template>

<style scoped>
.layout-b :deep(.arco-layout-content) {
    font-weight: 400;
    font-size: 14px;
    background: var(--color-bg-3);
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    font-size: 16px;
    font-stretch: condensed;
    text-align: center;
}
.object-name {
    font-size: 26px;  /* 设置字体大小为 18px */
    font-weight: 500; /* 可选：适当加粗 */
}
</style>