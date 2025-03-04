import React from 'react';
import { Form, Input, Radio, Button, Card, Row, Col } from 'antd';

const PaymentConfirmation = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form Values: ', values);
    // Thực hiện gọi API hoặc các thao tác xử lý thanh toán ở đây
  };

  return (
    <Card title="Xác nhận thanh toán" style={{ maxWidth: 900, margin: '0 auto' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          customerName: 'Nguyen Quân',
          email: 'nguyenquan.hoang@gmail.com',
          phone: '0123456789',
          vatType: 'personal', // Mặc định chọn 'Cá nhân'
        }}
      >
        <Row gutter={[24, 24]}>
          {/* Cột trái: Thông tin khách hàng */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Tên khách hàng"
              name="customerName"
              rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
            >
              <Input placeholder="Nhập tên khách hàng" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' },
              ]}
            >
              <Input placeholder="nhập email" />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <Input placeholder="nhập số điện thoại" />
            </Form.Item>

            <Form.Item
              label="Loại hoá đơn VAT"
              name="vatType"
              rules={[{ required: true, message: 'Vui lòng chọn loại hoá đơn!' }]}
            >
              <Radio.Group>
                <Radio value="company">Doanh nghiệp</Radio>
                <Radio value="personal">Cá nhân</Radio>
              </Radio.Group>
            </Form.Item>

            {/* Hiển thị các trường dành cho doanh nghiệp nếu vatType = 'company' */}
            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue }) =>
                getFieldValue('vatType') === 'company' && (
                  <>
                    <Form.Item
                      label="Tên công ty"
                      name="companyName"
                      rules={[{ required: true, message: 'Vui lòng nhập tên công ty!' }]}
                    >
                      <Input placeholder="Ví dụ: Công ty ABC" />
                    </Form.Item>

                    <Form.Item
                      label="Mã số thuế"
                      name="taxCode"
                      rules={[{ required: true, message: 'Vui lòng nhập mã số thuế!' }]}
                    >
                      <Input placeholder="Nhập mã số thuế" />
                    </Form.Item>

                    <Form.Item
                      label="Email nhận hoá đơn"
                      name="invoiceEmail"
                      rules={[
                        { required: true, message: 'Vui lòng nhập email nhận hoá đơn!' },
                        { type: 'email', message: 'Email không hợp lệ!' },
                      ]}
                    >
                      <Input placeholder="Ví dụ: abc@gmail.com" />
                    </Form.Item>
                  </>
                )
              }
            </Form.Item>
          </Col>

          {/* Cột phải: Thông tin đơn hàng */}
          <Col xs={24} md={12}>
            <Card>
              <p><strong>Tên gói:</strong> Callbot 05</p>
              <p><strong>Số lượng:</strong> 12 block</p>
              <p><strong>Giá gói:</strong> 99.999 đ / block</p>
              <p><strong>Tạm tính:</strong> 5.000.000 đ</p>
              <p><strong>VAT 10%:</strong> 500.000 đ</p>
              <p><strong>Tổng tiền:</strong> 5.500.000 đ</p>
            </Card>
          </Col>
        </Row>

        <div style={{ textAlign: 'right', marginTop: 24 }}>
          <Button type="primary" htmlType="submit">
            Thanh toán
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default PaymentConfirmation;