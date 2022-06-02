import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Theme } from '../../constant/colors';

export interface FaceBounds {
  x: number;
  y: number;
  height: number;
  width: number;
}

interface FacesBoundsProps {
  facesBounds: FaceBounds[];
}

function FacesBounds(props: FacesBoundsProps) {
  return (
    <React.Fragment>
      {props.facesBounds.map((faceBound) => {
        return (
          <View
            key={faceBound.x}
            style={{
              height: props.facesBounds ? faceBound.height : null!,
              width: props.facesBounds ? faceBound.width : null!,
              position: 'absolute',
              top: props.facesBounds ? faceBound.y : null!,
              left: props.facesBounds ? faceBound.x : null!,
              borderColor: Theme.Colors.primary100,
              borderWidth: 3
            }}
          ></View>
        );
      })}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({});

export default FacesBounds;
