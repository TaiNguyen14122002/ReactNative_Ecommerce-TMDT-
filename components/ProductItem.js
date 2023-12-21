import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/CartReducer';
import {useNavigation} from '@react-navigation/native';

const ProductItem = ({item}) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const addItemToCart = item => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  return (
    <Pressable style={{marginHorizontal: 10, marginVertical: 15}} onPress={() =>
      navigation.navigate('Info', {
        id: item.id,
        title: item.title,
        price: item?.price,
        carouselImages: item.carouselImages,
        color: item?.color,
        size: item?.size,
        oldPrice: item?.oldPrice,
        item: item,
      })
    }>
      
      <Image
        style={{width: 150, height: 150, resizeMode: 'contain'}}
        source={{uri: item?.image}}
      />

      <Text numberOfLines={1} style={{width: 150, marginTop: 10}}>
        <Text style={{alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>
        {item?.title}
        </Text>
        
      </Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        
        <Text style={{fontWeight: '400', marginLeft: -3}}> {item?.category}</Text>
        <Text style={{ fontWeight: '400'}}>
          {item?.ram}-{item?.size}
        </Text>
        
      </View>
      <View style={{alignItems:'center', marginTop: 10}}>
      <Text style={{fontSize: 15, fontWeight: 'bold', color: '#1d1d1f'}}>{item?.price}đ</Text>
      </View>

      <Pressable
        onPress={() => addItemToCart(item)}
        style={{
          backgroundColor: '#1d1d1f',
          padding: 10,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginTop: 10,
        }}>
        {addedToCart ? (
          <View>
            <Text style={{color: 'white'}}>Đã thêm</Text>
          </View>
        ) : (
          <Text style={{color: 'white'}}>Thêm vào giỏ hàng</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
