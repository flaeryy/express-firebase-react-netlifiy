const { db } = require("./firebase");
const { getDocs, collection } = require("firebase/firestore");

class FirebaseService {
  private static instance: FirebaseService;

  private constructor() {
    // Inicijalizacija Firebase servisa
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }

    return FirebaseService.instance;
  }

  public async fetchDataCollection(params: string) {
    const dataRef = collection(db, params);
    const querySnapshot = await getDocs(dataRef);
    const data: any[] = [];

    querySnapshot.forEach((document: any) => {
      const user = document.data();
      data.push(user);
    });

    return data;
  }
}

export default FirebaseService;
