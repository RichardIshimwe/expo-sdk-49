import AsyncStorage from "@react-native-async-storage/async-storage";

export     const getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log('Data successfully retrieved')
     return value;
    } catch(e) {
      console.log(e);
    }
  }