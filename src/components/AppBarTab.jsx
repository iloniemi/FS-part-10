import { Pressable } from "react-native";
import { Text } from "react-native";

const AppBarTab = ({style, ...props}) => {
  return (
    <Pressable>
      <Text style={style}>
        {props.children}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;