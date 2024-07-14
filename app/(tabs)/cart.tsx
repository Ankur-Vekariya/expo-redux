import { removeProduct } from "@/redux/actions/product";
import { AntDesign } from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import { connect, useSelector } from "react-redux";
import { theme } from "@/utils/theme";

function CartScreen(props) {
  const products = useSelector((state) => state.cart.products);
  console.log("cart tab", products);

  const Item = ({ item }: ItemProps) => (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: theme.dark,
        marginVertical: 5,
        marginHorizontal: 16,
        borderRadius: 20,
      }}
    >
      <View
        style={{
          width: "85%",
          backgroundColor: theme.light,
          borderRadius: 20,
          padding: 10,
        }}
      >
        <Text style={[styles.title, { fontWeight: 700 }]}>{item.title}</Text>
        <Text style={styles.title}>{item.id}</Text>
        <Text style={styles.title}>{item.price}</Text>

        <Text style={styles.title} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      <View
        style={{ width: "15%", alignItems: "center", justifyContent: "center" }}
      >
        <TouchableOpacity
          onPress={() => {
            props.remove(item.id);
          }}
          style={{
            padding: 2,
            backgroundColor: theme.light,
            borderRadius: 8,
          }}
        >
          <AntDesign name="plus" size={16} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, padding: 2, color: theme.light }}>
          {"1"}
        </Text>

        <TouchableOpacity
          onPress={() => {
            props.remove(item.id);
          }}
          style={{
            padding: 2,
            backgroundColor: theme.light,
            borderRadius: 8,
          }}
        >
          <AntDesign name="minus" size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={products}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
const mapStateToProps = (state) => {
  return {
    product: state.cart.product,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    remove: (id) => {
      dispatch(removeProduct(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    // backgroundColor: theme.primary_light,
  },
  item: {
    backgroundColor: theme.light,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 20,

    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0,
    // shadowRadius: 3.84,

    // elevation: 5,
  },
  title: {
    fontSize: 16,
  },
});
