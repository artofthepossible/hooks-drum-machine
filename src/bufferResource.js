// bufferResource.js

import { useState, useEffect } from 'react';
import * as Tone from 'tone';

export const useBufferResource = (url) => {
  const [buffer, setBuffer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    Tone.Buffer.fromUrl(url)
      .then((loadedBuffer) => {
        if (isMounted) {
          setBuffer(loadedBuffer);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { buffer, error };
};
