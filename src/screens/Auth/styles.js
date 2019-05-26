import Layouts from '../../constants/Layouts';
import Colors from '../../constants/Colors';

export default {
  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
  logo: {
    alignSelf: 'center',
    height: 99,
    width: 99,
  },
  buttonsSection: {
    ...Layouts.center,
    ...Layouts.spaceBetween,
    marginBottom: 20,
    marginHorizontal: 15,
  }
}
