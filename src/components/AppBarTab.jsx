import { Pressable } from "react-native";
import { Text } from "react-native";
import { Link } from "react-router-native";

const AppBarTab = ({style, target, ...props}) => {
  return (
      <Link to={target}>
        <Text style={style}>
          {props.children}
        </Text>
      </Link>
  );
};

export default AppBarTab;