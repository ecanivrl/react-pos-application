import { Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  SmileTwoTone
} from '@ant-design/icons';
import { deleteCart, increase, decrease, reset } from '../../redux/cartSlice';

const CartTotals = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
      <h2 className="bg-blue-600 text-center py-4 text-white font-bold text-sm sm:text-lg">
        Sepetteki Ürünler
      </h2>
      <ul className="ecani cart-items px-1 flex flex-col gap-y-3 py-2 pb-20 overflow-auto">
        {cart.cartItems.length > 0 ? (
          cart.cartItems.map((item) => (
            <li
              className="cart-item flex justify-between sm:px-1 px-0"
              key={item._id}
            >
              <div className="flex items-center">
                <img
                  onClick={() => setTimeout(dispatch(deleteCart(item))
                    ,2000)}
                  src={item.img}
                  alt=""
                  className="w-14 h-14  object-cover cursor-pointer"
                />
                <div className="flex flex-col ml-2">
                  <b>{item.title}</b>
                  <span>
                    {item.price}₺ x {item.quantity}
                  </span>
                </div>
              </div>
              <div className="flex items-center ">
                <Button
                  onClick={() => {
                    dispatch(increase(item));
                    message.success(`${item.title}  isimli Ürün Sepete 1 Adet Daha Eklendi`);
                  }}
                  type="primary"
                  size="small"
                  className="w-full flex items-center justify-center !rounded-full"
                  icon={<PlusCircleOutlined />}
                />
                <span className="font-bold w-6 inline-block text-center">
                  {item.quantity}
                </span>
                <Button
                  onClick={() => {
                    if (item.quantity === 1) {
                      dispatch(decrease(item));
                      message.success(`${item.title}  isimli Ürün Sepetten Silindi`);
                    }
                    if (item.quantity > 1) {
                      dispatch(decrease(item));
                      message.success(
                        `${item.title}  isimli Üründen 1 Adet Silindi`
                      );
                    }
                  }}
                  type="primary"
                  size="small"
                  className="w-full flex items-center justify-center !rounded-full"
                  icon={<MinusCircleOutlined />}
                />
              </div>
            </li>
          ))
        ) : (
          <div className="flex h-full justify-center gap-x-5 items-center ">
            <SmileTwoTone />
            <h1 className=" text-lg font-bold ">sepetiniz boş</h1>
          </div>
        )}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %{cart.tax}</b>
            <span className="text-red-700">
              +
              {(cart.total * cart.tax) / 100 > 0
                ? ((cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              ₺
            </span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-green-500 sm:text-xl text-lg">Net Tutar</b>
            <span className="text-xl">
              {cart.total + (cart.total * cart.tax) / 100 > 0 ? (
                (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
              ) : (
                <span>0.00</span>
              )}
              ₺
            </span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button type="primary" size="middle" className="w-full">
            Sipariş Oluştur
          </Button>
          <Button
          disabled={cart.cartItems.length === 0}
            type="primary"
            danger
            size="middle"
            className="w-full mt-2 flex justify-center items-center"
            icon={<ClearOutlined />}
            onClick={() => {
              dispatch(reset());
              message.success('Sepetteki bütün ürünler silindi');
            }}
          >
            Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
