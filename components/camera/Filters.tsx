import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Theme } from '../../constant/colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export enum FilterType {
  'auto' = 'auto',
  'sunny' = 'sunny',
  'cloudy' = 'cloudy',
  'shadow' = 'shadow',
  'fluorescent' = 'fluorescent',
  'incandescent' = 'incandescent'
}

export interface Filter {
  id: string;
  type: FilterType;
  icon: any;
  clicked: boolean;
}

interface FiltersProps {
  onSetFilter: (filterType: FilterType) => void;
}

function Filters(props: FiltersProps) {
  const filters: Filter[] = [
    {
      id: '1',
      type: FilterType.sunny,
      icon: 'sunny',
      clicked: false
    },
    {
      id: '2',
      type: FilterType.cloudy,
      icon: 'cloudy',
      clicked: false
    },
    {
      id: '3',
      type: FilterType.shadow,
      icon: 'ios-cloudy-night',
      clicked: false
    },
    {
      id: '4',
      type: FilterType.fluorescent,
      icon: 'flashlight',
      clicked: false
    },
    {
      id: '5',
      type: FilterType.incandescent,
      icon: 'bonfire',
      clicked: false
    }
  ];

  const [getFilters, setFilters] = useState(filters);

  const onPressFilterHandler = (filter: Filter) => {
    setFilters((prev) => {
      return prev.map((f) => {
        if (f.id === filter.id) {
          f.clicked = true;
          return f;
        } else {
          f.clicked = false;
          return f;
        }
      });
    });

    props.onSetFilter(filter.type);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filters</Text>

      <View style={styles.innerContainer}>
        {getFilters.map((filter) => {
          return (
            <Ionicons
              testID={filter.type}
              style={styles.pressable}
              onPress={onPressFilterHandler.bind(null, filter)}
              key={filter.id}
              size={32}
              color={
                filter.clicked ? Theme.Colors.primary100 : Theme.Colors.grey
              }
              name={filter.icon}
            ></Ionicons>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 15,
    color: Theme.Colors.lightGrey,
    fontSize: 18,
    letterSpacing: 2,
    fontWeight: 'bold'
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  innerContainer: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 5
  },
  pressable: {
    marginHorizontal: 16,
    marginBottom: 5
  },
  text: {
    color: Theme.Colors.lightGrey
  }
});

export default Filters;
