import { Pressable, Text } from "react-native";
import { Link } from "expo-router";

export default function Page() {
  return (
    <Link href="/(auth)/register" asChild>
      <Pressable className="flex h-screen justify-center items-center mt-[30px]">
        <Text>Signin</Text>
      </Pressable>
    </Link>
  );
}