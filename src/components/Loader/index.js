import React from 'react';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

const Loader = () => (
  <Lottie
    ref={animation => { this.animation = animation; }}
    onLayout={() => { this.animation.play(); }}
    style={{ width: 135, height: 135, alignSelf: 'center' }}
    source={require('../../../assets/animations/loading.json')}
  />
);

export default Loader;
