import React, { useContext, useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Svg, Circle, Text as SVGText } from 'react-native-svg';
import { FontAwesome } from '@expo/vector-icons';
import { Theme } from '../../constant/colors';
import { ProfileContext } from '../../context/ProfileContextProvider';

export enum DownloadCompletedStatus {
  'ON_PRESS' = 'ON_PRESS',
  'DOWNLOAD_COMPLETED' = 'DOWNLOAD_COMPLETED'
}

interface StatusSpinnerProps {
  progressPercent: number;
  size: number;
  strokeWidth: number;
  bgColor: string;
  pgColor: string;
  textSize?: number;
  textColor?: string;
  text?: string;
  completed: (state: DownloadCompletedStatus) => void;
  statusMessage?: string;
}

const StatusSpinner = (props: StatusSpinnerProps) => {
  const { size, strokeWidth, text } = props;
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;

  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const svgProgress = 100 - currentProgress;

  let updateProgressInterval: NodeJS.Timer = null!;

  useEffect(() => {
    if (props.progressPercent > currentProgress) {
      setCurrentProgress((prev) => {
        return prev + 4;
      });
    }

    if (props.progressPercent > 0 && currentProgress <= 100) {
      updateProgressInterval = setInterval(() => {
        setCurrentProgress((prev) => {
          if (prev === 100) {
            clearInterval(updateProgressInterval);
            return prev;
          }

          return prev + 1;
        });
      }, 20);
    } else {
      clearInterval(updateProgressInterval);
    }

    return () => {
      clearInterval(updateProgressInterval);
    };
  }, [props.progressPercent]);

  if (currentProgress >= 100) {
    setTimeout(() => {
      props.completed(DownloadCompletedStatus.DOWNLOAD_COMPLETED);
    }, 300);
  }

  const onPressThumbsHandler = () => {
    setTimeout(() => {
      props.completed(DownloadCompletedStatus.ON_PRESS);
    }, 300);
  };

  return (
    <React.Fragment>
      <View style={styles.container}>
        <Svg style={styles.svgContainer} width={size} height={size}>
          {/* Background Circle */}
          <Circle
            stroke={props.bgColor ? props.bgColor : '#f2f2f2'}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            {...{ strokeWidth }}
          />

          {/* Progress Circle */}
          <Circle
            stroke={props.pgColor ? props.pgColor : '#3b5998'}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeDasharray={`${circum} ${circum}`}
            strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
            strokeLinecap="round"
            transform={`rotate(-90, ${size / 2}, ${size / 2})`}
            {...{ strokeWidth }}
          />

          {/* Text */}

          {currentProgress < 100 ? (
            <SVGText
              fontSize={props.textSize ? props.textSize : '10'}
              x={size / 2}
              y={size / 2 + (props.textSize ? props.textSize / 2 - 1 : 5)}
              textAnchor="middle"
              fill={props.textColor ? props.textColor : '#333333'}
            >
              {`${currentProgress}%`}
            </SVGText>
          ) : null}
        </Svg>

        {currentProgress >= 100 ? (
          <View style={styles.thumbBox}>
            <FontAwesome
              onPress={onPressThumbsHandler}
              style={styles.thumbs}
              name="thumbs-o-up"
              size={75}
              color={Theme.Colors.lightGrey}
            />
          </View>
        ) : null}

        {props.statusMessage ? (
          <Text style={styles.message}>{props.statusMessage}</Text>
        ) : null}
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  message: {
    fontSize: 22,
    color: Theme.Colors.lightGrey,
    textAlign: 'center',
    marginTop: 30,
    letterSpacing: 2,
    textTransform: 'capitalize'
  },
  svgContainer: {
    position: 'relative'
  },
  thumbBox: {
    position: 'absolute',
    height: 175,
    width: 175,
    alignItems: 'center',
    justifyContent: 'center'
  },
  thumbs: {
    // position: 'absolute',
    // top: '24%',
    // left: '24%'
  }
});

export default StatusSpinner;
