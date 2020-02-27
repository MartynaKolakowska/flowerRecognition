import { observable } from "mobx";

interface AppState {
  uploadedImage: Object;
  predictionsResponse: Object;
  test: number;
  flowers: Object[];
  bestTag: string;
  questions: Object[];
  quizScore: number;
}

export const questionsPL = [
  {
    question: "Prawidłowa nazwa dmuchawca to:",
    answers: [
      { id: "1", text: "Jaskier" },
      { id: "2", text: "Mniszek Pospolity", correct: true },
      { id: "3", text: "Rumianek" },
      { id: "4", text: "Mlecz" }
    ]
  },
  {
    question: "Żółta róża jest symbolem:",
    answers: [
      { id: "1", text: "Nienawiści" },
      { id: "2", text: "Zazdrości" },
      { id: "3", text: "Miłości" },
      { id: "4", text: "Przyjaźni", correct: true }
    ]
  },
  {
    question: "Jaka jest potoczna nazwa Gladiolusa",
    answers: [
      { id: "1", text: "Mieczyk", correct: true },
      { id: "2", text: "Lilia" },
      { id: "3", text: "Irys" },
      { id: "4", text: "Dzwonek" }
    ]
  },
  {
    question: "Kwiat o najsilniejszym zapachu to:",
    answers: [
      { id: "1", text: "Konwalia" },
      { id: "2", text: "Lilia", correct: true },
      { id: "3", text: "Peonia" },
      { id: "4", text: "Fiołek" }
    ]
  },
  {
    question: "Kwiat kwitnący w stawie to:",
    answers: [
      { id: "1", text: "Jaskier" },
      { id: "2", text: "Kaczeniec" },
      { id: "3", text: "Irys" },
      { id: "4", text: "Nenufar", correct: true }
    ]
  },
  {
    question: "Który z tych kwiatów zakwita najwcześniej:",
    answers: [
      { id: "1", text: "Przebiśnieg", correct: true },
      { id: "2", text: "Narcyz" },
      { id: "3", text: "Hiacynt" },
      { id: "4", text: "Tulipan" }
    ]
  },
  {
    question:
      "Z części krokusów jest produkowana jedna z najdroższych przypraw świata. Która?",
    answers: [
      { id: "1", text: "Kardamon" },
      { id: "2", text: "Kmin rzymski" },
      { id: "3", text: "Szafran", correct: true },
      { id: "4", text: "Pieprz Cayenne" }
    ]
  },
  {
    question: "Kwiat, którego łacińską nazwą jest Bellis to:",
    answers: [
      { id: "1", text: "Rumianek" },
      { id: "2", text: "Róża" },
      { id: "3", text: "Gerbera" },
      { id: "4", text: "Stokrotka", correct: true }
    ]
  },
  {
    question: "Symbolem Holandii jest:",
    answers: [
      { id: "1", text: "Tulipan", correct: true },
      { id: "2", text: "Róża" },
      { id: "3", text: "Słonecznik" },
      { id: "4", text: "Gerbera" }
    ]
  },
  {
    question: "Która z pośród wymienionych roślin nie ma kolców:",
    answers: [
      { id: "1", text: "Kaktus" },
      { id: "2", text: "Akacja" },
      { id: "3", text: "Mieczyk", correct: true },
      { id: "4", text: "Ostrokrzew" }
    ]
  }
];

export const questionsEN = [
  {
    question: "The correct name for the blowballs flower is:",
    answers: [
      { id: "1", text: "Buttercup" },
      { id: "2", text: "Dandelion", correct: true },
      { id: "3", text: "Camomile" },
      { id: "4", text: "Sonchus" }
    ]
  },
  {
    question: "The yellow rose is a symbol of:",
    answers: [
      { id: "1", text: "Hatred" },
      { id: "2", text: "Jealousy" },
      { id: "3", text: "Love" },
      { id: "4", text: "Friendship", correct: true }
    ]
  },
  {
    question: "What is the common name of gladiolus:",
    answers: [
      { id: "1", text: "Sword Lily", correct: true },
      { id: "2", text: "Lily" },
      { id: "3", text: "Iris" },
      { id: "4", text: "Bell" }
    ]
  },
  {
    question: "The flower with the strongest scent is:",
    answers: [
      { id: "1", text: "Lily of the valley" },
      { id: "2", text: "Lily", correct: true },
      { id: "3", text: "Peony" },
      { id: "4", text: "Violet" }
    ]
  },
  {
    question: "A flower blooming in the pond is:",
    answers: [
      { id: "1", text: "Buttercup" },
      { id: "2", text: "Marsh-marigold" },
      { id: "3", text: "Iris" },
      { id: "4", text: "Water lily", correct: true }
    ]
  },
  {
    question: "Which of these flowers blooms at the earliest:",
    answers: [
      { id: "1", text: "Snowdrop", correct: true },
      { id: "2", text: "Narcissus" },
      { id: "3", text: "Hyacinth" },
      { id: "4", text: "Tulip" }
    ]
  },
  {
    question:
      "Wich is one of the most expensive spices in the world is produced from some crocuses?",
    answers: [
      { id: "1", text: "Carrdamom" },
      { id: "2", text: "Cumin" },
      { id: "3", text: "Saffron", correct: true },
      { id: "4", text: "Ghost pepper" }
    ]
  },
  {
    question: "This flower, whose Latin name is bellis, is:",
    answers: [
      { id: "1", text: "Cammomile" },
      { id: "2", text: "Rose" },
      { id: "3", text: "Gerbera" },
      { id: "4", text: "Daisy", correct: true }
    ]
  },
  {
    question: "The symbol of the Netherlands is:",
    answers: [
      { id: "1", text: "Tulip", correct: true },
      { id: "2", text: "Rose" },
      { id: "3", text: "Sunflower" },
      { id: "4", text: "Gerbera" }
    ]
  },
  {
    question: "Which of the following plants has no thorns:",
    answers: [
      { id: "1", text: "Cactus" },
      { id: "2", text: "Acacia" },
      { id: "3", text: "Gladiolus", correct: true },
      { id: "4", text: "Holly" }
    ]
  }
];

class ObservableStore {
  @observable store: AppState = {
    uploadedImage: {},
    predictionsResponse: {},
    test: 1,
    flowers: [{}],
    bestTag: "",
    questions: [{}],
    quizScore: 0
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
  setQuestions(questions) {
    this.store.questions = questions;
  }
  setScore(score) {
    this.store.quizScore = score;
  }
}

const observableStore = new ObservableStore();
export default observableStore;
