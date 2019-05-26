import Layouts from '../../constants/Layouts';
import Colors from '../../constants/Colors';

export default {
  container: {
    flex: 1,
  },
  content: {
    ...Layouts.content,
    ...Layouts.spaceBetween,
    paddingTop: 10,
    paddingHorizontal: 0,
  },
};
