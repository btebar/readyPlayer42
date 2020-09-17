import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from './theme';

const Header = ({ children }) => <Text style={styles.header}>{children}</Text>;

const styles = StyleSheet.create({
  header: {
    fontSize: 27,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
});

export default memo(Header);