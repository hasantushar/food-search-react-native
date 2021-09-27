import React from 'react';
import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';

const SkeletonLoader = () => {
  return (
    <ContentLoader
      speed={2}
      width={400}
      height={460}
      viewBox="0 0 400 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      >
      <Circle cx="25" cy="31" r="25" />
      <Rect x="58" y="10" rx="2" ry="2" width="120" height="10" />
      <Rect x="58" y="26" rx="2" ry="2" width="60" height="10" />
      <Rect x="58" y="42" rx="2" ry="2" width="40" height="10" />
      <Rect x="0" y="70" rx="2" ry="2" width="400" height="350" />
    </ContentLoader>
  );
};

export default SkeletonLoader;
