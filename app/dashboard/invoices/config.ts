import { FormItemType } from '@/app/ui/s-component/s-form';
import { DatePicker, DatePickerProps, InputNumber, SelectProps } from 'antd';
import SSelect from '@/app/ui/s-component/s-select';

const options: SelectProps['options'] = [
  {
    value: 'undergrad',
    label: '本科生',
  },
  {
    value: 'postgraduate',
    label: '研究生',
  },
];

export const formItems: FormItemType[] = [
  {
    name: 'totalTraffic',
    label: '总流量',
    component: InputNumber,
    required: true,
  },
  {
    name: 'endDate',
    label: '结算日期',
    component: DatePicker,
    required: true,
  },
  {
    name: 'product',
    label: '产品',
    component: SSelect,
    componentProps: {
      options,
    },
    required: true,
  },
];

export type FormFieldType = {
  totalTraffic: number;
  endDate: DatePickerProps['value'];
  product: string;
};
