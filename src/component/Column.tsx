import { isEqual, isNil, map, omit } from 'lodash';
import React, { useCallback, useMemo, useRef } from 'react';
import {
  Animated,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { generateFastStyles, generateShadowStyle } from '../utils/useGenerateFastStyles';

export interface ColumnType extends React.ForwardRefExoticComponent<ColumnProps> {
  animate: (object: object) => void;
  transitionTo: (object: object) => void;
}

/**
 * Compares specific properties between two objects to determine equality.
 *
 * @param {Object} previousProps - The previous object to compare.
 * @param {Object} newProps - The new object to compare.
 * @param {string[]} compareProps - The properties to compare between the two objects.
 * @return {boolean} - True if all specified properties between the two objects are equal; false otherwise.
 */
export const compareProps = (
  previousProps: any,
  newProps: any,
  compareProps: Array<string>
): boolean => {
  let _isEqual = true;
  map(compareProps, (prop: string | number) => {
    if (!isEqual(previousProps[prop], newProps[prop])) {
      _isEqual = false;
    }
  });
  return _isEqual;
};
/**
 * Interface for Column component props.
 */
export interface ColumnProps {
  children?: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNodeArray;
  style?: StyleProp<ViewStyle>; // Style of the component
  Component?: any; // Component used by Column
  leftContent?: boolean; // Push the child items to the left
  rightContent?: boolean; // Push the child items to the right
  bottomContent?: boolean; // Push sub-items to the bottom
  centerHorizontal?: boolean; // Horizontal center
  centerVertical?: boolean; // Vertical center
  center?: boolean; // Center both horizontally and vertically
  fillParent?: boolean; // Horizontal and long fill of parent View
  fillWidth?: boolean; // Horizontal fill
  fillHeight?: boolean; // Fill height
  shrink?: boolean; // Shrink
  wrap?: boolean; // Wrap text
  componentRef?: any; // Ref to pass to the component
  onPress?: (event: GestureResponderEvent) => void; // Press event handler
  onLongPress?: () => void; // Long press event handler
  getRef?: () => void; // Ref getter
  getComponentRef?: (ref: any) => void; // Component ref getter
  shadowLevel?: number; // Shadow level
  fast?: boolean; // Press quickly without delay
  noFeedback?: boolean; // Without feedback
  animatable?: boolean; // Use react-native-animatable library
  useNativeDriver?: boolean; // Use native drivers
  infinite?: boolean; // Run the animation endlessly
  [x: string]: any; // Additional props
  row?: boolean; // Row mode
  disableRerender?: boolean; // Prevent re-rendering
  rerenderOnPropsChange?: Array<string>; // Re-render on prop changes
  extraData?: any; // Extra data
  animationOnPress?:
    | 'bounce'
    | 'flash'
    | 'jello'
    | 'pulse'
    | 'rotate'
    | 'rubberBand'
    | 'shake'
    | 'swing'
    | 'tada'
    | 'wobble'
    | any; // Animation type on press event
}

/**
 * A memoized Column component with props.
 */
const Column = React.memo(
  (props: ColumnProps): JSX.Element => {
    const {
      style = null,
      children = null,
      leftContent = false,
      rightContent = false,
      bottomContent = false,
      centerHorizontal = false,
      centerVertical = false,
      center = false,
      fillParent = false,
      Component = View,
      shrink = false,
      fillWidth = false,
      fillHeight = false,
      componentRef,
      getComponentRef = (_ref) => {},
      fast = false,
      animatable = !isNil(props.animationOnPress),
      infinite = false,
      wrap = false,
      shadowLevel,
      onPress = undefined,
      onLongPress = undefined,
      noFeedback = false,
      row = false,
      animationOnPress,
    } = props;

    let styles = row ? rowStyles : colStyles;
    // Style nhanh, ví dụ mT8 absolute mL6 ..
    const fastStyle = useMemo(() => {
      return generateFastStyles(omit(props, ['children']));
    }, [omit(props, ['children'])]);

    // Tạo styles
    const createStyles = useCallback(
      () => [
        {
          ...(row ? { flexDirection: 'row' } : {}),
        },
        {
          ...(shadowLevel
            ? generateShadowStyle({
                shadowColor: '#c0c0c0',
                elevation: shadowLevel,
              })
            : {}),
        },
        fastStyle,
        center ? styles.center : null,
        wrap ? styles.wrap : null,
        leftContent ? styles.leftContent : null,
        bottomContent ? styles.bottomContent : null,
        rightContent ? styles.rightContent : null,
        centerHorizontal ? styles.centerHorizontal : null,
        centerVertical ? styles.centerVertical : null,
        fillParent ? styles.fillParent : null,
        fillWidth ? styles.fillWidth : null,
        fillHeight ? styles.fillHeight : null,
        shrink ? styles.shrink : null,
        style,
      ],
      [style]
    );
    const isTouchable = useRef(false);
    const _styles = useMemo(() => {
      return createStyles();
    }, [style]);
    const refBtn = useRef<ColumnType>(null);

    // Touch Component
    let TComponent: any = useMemo(() => {
      if (!onPress && !onLongPress) return React.Fragment;
      isTouchable.current = true;
      if (fast) return TouchableWithoutFeedback;
      if (noFeedback) return TouchableWithoutFeedback;
      return TouchableNativeFeedback;
    }, [onPress, onLongPress]);

    // Inside component
    let RComponent: any = useMemo(() => {
      if (animatable) return Animated.View;
      return Component;
    }, [animatable]);

    // Get ref
    const _ref = useMemo(() => {
      let __ref = componentRef || refBtn;
      getComponentRef && getComponentRef(__ref);
      return __ref;
    }, []);

    // On Press
    const _onPress = useCallback(
      (event: GestureResponderEvent) => {
        if (animationOnPress) {
          _ref?.current?.animate(animationOnPress);
        }
        onPress && onPress(event);
      },
      [onPress]
    );

    if (!isTouchable?.current) {
      return (
        <RComponent
          ref={_ref}
          {...omit(props, ['children', 'onPress', 'onLongPress'])}
          style={_styles}
          iterationCount={infinite ? 'infinite' : 1}
        >
          {children}
        </RComponent>
      );
    }

    return (
      <TComponent onPress={_onPress} onLongPress={onLongPress}>
        <RComponent
          ref={_ref}
          {...omit(props, ['children', 'onPress', 'onLongPress'])}
          style={_styles}
          iterationCount={infinite ? 'infinite' : 1}
        >
          {children}
        </RComponent>
      </TComponent>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps?.disableRerender) return true;
    if (prevProps?.rerenderOnPropsChange)
      return compareProps(prevProps, nextProps, prevProps?.rerenderOnPropsChange);
    return false;
  }
);

const colStyles = StyleSheet.create({
  wrap: { flexWrap: 'wrap' },
  center: { justifyContent: 'center', alignItems: 'center' },
  bottomContent: { justifyContent: 'flex-end' },
  leftContent: { alignItems: 'flex-start' },
  rightContent: { alignItems: 'flex-end' },
  centerHorizontal: { alignItems: 'center' },
  centerVertical: { justifyContent: 'center' },
  shrink: { flexShrink: 1 },
  fillParent: { alignSelf: 'stretch', flex: 1, flexShrink: 1 },
  fillWidth: { alignSelf: 'stretch', flexGrow: 1, flexShrink: 1 },
  fillHeight: { flex: 1 },
});

const rowStyles = StyleSheet.create({
  wrap: { flexWrap: 'wrap' },
  center: { justifyContent: 'center', alignItems: 'center' },
  bottomContent: { justifyContent: 'flex-end' },
  leftContent: { justifyContent: 'flex-start' },
  rightContent: { justifyContent: 'flex-end' },
  centerHorizontal: { justifyContent: 'center' },
  centerVertical: { alignItems: 'center' },
  shrink: { flexShrink: 1 },
  fillParent: { alignSelf: 'stretch', flex: 1, flexShrink: 1 },
  fillWidth: { alignSelf: 'stretch', flexGrow: 1, flexShrink: 1 },
  fillHeight: { flex: 1 },
});

export default Column;
