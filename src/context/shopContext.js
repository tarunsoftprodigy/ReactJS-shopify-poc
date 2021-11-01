import React, { Component } from "react";
import Client from 'shopify-buy';

const ShopContext = React.createContext();

const client = Client.buildClient({
  storefrontAccessToken: "", //add your storefrontAccessToken (different from storefront API access token)
  domain: "", //add your store domain
});

class ShopProvider extends Component {
  state = {
    collections:[],
    collection:[],
    products: [],
    product: {},
    checkout: {},
    isCartOpen: false,
  };

  componentDidMount() {
    if (localStorage.checkout) {
      this.state.checkout.completedAt === null ? this.fetchCheckout(localStorage.checkout) : this.createCheckout()
    } else {
      this.createCheckout();
    }
    this.fetchAllProducts();
    this.fetchCollections();
  }

  createCheckout = async () => {
    const checkout = await client.checkout.create();
    localStorage.setItem("checkout", checkout.id);
    this.setState({ checkout: checkout });
  };

  fetchCheckout = (checkoutId) => {
    client.checkout.fetch(checkoutId)
    .then((checkout) => { 
        this.setState({ checkout: checkout })
      })
    .catch((err) => console.log(err));
  };

  addItem = async (variantId, quantity) => {
    const lineItemsToAdd = [
      {variantId , quantity: parseInt(quantity, 10)},
    ];
    const checkout = await client.checkout.addLineItems(
      this.state.checkout.id,
      lineItemsToAdd
    );
    this.setState({ checkout: checkout });
  };

  updateItem = async (productId, quantity) => {
    const lineItemsToUpdate = [
      {id : productId, quantity : parseInt(quantity, 10)}
    ];
     const checkout = await client.checkout.updateLineItems(
       this.state.checkout.id, 
       lineItemsToUpdate
      );
     this.setState({checkout: checkout})
  }

  removeItem = (id) => {
     const lineItemIdsToRemove = [id]
     client.checkout.removeLineItems(this.state.checkout.id, lineItemIdsToRemove).then((checkout) => {
         this.setState({checkout: checkout})
    });
  }

  fetchCollections = async () => {
    const collection = await client.collection.fetchAllWithProducts();
    this.setState({ collections: collection });
  };

  fetchCollectionWithId = async (id) => {
    const collection = await client.collection.fetchWithProducts(id);
    this.setState({ collection : collection  });
  };

  fetchAllProducts = async () => {
    const products = await client.product.fetchAll();
    this.setState({ products: products });
  };

  fetchProductWithId = async (id) => {
    const product = await client.product.fetch(id);
    this.setState({ product: product });
    return product;
  };

  closeCart = () => {
    this.setState({ isCartOpen: false });
  };

  openCart = () => {
    this.setState({ isCartOpen: true });
  };

  render() {

    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductWithId: this.fetchProductWithId,
          closeCart: this.closeCart,
          openCart: this.openCart,
          addItem: this.addItem,
          updateItem : this.updateItem,
          removeItem: this.removeItem,
          fetchCollection: this.fetchCollections,
          fetchCollectionWithId : this.fetchCollectionWithId
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };

export default ShopProvider;
