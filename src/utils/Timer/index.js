import uuidv4 from 'uuid/v4';

export const millisecondsToHuman = ms => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor(ms / 1000 / 60 / 60);

  const humanized = [
    pad(hours.toString(), 2),
    pad(minutes.toString(), 2),
    pad(seconds.toString(), 2),
  ].join(':');

  return humanized;
};

const pad = (numberString, size) => {
  let padded = numberString;
  while (padded.length < size) {
    padded = `0${padded}`;
  }
  return padded;
};

export default newTimer = (attrs = {}) => ({
  title: attrs.title || 'Actividad sin nombre',
  category: attrs.category || 'Sin categoria',
  id: uuidv4(),
  trackedTime: 0,
  creationTime: (new Date()).toJSON(),
});
