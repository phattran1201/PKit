import React, { ReactNode } from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import mergeDeep from '../utils/merge';
import { STYLE_VARIABLES, STYLES } from '../utils/styles';
import { responsiveFontSize } from '../utils/scaling-utils';

interface StyleVariables {
  fontSize: number;
  color: string;
}

const styleVariables: StyleVariables = Object.assign(STYLE_VARIABLES, {});
const stylesheet = StyleSheet.create(STYLES);

/**
 * Initializes the styles and variables for the app.
 * @param {object} styles - Custom styles to override default styles.
 * @param {object} variables - Custom variables to override default variables.
 */
const init = (styles = {}, variables = {}) => {
  // Merge the custom variables with the default variables
  Object.assign(styleVariables, variables);
  // Merge the custom styles with the default styles and create a stylesheet
  Object.assign(stylesheet, StyleSheet.create(mergeDeep(STYLES, styles)));
};

const Text = ({ children, style, ...props }: { children: ReactNode; style?: any }) => (
  <RNText
    {...props}
    style={[
      stylesheet.text,
      {
        fontSize: styleVariables.fontSize,
        color: styleVariables.color,
      },
      style,
    ]}
  >
    {children}
  </RNText>
);

Text.displayName = 'Text';

// Headers
const H6 = ({ children, style, ...props }: { children: ReactNode; style?: any }) => (
  <Text
    {...props}
    style={[
      stylesheet.h6,
      style,
      {
        fontSize: responsiveFontSize(1, styleVariables.fontSize),
      },
    ]}
  >
    {children}
  </Text>
);

H6.displayName = 'H6';

const H5 = ({ children, style, ...props }: { children: ReactNode; style?: any }) => (
  <Text
    {...props}
    style={[
      stylesheet.h5,
      style,
      {
        fontSize: responsiveFontSize(1.25, styleVariables.fontSize),
      },
    ]}
  >
    {children}
  </Text>
);

H5.displayName = 'H5';

const H4 = ({ children, style, ...props }: { children: ReactNode; style?: any }) => (
  <Text
    {...props}
    style={[
      stylesheet.h4,
      style,
      {
        fontSize: responsiveFontSize(1.5, styleVariables.fontSize),
      },
    ]}
  >
    {children}
  </Text>
);

H4.displayName = 'H4';

const H3 = ({ children, style, ...props }: { children: ReactNode; style?: any }) => (
  <Text
    {...props}
    style={[
      stylesheet.h3,
      style,
      {
        fontSize: responsiveFontSize(1.75, styleVariables.fontSize),
      },
    ]}
  >
    {children}
  </Text>
);

H3.displayName = 'H3';

const H2 = ({ children, style, ...props }: { children: ReactNode; style?: any }) => (
  <Text
    {...props}
    style={[
      stylesheet.h2,
      style,
      {
        fontSize: responsiveFontSize(2, styleVariables.fontSize),
      },
    ]}
  >
    {children}
  </Text>
);

H2.displayName = 'H2';

const H1 = ({ children, style, ...props }: { children: ReactNode; style?: any }) => (
  <Text
    {...props}
    style={[
      stylesheet.h1,
      style,
      {
        fontSize: responsiveFontSize(2.5, styleVariables.fontSize),
      },
    ]}
  >
    {children}
  </Text>
);

H1.displayName = 'H1';

export { H1, H2, H3, H4, H5, H6, Text, init };
