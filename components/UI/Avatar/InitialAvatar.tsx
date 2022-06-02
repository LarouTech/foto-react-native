import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '../../../constant/colors';
import { ProfileContext } from '../../../context/ProfileContextProvider';

interface InitialAvatarProps {}

function InitialAvatar(props: InitialAvatarProps) {
  const profileContext = useContext(ProfileContext);
  const [initialType, setInitialType] = useState<string>(null!);

  const detectInitalType = () => {
    const firstName = profileContext.profile.firstName;
    const lastName = profileContext.profile.lastName;

    if (firstName && !lastName) {
      setInitialType(profileContext.profile.firstName.charAt(0));
    }

    if (!firstName && lastName) {
      setInitialType(profileContext.profile.lastName.charAt(0));
    }

    if (firstName && lastName) {
      setInitialType(
        `${profileContext.profile.firstName.charAt(
          0
        )}${profileContext.profile.lastName.charAt(0)}`
      );
    }

    if (firstName === '' && lastName === '') {
      setInitialType(null!);
    }
  };

  useEffect(() => {
    detectInitalType();
  }, [detectInitalType]);

  return (
    <View>
      <Text style={styles.text}>{initialType}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 96,
    fontWeight: 'bold',
    color: Theme.Colors.red100
  }
});

export default InitialAvatar;
