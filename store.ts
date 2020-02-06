import { observable } from "mobx";

interface AppState {
  uploadedImage: Object;
  predictionsResponse: Object;
  test: number;
  flowers: Object[];
  bestTag: string;
  questions: Object[];
}

const questions = [
  {
    question: "What is localhost's IP address?",
    answers: [
      { id: "1", text: "192.168.1.1" },
      { id: "2", text: "127.0.0.1", correct: true },
      { id: "3", text: "209.85.231.104" },
      { id: "4", text: "66.220.149.25" }
    ]
  },
  {
    question: "What kind of fruit was used to name a computer in 1984?",
    answers: [
      { id: "1", text: "Blackberry" },
      { id: "2", text: "Blueberry" },
      { id: "3", text: "Pear" },
      { id: "4", text: "Apple", correct: true }
    ]
  }
];

class ObservableStore {
  @observable store: AppState = {
    uploadedImage: {},
    predictionsResponse: {},
    test: 1,
    flowers: [],
    bestTag: "",
    questions: questions
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
