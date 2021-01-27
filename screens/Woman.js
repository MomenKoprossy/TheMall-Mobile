import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import { inject, observer } from "mobx-react";
import { Icon, Product } from "../components/";

const { width } = Dimensions.get("screen");

@inject("Store")
@observer
export default class Woman extends React.Component {
  componentDidMount() {
    this.props.Store.getItems();
  }

  renderSearch = () => {
    const { navigation } = this.props;
    const iconContent = (
      <Icon
        size={16}
        color={theme.COLORS.MUTED}
        name="zoom-in"
        family="material"
      />
    );

    return (
      <Input
        right
        color="black"
        style={styles.search}
        iconContent={iconContent}
        placeholder="What are you looking for?"
        onFocus={() => navigation.navigate("Search")}
      />
    );
  };

  renderTabs = () => {
    const { navigation } = this.props;

    return (
      <Block row style={styles.tabs}>
        <Button
          shadowless
          style={[styles.tab, styles.divider]}
          onPress={() => navigation.navigate("Categories")}
        >
          <Block row middle>
            <Icon name="grid" family="feather" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>
              Categories
            </Text>
          </Block>
        </Button>
        <Button
          shadowless
          style={styles.tab}
          onPress={() => navigation.navigate("Deals")}
        >
          <Block row middle>
            <Icon
              size={16}
              name="camera-18"
              family="GalioExtra"
              style={{ paddingRight: 8 }}
            />
            <Text size={16} style={styles.tabTitle}>
              Best Deals
            </Text>
          </Block>
        </Button>
      </Block>
    );
  };

  renderProducts = () => {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.props.Store.loading}
            onRefresh={() => this.props.Store.getItems()}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}
      >
        <Block flex>
          {this.props.Store.items.map((item, index) => (
            <Product key={index} product={item} horizontal />
          ))}
        </Block>
      </ScrollView>
    );
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.props.Store.loading ? (
          <ActivityIndicator color="blue" />
        ) : (
          this.renderProducts()
        )}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
    flex: 1,
    justifyContent: "center",
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300",
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});