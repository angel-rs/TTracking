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
    fontSize: 17,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray,
  },
};
