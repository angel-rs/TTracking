import Layouts from '../../constants/Layouts';
import Colors from '../../constants/Colors';

export default {
  container: {
    flex: 1,
  },
  content: {
    ...Layouts.content,
    ...Layouts.spaceBetween,
    paddingTop: 50,
    paddingBottom: 120,
  },
  option: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 3,
    backgroundColor: Colors.white,
    elevation: 1,
  }
};
