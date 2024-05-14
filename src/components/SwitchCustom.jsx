import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

const SwitchCustom = ({ isEnabled, handleTheme = () => { } }) => {

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: colors.dark6, true: '#767577' }}
        thumbColor={isEnabled ? colors.dark2 : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={handleTheme} //colocar setIsEnable directamente
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SwitchCustom;