<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { IconArrowRise, IconArrowFall } from '@arco-design/web-vue/es/icon';

interface TableColumn {
    title: string;
    dataIndex: string;
    slotName?: string;
    align?: 'left' | 'center' | 'right';
    width?: number;
}

interface RankingData {
    object_id: string;
    name: string;
    pre_pic: string;
    primary_class: string;
    second_class: string;
    second_class_cn: string;
    current_price: number;
    compare_price: number;
    avg_price: number;
    highest_price: number;
    lowest_price: number;
    price_change: number;
    price_change_percent: number;
    rank: number;
    update_time: string;
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
    sort_type: 'price_up',
    page: 1,
    page_size: 10
});

const formatPrice = (price: number | string): number => {
    if (typeof price === 'string') {
        price = parseFloat(price.replace(/,/g, ''));
    }
    return Math.floor(price); // 使用Math.floor去除小数部分,不四舍五入
};

const fetchData = async (params: QueryParams) => {
    loading.value = true;
    showheader.value = false;
    try {
        const response = await axios.get<ApiResponse>('index.php/api/v1.rankings/getRankings', {
            params: params
        });
        console.log('接口返回数据:', response.data);
        if (response.data.code === 1) {
            const list = response.data.data.list.map(item => ({
                ...item,
                current_price: formatPrice(item.current_price),
                compare_price: formatPrice(item.compare_price),
                price_change: formatPrice(item.price_change),
                price_change_percent: formatPrice(item.price_change_percent)
            }));
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
        title: '排名',
        dataIndex: 'rank',
        slotName: 'rank',
        align: 'center',
        width: 190
    },
    {
        title: '缩略图',
        dataIndex: 'pre_pic',
        slotName: 'pre_pic',
        // align: 'center',
        width: 150
    },
    {
        title: '物品名称',
        dataIndex: 'name',
        slotName: 'name',
        // align: 'left',
        width: 350,
    },
    {
        title: '当前价格',
        dataIndex: 'current_price',
        slotName: 'current_price',
        // align: 'center'
    },
    {
        title: '昨日价格',
        dataIndex: 'compare_price',
        slotName: 'compare_price',
        // align: 'center'
    },
    {
        title: '价格变化',
        dataIndex: 'price_change',
        slotName: 'price_change',
        // align: 'center'
    },
    {
        title: '价格变化百分比',
        dataIndex: 'price_change_percent',
        slotName: 'price_change_percent',
        // align: 'center'
    }
]);
</script>

<template>
    <a-layout style="padding: 0 24px;" class="layout-b">
        <a-breadcrumb :style="{ margin: '16px 0' }">
            <a-breadcrumb-item>主页</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content>
            <a-card>
                <a-table :columns="columns" :data="data" :pagination="false" :loading="loading"
                    :show-header="showheader">
                    <template #rank="{ record }">
                        <a-space size="large" style="font-weight: 600; font-size: 26px; color: #455A64;">{{ record.rank
                            }}</a-space>
                    </template>
                    <template #pre_pic="{ record }">
                        <a-image :src="record.pre_pic" :height="50" :width="50" alt="预览图" />
                    </template>
                    <template #name="{ record }">
                        <a-space size="large" style="font-weight: 600; font-size: 26px; color: #455A64;">{{ record.name
                            }}</a-space>
                    </template>
                    <template #current_price="{ record }">
                        <a-statistic :value="record.current_price" show-group-separator
                            :value-style="{ fontWeight: 600, color: '#455A64' }" />
                    </template>
                    <template #compare_price="{ record }">
                        <a-statistic :value="record.compare_price" show-group-separator
                            :value-style="{ fontWeight: 600, color: '#455A64' }" />
                    </template>
                    <template #price_change="{ record }">
                        <a-statistic :value="Math.abs(record.price_change)" show-group-separator :value-style="{
                            fontWeight: 600,
                            color: record.price_change >= 0 ? '#FF5252' : '#0fbf60'
                        }">
                            <template #prefix>
                                {{ record.price_change >= 0 ? '+' : '-' }}
                            </template>
                        </a-statistic>
                    </template>
                    <template #price_change_percent="{ record }">
                        <a-statistic :value="Number(record.price_change_percent)" :precision="0"
                            show-group-separator :value-style="{
                                fontWeight: 600,
                                color: record.price_change_percent >= 0 ? '#FF5252' : '#0fbf60'
                            }">
                            <template #prefix>
                                <icon-arrow-rise v-if="record.price_change_percent >= 0" />
                                <icon-arrow-fall v-else />
                            </template>
                            <template #suffix>%</template>
                        </a-statistic>
                    </template>
                </a-table>
            </a-card>
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
</style>