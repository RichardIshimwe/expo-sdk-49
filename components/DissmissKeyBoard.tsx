import { Keyboard, TouchableWithoutFeedback } from "react-native";

export const DissmissKeyboardView = ({ children } : {children : any}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  )