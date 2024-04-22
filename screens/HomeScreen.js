import {
  Animated,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Mic from 'react-native-vector-icons/Entypo';
import {SliderBase} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import axios from 'axios';
import ProductItem from '../components/ProductItem';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AddAddressScreen from './AddAddressScreen';
import {UserType} from '../UserContext';
import {BottomModal, SlideAnimation, ModalContent} from 'react-native-modals';
import Location from 'react-native-vector-icons/Entypo';

const HomeScreen = () => {
  const list = [
    {
      id: '0',
      image:
        'https://cdn.viettelstore.vn/Images/Product/ProductImage/1778159139.jpeg',
      name: 'Iphone',
      category: 'iphone',
    },
    {
      id: '1',
      image:
        'https://cdn.tgdd.vn/Products/Images/522/294104/ipad-pro-m2-11-wifi-xam-thumb-600x600.jpg',
      name: 'Ipad',
      category: 'ipad',
    },
    {
      id: '3',
      image:
        'https://think-ecuador.com/wp-content/uploads/2021/12/MacBook_Pro_16-in_Space_Gray_PDP_Image_Position-1__MXLA.jpeg',
      name: 'Macbook',
      category: 'Macbook',
    },
    {
      id: '4',
      image:
        'https://shopdunk.com/images/thumbs/0022756_imac-m3-2023-24-inch-8-core-gpu8gb256gb.jpeg',
      name: 'Imac',
      category: 'imac',
    },
    {
      id: '5',
      image: 'https://maccenter.vn/App_images/MacMini-M2Pro-A.jpg',
      name: 'Mac Mini',
      category: 'imac',
    },
    {
      id: '6',
      image:
        'https://cdn.sforum.vn/sforum/wp-content/uploads/2019/06/2019-mac-pro-side-and-front.jpg',
      name: 'Mac Pro',
      category: 'Macbook',
    },
    {
      id: '7',
      image:
        'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MT3U3ref_VW_34FR+watch-case-45-aluminum-pink-nc-s9_VW_34FR+watch-face-45-aluminum-pink-s9_VW_34FR_WF_CO_GEO_VN?wid=2000&hei=2000&fmt=png-alpha&.v=1694507905569',
      name: 'Apple Watch',
      category: 'watch',
    },
    {
      id: '8',
      image:
        'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MME73?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1632861342000',
      name: 'Airpods',
      category: 'Airpods',
    },
    {
      id: '9',
      image:
        'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/apple-tv-4k-hero-select-202210_FMT_WHH?wid=640&hei=600&fmt=jpeg&qlt=90&.v=1664896361164',
      name: 'Apple TV',
      category: 'TV',
    },
  ];
  const images = [
    'https://genk.mediacdn.vn/139269124445442048/2022/9/4/iphone-14-16621876971011395164960-1-56-1125-1855-crop-16621877246971474113186-1662252428117-1662252428584705129295.jpg',
    'https://quangcaongoaitroi.com/wp-content/uploads/2022/09/Unique-OOH-Samsung-ca-khia-Apple-ra-mat-iphone-14-bang-bien-quang-cao-ngoai-troi-2.jpg',
    'https://images.macrumors.com/t/yCjraNe8aISrEVkj3YYEHmaij0Y=/2500x/article-new/2023/08/iPhone-14-Pro-vs-iPhone-15-Pro-Feature-2.jpg',
  ];
  const deals = [
    {
      id: '20',
      title: 'iPhone 15 Pro Max 256GB',
      category: 'iphone',
      oldPrice: 34990,
      price: 33990,
      image:
        'https://cdn.viettelstore.vn/Images/Product/ProductImage/291703442.jpeg',
      carouselImages: [
        'https://cdn.viettelstore.vn/Images/Product/ProductImage/291703442.jpeg',
        'https://wp-pa.phonandroid.com/uploads/2023/09/iphone-15-pro.jpg',
        'https://prosteps.cloudimg.io/v7m/resizeinbox/1000x1000/fsharp0/https://tilroy.s3.eu-west-1.amazonaws.com/354/product/iPhone%2015%20Pro%20Max%20256GB%20Blue%20Titanium2_1a6fqy1lcmnzs.jpg',
        'https://image-us.24h.com.vn/upload/2-2023/images/2023-04-11/Ly-do-khien-fan-chi-dam-cho-iPhone-15-Pro-Max-bo-qua-iPhone-15-Pro-iphone-14-pro1-1320-1681202235-831-width1200height794.jpg',
      ],
      color: 'Stellar Green',
      ram: '6GB',
      size: '128GB',
    },
    {
      id: '30',
      title: 'MacBook Air 13 inch M2 2022',
      oldPrice: 3399000,
      category: 'Macbook',
      price: 3499000,
      image:
        'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665',
      carouselImages: [
        'https://www.apple.com/v/macbook-air-13-and-15-m2/e/images/overview/design/design-hero_endframe__olurqzgtbh6e_large.jpg',
        'https://image-us.24h.com.vn/upload/2-2023/images/2023-06-11/Apple-se-tung-MacBook-Air-15-inch-M3-sieu-nhe-sieu-trau-1-1686500337-533-width875height525.jpg',
        'https://static.doanhnhan.vn/images/upload/vanvu/02132023/cmc_1580.jpg',
        'https://reviewed-com-res.cloudinary.com/image/fetch/s--0Pl2Rm_6--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_792/https://reviewed-production.s3.amazonaws.com/attachment/a50d564edec148a4/MacBookAirM2-03.jpg',
      ],
      color: 'Midnight',
      ram: '32GB',
      size: '512GB',
    },
    {
      id: '40',
      title: 'iPad Pro 11 2022 M2 WiFi',
      oldPrice: 20190000,
      category: 'ipad',
      price: 23190000,
      image:
        'https://cdn.tgdd.vn/Products/Images/522/294104/ipad-pro-m2-11-wifi-xam-thumb-600x600.jpg',
      carouselImages: [
        'https://product.hstatic.net/1000259254/product/ipad_pro_m2_11_inch_wi-fi_space_gray-2_ee7a5fedf63e4f9e96c00d2a64fbd79a_grande.jpg',
        'https://static1.pocketnowimages.com/wordpress/wp-content/uploads/2022/12/ipad-pro-m2-vs-ipad-air-5-featured-image.jpg',
        'https://images.fpt.shop/unsafe/fit-in/576x430/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/12/2/638055947588127736_ipad-pro-11-inch-m2-wifi-xam-6.jpg',
      ],
      color: 'Grey',
      ram: '8GB',
      size: '64GB',
    },
    {
      id: '40',
      title: 'iMac 24 2023 M3',
      oldPrice: 12999,
      category: 'imac',
      price: 10999,
      image:
        'https://laptopvang.com/wp-content/uploads/2023/11/imac-m3-purple-600x600.jpg',
      carouselImages: [
        'https://www.apple.com/newsroom/images/2023/10/apple-supercharges-24-inch-imac-with-new-m3-chip/tile/Apple-iMac-M3-colors-231030.jpg.og.jpg?202311010148',
        'https://static.k-tuin.com/media/catalog/product/cache/1/image/0dc2d03fe217f8c83829496872af24a0/i/m/imac-24-pulgadas-con-chip-m3-plata.jpg',
        'https://imageservice.asgoodasnew.com/540/18282/2/title-0003.jpg',
      ],
      color: 'Sliver',
      ram: '8GB',
      size: '256GB',
    },
  ];
  const offers = [
    {
      id: '0',
      title: 'iPhone 15 Pro Max 256GB',
      offer: '72%',
      category: 'iphone',
      oldPrice: 34990,
      price: 33990,
      image:
        'https://cdn.viettelstore.vn/Images/Product/ProductImage/291703442.jpeg',
      carouselImages: [
        'https://cdn.viettelstore.vn/Images/Product/ProductImage/291703442.jpeg',
        'https://wp-pa.phonandroid.com/uploads/2023/09/iphone-15-pro.jpg',
        'https://prosteps.cloudimg.io/v7m/resizeinbox/1000x1000/fsharp0/https://tilroy.s3.eu-west-1.amazonaws.com/354/product/iPhone%2015%20Pro%20Max%20256GB%20Blue%20Titanium2_1a6fqy1lcmnzs.jpg',
        'https://image-us.24h.com.vn/upload/2-2023/images/2023-04-11/Ly-do-khien-fan-chi-dam-cho-iPhone-15-Pro-Max-bo-qua-iPhone-15-Pro-iphone-14-pro1-1320-1681202235-831-width1200height794.jpg',
      ],
      color: 'Stellar Green',
      ram: '6GB',
      size: '128GB',
    },
    {
      id: '1',
      title: 'iphone 14',
      offer: '40%',
      category: 'iphone',
      oldPrice: 7955,
      price: 3495,
      image: 'https://www.idboox.com/wp-content/uploads/2023/04/iPhone-14.jpg',
      carouselImages: [
        'https://www.cdiscount.com/pdt2/u/r/p/2/700x700/iphone14256purp/rw/apple-iphone-14-256gb-purple.jpg',
        'https://ssscellular.co.za/wp-content/uploads/2023/06/ca243819fea772f7ca40e7d84e93bdc99644c9e8_Apple_MQ5E3ZP_A_iPhone_Hero_2.jpg',
        'https://istyle.ma/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_14_plus_midnight_pdp_image_position-6_en_3.jpg',
      ],
      color: 'pink',
      ram: '6GB',
      size: '256GB',
    },
    {
      id: '2',
      title: 'Macbook Air M1',
      offer: '40%',
      category: 'Macbook',
      oldPrice: 7955,
      price: 3495,
      image:
        'https://cdn.tgdd.vn/Products/Images/44/231244/macbook-air-m1-2020-gold-600x600.jpg',
      carouselImages: [
        'https://cdn.tgdd.vn/Files/2022/11/17/1487723/macbook-air-m1-1.jpg',
      ],
      color: 'sliver',
      ram: '32GB',
      size: '512GB',
    },
    {
      id: '3',
      title: 'Macbook Air M2',
      offer: '40%',
      category: 'Macbook',
      oldPrice: 24999,
      price: 19999,
      image:
        'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665',
      carouselImages: [
        'https://bizweb.dktcdn.net/100/444/581/products/1-jpeg-0bfd75c7-6597-4bc0-aa73-a79ba9978225.jpg?v=1656319345070',
        'https://thehikaku.net/pc/apple/image/22macbook-air-m2/x1400.jpg',
        'https://reviewed-com-res.cloudinary.com/image/fetch/s--0Pl2Rm_6--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_792/https://reviewed-production.s3.amazonaws.com/attachment/a50d564edec148a4/MacBookAirM2-03.jpg',
      ],
      color: 'Grey',
      ram: '32GB',
      size: '512GB',
    },
  ];
  const chooseName = item => {
    console.log('Tai' + `${item?.category}`);
    setCategory(item?.category);
  };
  const [search, setSearch] = useState('');
  const [products, setProduct] = useState([]);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const {userId, setUserId} = useContext(UserType);
  const [category, setCategory] = useState('');
  const [selectedAddress, setSelectedAdress] = useState('');
  const [items, setItems] = useState([
    {label: 'iphone', value: 'iphone'},
    {label: 'ipad', value: 'ipad'},
    {label: 'Macbook', value: 'Macbook'},
    {label: 'imac', value: 'imac'},
  ]);
  const products_2 = [
    {
      id: '20',
      title: 'iPhone 15 Pro Max 256GB',
      category: 'iphone',
      oldPrice: 34990,
      price: 33990,
      image:
        'https://cdn.viettelstore.vn/Images/Product/ProductImage/291703442.jpeg',
      carouselImages: [
        'https://cdn.viettelstore.vn/Images/Product/ProductImage/291703442.jpeg',
        'https://wp-pa.phonandroid.com/uploads/2023/09/iphone-15-pro.jpg',
        'https://prosteps.cloudimg.io/v7m/resizeinbox/1000x1000/fsharp0/https://tilroy.s3.eu-west-1.amazonaws.com/354/product/iPhone%2015%20Pro%20Max%20256GB%20Blue%20Titanium2_1a6fqy1lcmnzs.jpg',
        'https://image-us.24h.com.vn/upload/2-2023/images/2023-04-11/Ly-do-khien-fan-chi-dam-cho-iPhone-15-Pro-Max-bo-qua-iPhone-15-Pro-iphone-14-pro1-1320-1681202235-831-width1200height794.jpg',
      ],
      color: 'Stellar Green',
      ram: '6GB',
      size: '128GB',
    },
    {
      id: '30',
      title: 'MacBook Air 13 inch M2 2022',
      oldPrice: 3399000,
      category: 'Macbook',
      price: 3499000,
      image:
        'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665',
      carouselImages: [
        'https://www.apple.com/v/macbook-air-13-and-15-m2/e/images/overview/design/design-hero_endframe__olurqzgtbh6e_large.jpg',
        'https://image-us.24h.com.vn/upload/2-2023/images/2023-06-11/Apple-se-tung-MacBook-Air-15-inch-M3-sieu-nhe-sieu-trau-1-1686500337-533-width875height525.jpg',
        'https://static.doanhnhan.vn/images/upload/vanvu/02132023/cmc_1580.jpg',
        'https://reviewed-com-res.cloudinary.com/image/fetch/s--0Pl2Rm_6--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_792/https://reviewed-production.s3.amazonaws.com/attachment/a50d564edec148a4/MacBookAirM2-03.jpg',
      ],
      color: 'Midnight',
      ram: '32GB',
      size: '512GB',
    },
    {
      id: '40',
      title: 'iPad Pro 11 2022 M2 WiFi',
      oldPrice: 20190000,
      category: 'ipad',
      price: 23190000,
      image:
        'https://cdn.tgdd.vn/Products/Images/522/294104/ipad-pro-m2-11-wifi-xam-thumb-600x600.jpg',
      carouselImages: [
        'https://product.hstatic.net/1000259254/product/ipad_pro_m2_11_inch_wi-fi_space_gray-2_ee7a5fedf63e4f9e96c00d2a64fbd79a_grande.jpg',
        'https://static1.pocketnowimages.com/wordpress/wp-content/uploads/2022/12/ipad-pro-m2-vs-ipad-air-5-featured-image.jpg',
        'https://images.fpt.shop/unsafe/fit-in/576x430/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/12/2/638055947588127736_ipad-pro-11-inch-m2-wifi-xam-6.jpg',
      ],
      color: 'Grey',
      ram: '8GB',
      size: '64GB',
    },
    {
      id: '40',
      title: 'iMac 24 2023 M3',
      oldPrice: 12999,
      category: 'imac',
      price: 10999,
      image:
        'https://laptopvang.com/wp-content/uploads/2023/11/imac-m3-purple-600x600.jpg',
      carouselImages: [
        'https://www.apple.com/newsroom/images/2023/10/apple-supercharges-24-inch-imac-with-new-m3-chip/tile/Apple-iMac-M3-colors-231030.jpg.og.jpg?202311010148',
        'https://static.k-tuin.com/media/catalog/product/cache/1/image/0dc2d03fe217f8c83829496872af24a0/i/m/imac-24-pulgadas-con-chip-m3-plata.jpg',
        'https://imageservice.asgoodasnew.com/540/18282/2/title-0003.jpg',
      ],
      color: 'Sliver',
      ram: '8GB',
      size: '256GB',
    },
    {
      id: '0',
      title: 'iPhone 15 Pro Max 256GB',
      offer: '72%',
      category: 'iphone',
      oldPrice: 34990,
      price: 33990,
      image:
        'https://cdn.viettelstore.vn/Images/Product/ProductImage/291703442.jpeg',
      carouselImages: [
        'https://cdn.viettelstore.vn/Images/Product/ProductImage/291703442.jpeg',
        'https://wp-pa.phonandroid.com/uploads/2023/09/iphone-15-pro.jpg',
        'https://prosteps.cloudimg.io/v7m/resizeinbox/1000x1000/fsharp0/https://tilroy.s3.eu-west-1.amazonaws.com/354/product/iPhone%2015%20Pro%20Max%20256GB%20Blue%20Titanium2_1a6fqy1lcmnzs.jpg',
        'https://image-us.24h.com.vn/upload/2-2023/images/2023-04-11/Ly-do-khien-fan-chi-dam-cho-iPhone-15-Pro-Max-bo-qua-iPhone-15-Pro-iphone-14-pro1-1320-1681202235-831-width1200height794.jpg',
      ],
      color: 'Stellar Green',
      ram: '6GB',
      size: '128GB',
    },
    {
      id: '1',
      title: 'iphone 14',
      offer: '40%',
      category: 'iphone',
      oldPrice: 7955,
      price: 3495,
      image: 'https://www.idboox.com/wp-content/uploads/2023/04/iPhone-14.jpg',
      carouselImages: [
        'https://www.cdiscount.com/pdt2/u/r/p/2/700x700/iphone14256purp/rw/apple-iphone-14-256gb-purple.jpg',
        'https://ssscellular.co.za/wp-content/uploads/2023/06/ca243819fea772f7ca40e7d84e93bdc99644c9e8_Apple_MQ5E3ZP_A_iPhone_Hero_2.jpg',
        'https://istyle.ma/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_14_plus_midnight_pdp_image_position-6_en_3.jpg',
      ],
      color: 'pink',
      ram: '6GB',
      size: '256GB',
    },
    {
      id: '2',
      title: 'Macbook Air M1',
      offer: '40%',
      category: 'Macbook',
      oldPrice: 7955,
      price: 3495,
      image:
        'https://cdn.tgdd.vn/Products/Images/44/231244/macbook-air-m1-2020-gold-600x600.jpg',
      carouselImages: [
        'https://cdn.tgdd.vn/Files/2022/11/17/1487723/macbook-air-m1-1.jpg',
      ],
      color: 'sliver',
      ram: '32GB',
      size: '512GB',
    },
    {
      id: '3',
      title: 'Macbook Air M2',
      offer: '40%',
      category: 'Macbook',
      oldPrice: 24999,
      price: 19999,
      image:
        'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665',
      carouselImages: [
        'https://bizweb.dktcdn.net/100/444/581/products/1-jpeg-0bfd75c7-6597-4bc0-aa73-a79ba9978225.jpg?v=1656319345070',
        'https://thehikaku.net/pc/apple/image/22macbook-air-m2/x1400.jpg',
        'https://reviewed-com-res.cloudinary.com/image/fetch/s--0Pl2Rm_6--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_792/https://reviewed-production.s3.amazonaws.com/attachment/a50d564edec148a4/MacBookAirM2-03.jpg',
      ],
      color: 'Grey',
      ram: '32GB',
      size: '512GB',
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProduct(response.data);
      } catch (error) {
        console.log('error message', error);
      }
    };
    fetchData();
  }, []);

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const cart = useSelector(state => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.4:8000/addresses/${userId}`,
      );
      const {addresses} = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  console.log('TaiTaiTaiTAI' + category);

  const handleSearch = () => {
    console.log('TaiTaiTaiTAI' + search);
  };

  return (
    <>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === 'android' ? 0 : 0,
          flex: 1,
          backgroundColor: 'white',
        }}>
        <ScrollView>
          <View
            style={{
              backgroundColor: '#1d1d1f',
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
            }}>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 7,
                gap: 3,
                backgroundColor: 'white',
                borderRadius: 3,
                height: 38,
                flex: 1,
              }}>
              <Icon
                style={{paddingLeft: 10}}
                name="search1"
                size={22}
                color="black"
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <View>
                  <TextInput
                    placeholder="Tìm kiếm sản phẩm"
                    placeholderTextColor="black"
                    value={setSearch}
                    onChangeText={text => setSearch(text)}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    style={{backgroundColor: '#6E6E73', padding: 7, borderRadius: 5, marginLeft: 90}}
                    onPress={handleSearch}>
                    <Text style={styles.buttonText}>Tìm kiếm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Pressable>
            <Mic name="mic" size={24} color="white" />
          </View>

          <Pressable
            onPress={() => {
              setModalVisible(!modalVisible); // Đảo ngược trạng thái modalVisible
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
              gap: 5,
              backgroundColor: '#6E6E73',
            }}>
            <Location
              name="location"
              size={24}
              color="white"
              style={{marginLeft: 15}}
            />

            <Pressable>
              {selectedAddress ? (
                <Text>
                  Địa chỉ: {selectedAddress?.name} - {selectedAddress?.street}
                </Text>
              ) : (
                <Text style={{fontSize: 13, fontWeight: '500', color: 'white'}}>
                  Thêm địa chỉ nhận hàng
                </Text>
              )}
            </Pressable>

            <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
          </Pressable>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  margin: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => chooseName(item)}>
                <Image
                  style={{width: 50, height: 50, resizeMode: 'contain'}}
                  source={{uri: item.image}}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: '500',
                    marginTop: 5,
                  }}>
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <SliderBox
            images={images}
            autoPlay={true}
            autoPlayInterval={2000}
            circleLoop
            dotColor={'#ffffff'}
            inactiveDotColor="white"
            ImageComponentStyle={{width: '100%'}}
          />
          <View>
            <Text
              style={{
                height: 1,
                borderColor: '#D0D0D0',
                borderWidth: 2,
              }}
            />
            <Text
              style={{
                padding: 10,
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: '#1d1d1f',
              }}>
              {' '}
              Sản phẩm bán chạy trong tuần
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
              }}>
              {deals.map((item, index) => (
                <Pressable
                  style={{
                    marginVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() =>
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
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      flexDirection: 'row',
                      padding: 5,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'space-around',
                    }}>
                    <Image
                      style={{
                        width: 180,
                        height: 180,
                        resizeMode: 'contain',
                        borderRadius: 10,
                      }}
                      source={{uri: item?.image}}
                    />

                    <View style={{marginLeft: 20}}>
                      <Text
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '900',
                        }}>
                        {item?.title}
                      </Text>
                      <Text>Màu sắc: {item?.color}</Text>
                      <Text>Ram: {item?.ram}</Text>
                      <Text>Bộ nhớ: {item?.size}</Text>
                      <View style={{flexDirection: 'row', marginTop: 20}}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#2997FF',
                            fontWeight: 'bold',
                          }}>
                          Giá bán:{' '}
                        </Text>
                        <Text style={{fontSize: 20, color: '#2997FF'}}>
                          {item?.price}{' '}
                        </Text>
                        <Text
                          style={{
                            fontSize: 20,
                            textDecorationLine: 'underline',
                            color: '#2997FF',
                          }}>
                          đ
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{textDecorationLine: 'line-through'}}>
                          Giá gốc: {item?.oldPrice}đ
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

          <View>
            <View style={{marginTop: 20}} />
            <Text
              style={{
                height: 1,
                borderColor: '#D0D0D0',
                borderWidth: 2,
                marginTop: 15,
              }}
            />
            <Text
              style={{
                padding: 10,
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: '#1d1d1f',
              }}>
              Giảm giá trong ngày
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {offers.map((item, index) => (
                <Pressable
                  style={{
                    marginVertical: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                  onPress={() =>
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
                  <Text style={{fontWeight: 'bold'}}>{item?.title}</Text>

                  <View
                    style={{
                      backgroundColor: '#1d1d1f',
                      paddingVertical: 5,
                      width: 130,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                      borderRadius: 4,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 13,
                        fontWeight: 'bold',
                      }}>
                      {' '}
                      Khuyến mãi {item?.offer}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
          {/* <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: '45%',
              marginBottom: open ? 50 : 15,
            }}>
            <DropDownPicker
              style={{
                borderColor: '#B7B7B7',
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category} //genderValue
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="choose category"
              placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderOpen}
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View> */}
          <Text
            style={{
              height: 1,
              borderColor: '#D0D0D0',
              borderWidth: 2,
              marginTop: 15,
            }}
          />
          <View>
            <Text
              style={{
                padding: 10,
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: '#1d1d1f',
              }}>
              Sản phẩm
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
            }}>
            <Pressable
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {search
                ? products_2
                    .filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
                    .map((item, index) => (
                      <ProductItem item={item} key={index} />
                    ))
                : category
                ? products_2
                    .filter(item => item.category === category)
                    .map((item, index) => (
                      <ProductItem item={item} key={index} />
                    ))
                : products_2.map((item, index) => (
                    <Pressable
                      style={{
                        marginVertical: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 5,
                        marginRight: 5,
                      }}
                      onPress={() =>
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
                      <ProductItem item={item} key={index} />
                    </Pressable>
                  ))}
            </Pressable>

            {/* {products_2
              ?.filter(item => item.category === category)
              .map((item, index) => (
                <ProductItem item={item} key={index} />
              ))} */}
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}>
        <ModalContent style={{width: '100%', height: 350}}>
          <View style={{marginBottom: 8}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Địa chỉ</Text>

            <Text style={{marginTop: 5, fontSize: 16, color: 'gray'}}>
              Chọn địa chỉ nhận hàng hoặc thêm địa chỉ nhận hàng
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* already added addresses */}
            {addresses?.map((item, index) => (
              <Pressable
                onPress={() => setSelectedAdress(item)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: '#D0D0D0',
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor:
                    selectedAddress === item ? '#FBCEB1' : 'white',
                }}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 'bold',
                      color: 'black',
                      color: 'black',
                    }}>
                    {item?.name}
                  </Text>
                  <Mic name="location-pin" size={24} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{
                    width: 130,
                    fontSize: 13,
                    textAlign: 'center',
                    color: 'black',
                  }}>
                  {item?.houseNo},{item?.landmark}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{
                    width: 130,
                    fontSize: 13,
                    textAlign: 'center',
                    color: 'black',
                  }}>
                  {item?.street}
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Address');
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: '#D0D0D0',
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#0066b2',
                  fontWeight: '500',
                }}>
                Thêm địa chỉ nhận hàng
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{flexDirection: 'column', gap: 7, marginBottom: 30}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Mic name="location-pin" size={22} color="#0066b2" />
              <Text style={{color: '#0066b2', fontWeight: '400'}}>
                Sử dụng vị trí hiện tại
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
