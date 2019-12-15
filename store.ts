import { observable } from "mobx";

interface AppState {
  uploadedImage: Object;
  predictionsResponse: Object;
  test: number;
  flowers: Object[];
  bestTag: string;
}

class ObservableStore {
  @observable store: AppState = {
    uploadedImage: {},
    predictionsResponse: {},
    test: 1,
    flowers: [],
    bestTag: ""
  };
  setUploadedImage(image) {
    this.store.uploadedImage = image;
  }
  setPredictionsResponse(response) {
    this.store.predictionsResponse = response;
  }
  setTest(number) {
    this.store.test = number;
  }
  setFlowers(flowers) {
    this.store.flowers = flowers;
  }
  setTag(tag) {
    this.store.bestTag = tag;
  }
}

const observableStore = new ObservableStore();
export default observableStore;
