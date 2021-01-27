import {
  action,
  observable,
  makeObservable,
} from "mobx";
import * as firebase from "firebase";

class ItemStore {
  @observable items = [];
  @observable cart = [];
  @observable orders = [];
  @observable loading = true;

  constructor() {
    makeObservable(this);
  }

  @action getItems = () => {
    console.log("here");
    var i = [];
    firebase
      .firestore()
      .collection("stores/aNDEbzt4SUuy8MTNUYbb/items")
      .get()
      .then((res) => {
        res.forEach((doc) => {
          i.push(doc.data());
        });
        this.loading = false;
        this.items = i;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        errors += `${errorCode}: ${errorMessage}`;
        this.loading = false;
      });
  };
}
const Store = new ItemStore();
export default Store;
