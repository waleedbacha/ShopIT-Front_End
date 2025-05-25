export const getPriceQueryParams = (SearchParams, key, value) =>  {

const hasValueInParam = SearchParams.has(key);

if(value && hasValueInParam){
    SearchParams.set(key,value);
}else if (value) {
SearchParams.append(key,value);
}else if (hasValueInParam) {
    SearchParams.delete(key);
}
return SearchParams;
};

export const calculateOrderCost = (cartItems) => {
const itemsPrice = cartItems?.reduce(
   (acc, item) => acc + item.price * item.quantity, 0 
);
const shippingPrice = itemsPrice > 200 ? 0 : 25;
const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

return {
    itemsPrice: Number(itemsPrice).toFixed(2),
    shippingPrice,
    taxPrice,
    totalPrice,
};
};