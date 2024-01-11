import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: string) => {
    try {
      AsyncStorage.setItem(key, value);
      console.log('Data successfully saved'); 
    } catch (error) {
      console.log(error);
    }
  }