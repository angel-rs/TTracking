import Colors from './Colors';

export default {
  container: {
    flex: 1,
    backgroundColor: Colors.tintColor,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  verticallyAlign: {
    justifyContent: 'center',
  },
  horizontallyAlign: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
  },
};
