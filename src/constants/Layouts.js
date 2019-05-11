import { StyleSheet } from 'react-native';
import Colors from './Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.tintColor,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
    paddingHorizontal: 5,
  },
  row: {
    flex: 1,
    flexDirection: 'column',
  },
  column: {
    flex: 1,
    flexDirection: 'row',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticallyAlign: {
    justifyContent: 'center',
  },
  horizontallyAlign: {
    alignItems: 'center',
  }
});
