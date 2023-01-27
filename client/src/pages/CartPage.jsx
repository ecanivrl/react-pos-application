import React, { useState } from 'react';
import Header from '../components/header/Header';
import { Button, Card,  Table } from 'antd';
import CreateBill from '../components/cart/CreateBill';

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
      <h1 className='text-3xl font-bold text-center pb-5'>Sepet Detay</h1>
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          pagination={false}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>549.00₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>Ara Toplam</span>
              <span className="text-red-600">43.92₺</span>
            </div>
            <div className="flex justify-between">
              <b>Toplam</b>
              <b>592.92₺</b>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              type="primary"
              className="mt-4 w-full"
              size="large"
            >
              Sipariş Oluştur
            </Button>
          </Card>
        </div>
      </div>
     <CreateBill setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>
    </>
  );
};

export default CartPage;
