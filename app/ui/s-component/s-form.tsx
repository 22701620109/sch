import { Button, Form } from 'antd';
import FormItem, { FormItemProps } from 'antd/lib/form/FormItem';
import { FormProps, useForm } from 'antd/lib/form/Form';
import { ComponentType } from 'react';

export type FormItemType = FormItemProps & {
  name: string;
  component: ComponentType<any>;
  componentProps?: any;
};

interface IProps<T> {
  formItems: FormItemType[];
  onFinish?: FormProps<T>['onFinish'];
  className?: string;
  layout?: FormProps['layout'];
}

export default function SForm<T>({
  formItems,
  className,
  onFinish,
  layout = 'vertical',
}: IProps<T>) {
  const [form] = useForm();
  return (
    <Form form={form} className={className} layout={layout} onFinish={onFinish}>
      {formItems.map((item) => {
        const {
          name,
          component: Component,
          label,
          componentProps,
          ...otherItem
        } = item;
        return (
          <FormItem
            className={'w-full'}
            key={name}
            label={label ?? name}
            name={name}
            {...otherItem}
          >
            {<Component {...componentProps} {...otherItem} />}
          </FormItem>
        );
      })}
      <FormItem>
        <Button type={'primary'} htmlType={'submit'}>
          提交
        </Button>
      </FormItem>
    </Form>
  );
}
