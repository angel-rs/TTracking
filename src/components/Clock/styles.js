import Layouts from '../../constants/Layouts';
import Colors from '../../constants/Colors';

export default {
  container: {
    ...Layouts.center,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.white,
    alignSelf: 'center',
    marginTop: 60,
    marginBottom: 70,
  },
  time: {
    fontSize: 26,
    color: Colors.white,
  }
}
