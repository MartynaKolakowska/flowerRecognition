import i18n from "i18n-js";
import * as Localization from "expo-localization";

i18n.locale = Localization.locale;
i18n.fallbacks = true;

i18n.translations = {
  en: {
    picture: "Take a picture",
    or: "or",
    gallery: "Upload an image",
    home: "Home",
    loading: "Loading",
    quiz: "Quiz",
    quizButton: "Test your knowledge about flowers",
    login: "Log in",
    signUp: "Sign up",
    quizResults: "Quiz Results",
    cameraAccess: "No access to camera",
    aboutFlower: "About flower",
    checkAgain: "Check again",
    notFlower: "Are you sure that was a flower?",
    notDatabaseFlower: "Sorry,AI can't recognize this flower",
    moreInformations: "More informations",
    result: "Result",
    rollAlert: "Sorry, we need camera roll permissions to make this work!",
    noAccount: "Don't have an account? Sign in",
    password: "Password",
    takenUsername: "Username is already taken",
    username: "Username",
    hasAccount: "Already have an account? Log in",
    ready: "Start",
    waiting: "Waiting for prediction...",
    name: "Name",
    etymology: "Etymology",
    genus: "Genus",
    family: "Family",
    aiSays: "AI says: ",
    probability: "Probability: ",
    poor: "Poor!",
    nice: "Excellent!",
    average: "Average!",
    poorText:
      "You didn't do great, but don't worry! This quiz was really difficult, but if you deepen your knowledge and try again, you'll definitely do better!",
    niceText:
      "You know flowers very well! You know all or almost all of the species that were listed here. Only envy such knowledge!",
    averageText:
      "You recognize a lot of flower species, but not all of them. After all, who makes you know them? If you polish up a bit on this topic, then you will definitely be a champion!"
  },
  pl: {
    picture: "Zrób zdjęcie",
    or: "lub",
    gallery: "Wybierz zdjęcie z galerii",
    home: "Rozpoznaj kwiat",
    loading: "Ładowanie",
    quizButton: "Sprawdź swoją wiedzę o roślinach",
    login: "Zaloguj się",
    signUp: "Stwórz konto",
    quizResults: "Wyniki quizu",
    cameraAccess: "Nie uzyskano dostępu do aparatu",
    aboutFlower: "Informacje o roślinie",
    checkAgain: " Sprawdź jeszcze raz",
    notFlower: "Czy to na pewno był kwiat?",
    notDatabaseFlower: "Przepraszam, nie potrafię rozpoznać tej rośliny",
    moreInformations: "Więcej informacji",
    result: "Wynik",
    rollAlert:
      "Wybacz, ale potrzebuję dostępu do galerii aparatu żeby to zadziałało",
    noAccount: "Nie masz konta? Zarejestruj się!",
    password: "Hasło",
    takenUsername: "Nazwa użytkownika jest zajęta",
    username: "Nazwa użytkownika",
    hasAccount: "Masz konto? Zaloguj się!",
    Quiz: "Quiz",
    ready: "Rozpocznij quiz",
    waiting: "Rozpoznawanie rośliny...",
    name: "Nazwa",
    etymology: "Pochodzenie nazwy",
    genus: "Rodzaj",
    family: "Rodzina",
    aiSays: "Rozpoznano: ",
    probability: "Pradwdopodobieństwo: ",
    poor: "Słabo!",
    nice: "Świetnie!",
    average: "Może być!",
    poorText:
      "Nie poszło Ci rewelacyjnie, ale nie martw się! Ten quiz był naprawdę trudny, ale gdy pogłębisz swoją wiedzę i spróbujesz jeszcze raz, na pewno pójdzie Ci lepiej!",
    niceText:
      "Naprawdę dobrze znasz się na kwiatach! Znasz wszystkie lub prawie wszystkie gatunki które były tu wymienione. Tylko pozazdrościć takiej wiedzy! ",
    averageText:
      "Rozpoznajesz dużo gatunków kwiatów, ale nie wszystkie. W końcu kto każe Ci je znać? Jeśli podszlifujesz się trochę w tym temacie, to na pewno będziesz mistrzem!"
  }
};
