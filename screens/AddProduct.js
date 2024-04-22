import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  Inpu,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Input} from 'react-native-elements';

const AddProduct = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [oldPrice, setoldPrice] = useState('');
  const [price, setprice] = useState('');
  const [image, setimage] = useState('');
  const [carouselImages, setcarouselImages] = useState('');
  const [color, setcolor] = useState('');
  const [ram, setram] = useState('');
  const [size, setsize] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    const product = {
      id: id,
      title: title,
      category: category,
      oldPrice: oldPrice,
      price: price,
      image: image,
      carouselImages: carouselImages,
      color: color,
      ram: ram,
      size: size,
    };

    // send a post request to the backend API
    axios
      .post('http://192.168.1.4:8000/AddProduct', product)
      .then(message => {
        console.log(message);
        Alert.alert('Thông báo', 'Thêm sản phẩm thành công');
        setId('');
        setTitle('');
        setCategory('');
        navigation.navigate('Main');
      })
      .catch(error => {
        Alert.alert('Lỗi', 'Thêm sản phẩm thất bại');
        console.log('Thêm sản phẩm thất bại', error);
        console.log(id, title, category);
      });
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 20}}></View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: 'black',
            borderRadius: 5,
            borderBottomWidth: 1,
            borderColor: 'black',
          }}>
          Thêm sản phẩm
        </Text>

        <Pressable
          onPress={handleRegister}
          style={{
            width: 150,
            backgroundColor: '#1d1d1f',
            borderRadius: 6,
            padding: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            Thêm sản phẩm
          </Text>
        </Pressable>
      </View>
      <Pressable>
        <ScrollView style={{marginBottom: 10, padding: 10}}>
          <View >
            <Input
              label="Id"
              placeholder="Id sản phẩm"
              value={id}
              onChangeText={setId}
            />
            <Input
              label="title"
              placeholder="title"
              value={title}
              onChangeText={setTitle}
            />
            <Input
              label="category"
              placeholder="The Loai"
              value={category}
              onChangeText={setCategory}
            />
            <Input
              label="Old Price"
              placeholder="Enter old price"
              value={oldPrice}
              onChangeText={setoldPrice}
            />
            <Input
              label="Price"
              placeholder="Enter price"
              value={price}
              onChangeText={setprice}
            />
            <Input
              label="Image URL"
              placeholder="Enter image URL"
              value={image}
              onChangeText={setimage}
            />
            <Input
              label="Carousel Images"
              placeholder="Enter carousel images (comma-separated)"
              value={carouselImages}
              onChangeText={setcarouselImages}
            />
            <Input
              label="Color"
              placeholder="Enter color"
              value={color}
              onChangeText={setcolor}
            />
            <Input
              label="RAM"
              placeholder="Enter RAM"
              value={ram}
              onChangeText={setram}
            />
            <Input
              label="Size"
              placeholder="Enter size"
              value={size}
              style={{marginBottom: 10}}
              onChangeText={setsize}
            />
            <Input
              editable={false}
              style={{marginBottom: 10}}
              
            />
            <View style={{marginTop: 10}}>
              <Text>Tai</Text>
            </View>
          </View>
        </ScrollView>
      </Pressable>
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({});
