import { Dimensions } from 'react-native';
import Layouts from '../../constants/Layouts';
import Colors from '../../constants/Colors';

const deviceWidth = Dimensions.get('window').width;

export default {
  button: {
    ...Layouts.center,
    width: 55,
    height: 55,
    borderRadius: 27.5,
    position: 'relative',
    left: (deviceWidth / 2) - 45,
    top: '-45%',
    elevation: 7,
  },
  play: {
    backgroundColor: Colors.green,
  },
  stop: {
    backgroundColor: Colors.red,
  },
  icon: {
    color: Colors.white,
  }
}
