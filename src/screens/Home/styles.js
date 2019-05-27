import Layouts from '../../constants/Layouts';
import Colors from '../../constants/Colors';

export default {
  container: {
    flex: 1,
  },
  content: {
    ...Layouts.content,
    // ...Layouts.spaceBetween,
    paddingTop: 50,
    paddingBottom: 120,
  },
  option: {
    width: '100%',
    height: 90,
    paddingVertical: 15,
    paddingLeft: 20,
    paddingRight: 10,
    borderRadius: 25,
    backgroundColor: Colors.white,
    elevation: 1,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  }
};
