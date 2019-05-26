import uuidv4 from 'uuid/v4';

export const millisecondsToHuman = (ms, padded = true) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor(ms / 1000 / 60 / 60);

  if (padded) {
    const humanized = [
      pad(hours.toString(), 2),
      pad(minutes.toString(), 2),
      pad(seconds.toString(), 2),
    ].join(':');

    return humanized;
  } else {
    const humanized = [];

    if (hours > 0) humanized.push(`${hours.toString()}hr `);
    if (minutes > 0) humanized.push(`${minutes.toString()}min `);
    humanized.push(`${seconds.toString()}s`);

    return humanized;
  }
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
