import { observable } from "mobx";

interface AppState {
  uploadedImage: Object;
  predictionsResponse: Object;
  test: number;
}

class ObservableStore {
  @observable store: AppState = {
    uploadedImage: {},
    predictionsResponse: {},
    test: 1
  };
  setUploadedImage (image){
      this.store.uploadedImage = image
  }
  setPredictionsResponse (response) {
      this.store.predictionsResponse = response
  }
  setTest (number){
      this.store.test = number
  }
}

const observableStore = new ObservableStore();
export default observableStore;