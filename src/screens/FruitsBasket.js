import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { imgFruits } from "../aux";
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";

// Pegando todo o tamanho da tela do celular
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default class FruitsBasket extends Component {
  constructor() {
    super();
    this.state = {
      fruits: []
    };
  }

  // Consumindo dados da API
  componentDidMount() {
    axios.get("https://api-pesada.herokuapp.com/fruits").then(res => {
      this.setState({ fruits: res.data.fruits });
    });
  }

  // Direcionando para a tela principal
  home = () => {
    this.props.navigation.navigate("Home");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.9} onPress={this.home}>
            <Icon
              name="md-arrow-round-back"
              size={20}
              color={"#F5923B"}
              style={styles.espaco}
            />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Informações do cliente</Text>
        </View>

        <View style={styles.content}>
          {/* Descarregando dados da API */}
          <FlatList
            data={this.state.fruits}
            keyExtractor={item => item.name}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.fruit}>
                <Image source={imgFruits(item.name)} style={styles.imgFruits} />
                <Text style={styles.nameFruits}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    width: width,
    height: 40,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 15,
    paddingTop: 10
  },
  espaco: {
    marginRight: 50
  },
  textHeader: {
    color: "#F5923B",
    fontSize: 16
  },
  content: {
    width: width,
    height: height,
    paddingTop: 10,
    paddingBottom: 120,
    paddingLeft: 10
  },
  fruit: {
    width: 156,
    height: 223,
    backgroundColor: "#fff",
    flexDirection: "column",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 20,
    borderWidth: 0.3,
    borderColor: "#c4c4c4",
    padding: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 6
  },
  imgFruits: {
    width: 140,
    height: 150,
    marginBottom: 5,
    borderRadius: 4
  },
  nameFruits: {
    fontSize: 14,
    color: "#8f8f8f",
    marginBottom: 5
  }
});
